# GamePulse — Moteur de Recommandation

> Un moteur de recherche et de recommandation intelligent pour les jeux Steam, basé sur une architecture RAG (Retrieval-Augmented Generation) hybride, combinant NLP, bases de données vectorielles et modèles de Reranking.

---
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-FFD21E?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![ChromaDB](https://img.shields.io/badge/ChromaDB-3178C6?style=for-the-badge)
![Mistral AI](https://img.shields.io/badge/Mistral_AI-FF6000?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### 🌍 **Live Demo:** [Here](coming soon)

---

## Sommaire

1. [Vue d'ensemble](#1-vue-densemble)
2. [L'Intelligence de GamePulse (Notebook `lab.ipynb`)](#2-lintelligence-de-gamepulse-notebook-labipynb)
3. [Architecture du Pipeline RAG](#3-architecture-du-pipeline-rag)
4. [Origine et Ingénierie des Données](#4-origine-et-ingénierie-des-données)
5. [Stack Technique](#5-stack-technique)
6. [Démarrage rapide (Docker)](#6-démarrage-rapide-docker)
7. [Axes d'Améliorations](#7-axes-daméliorations)

---

## 1. Vue d'ensemble

**GamePulse** n'est pas une simple barre de recherche par mots-clés. C'est un moteur sémantique capable de comprendre des requêtes complexes en langage naturel (ex: *"Un jeu de survie dans l'espace avec des éléments de craft"*).

Le système analyse une base de plus de **114 000 jeux Steam** et renvoie les résultats les plus pertinents en combinant la compréhension de l'intention de l'utilisateur (via LLM) et l'analyse vectorielle des descriptions de jeux.

---

## 2. L'Intelligence de GamePulse (Notebook `lab.ipynb`)

Tout le cœur algorithmique du projet a été modélisé dans un environnement (`notebooks/lab.ipynb`). L'objectif était de construire un pipeline de recherche multi-étapes optimisant à la fois la **latence** et la **précision**.

### Choix de Conception & Alternatives
- **Recherche par Mots-clés vs Vectorielle :** Une recherche classique (ElasticSearch/BM25) échoue souvent sur des requêtes conceptuelles. Nous avons opté pour une approche par **Embeddings** (Bi-encoder).
- **Bi-encoder seul vs Hybride (Bi-encoder + Cross-encoder) :** Un Bi-encoder est extrêmement rapide sur 114k lignes, mais manque de finesse sémantique. Le Cross-encoder est très précis, mais trop lourd pour analyser 114k jeux en temps réel. **Le choix final** : Un pipeline en entonnoir (Le Bi-encoder filtre les 20 meilleurs candidats, le Cross-encoder les reclasse).
- **Query simple vs Multi-Query :** Une seule requête vectorielle a tendance à noyer les critères rares (ex: *"pixel art"*). L'utilisation de **Mistral AI** pour générer des sous-requêtes permet d'élargir la recherche (Query Expansion) et de cibler chaque aspect du besoin de l'utilisateur.

---

## 3. Architecture du Pipeline RAG

Le système de recommandation, implémenté dans le `backend/app/engine.py`, suit un pipeline strict en 4 étapes de filtrage et d'enrichissement.

### Étape 1 : Query Expansion (Mistral AI)
La requête de l'utilisateur est envoyée à un LLM (`mistral-small-latest`). Le LLM décompose cette intention en **3 sous-requêtes anglaises** ciblées (mécanique, genre/univers, critère rare).

### Étape 2 : Vector Search Multi-Query (ChromaDB + SentenceTransformers)
Chaque sous-requête est encodée vectoriellement par le modèle `all-MiniLM-L6-v2` (Bi-encoder léger et performant). ChromaDB recherche ensuite les $N$ jeux les plus proches mathématiquement dans la base de données de 114 000 jeux.

### Étape 3 : Reciprocal Rank Fusion (RRF)
Pour fusionner équitablement les classements issus des 3 sous-requêtes de l'étape 2, le système utilise l'algorithme **RRF**. Chaque jeu gagne des points en fonction de sa position dans chaque sous-requête.

**Formule RRF utilisée :**
$$score\_RRF(d) = \sum_{q \in Queries} \frac{1}{k + rank_q(d)}$$
> *Ici, $k = 60$. Cette constante permet de lisser l'avantage des premiers rangs, évitant qu'un document premier sur une requête médiocre n'écrase un document constant dans toutes les requêtes.*

### Étape 4 : Reranking & Score de Confiance (Cross-Encoder)
Les meilleurs candidats fusionnés via RRF sont passés au peigne fin par un modèle lourd : `ms-marco-MiniLM-L-6-v2` (Cross-encoder). Ce modèle analyse la pertinence entre la requête initiale et la description complète du jeu.
Le score brut du Cross-encoder est ensuite lissé en pourcentage humainement lisible grâce à une fonction **Sigmoïde** décalée :

**Transformation Sigmoïde :**
$$P(score) = \frac{1}{1 + e^{-(score + 10)}}$$
> *L'ajout de $+10$ au score brut permet de centrer la distribution de sortie de notre modèle MS-MARCO pour obtenir des probabilités intuitives (0 à 100%).*

---

## 4. Origine et Ingénierie des Données

Ce projet s'appuie sur le dataset 🏆 **[Steam Games Dataset](https://www.kaggle.com/datasets/fronkongames/steam-games-dataset)** par FronkonGames.

### Décisions d'Ingénierie
1. **Éviter le Scraper "Maison" :** Construire un scraper pour 120 000 jeux via l'API Steam aurait coûté des dizaines d'heures en *rate-limiting*. L'utilisation d'un dataset existant permet de se concentrer sur la vraie valeur métier : **l'intelligence artificielle et l'architecture RAG**.
2. **Vectorisation sur Cloud (Kaggle Kernels) vs Local :**
   La génération des embeddings pour 114 000 descriptions est extrêmement intensive. Plutôt que de monopoliser un CPU/GPU local pendant 3 heures, le script a été déployé dans un kernel Kaggle.
   - **Gain :** Traitement complet en **20 minutes** (Cloud-first).
   - **Portabilité :** La base `ChromaDB` résultante a été compressée et importée dans ce dépôt. Docker n'effectue plus que des opérations de **lecture seule**, garantissant un démarrage instantané du backend.

---

## 5. Stack Technique

### Backend & Machine Learning
| Composant | Technologie |
|---|---|
| Langage / API | Python 3, FastAPI |
| Base Vectorielle | ChromaDB |
| Embeddings (Bi-Encoder) | `all-MiniLM-L6-v2` (SentenceTransformers) |
| Reranker (Cross-Encoder)| `ms-marco-MiniLM-L-6-v2` |
| LLM (Query Expansion) | Mistral AI (`mistral-small-latest`) |
| Math & Data | Numpy, Scikit-Learn |

---

## 6. Démarrage rapide (Docker)

Le projet utilise Docker pour packager l'API, le moteur de recherche (et ses modèles ML en cache) ainsi que le front-end.

### Prérequis
- Docker et Docker Compose installés.
- Les clés API configurées dans un fichier `.env`.

### Fichier `.env`
À la racine du projet, créez un fichier `.env` :
```env
MISTRAL_API_KEY=votre_cle_mistral
STEAM_API_KEY=votre_cle_steam_optionnelle
```

L'API sera accessible sur : http://localhost:8000.


## 7. Axes d'Améliorations

- Enrichissement UI/UX : Ajouter les vignettes réelles (header images) et les liens directs vers le store Steam pour les jeux suggérés.

- Filtrage fonctionnel hybride : Implémenter des filtres pre-requête dynamiques (prix, multijoueur, tags spécifiques) combinés à la recherche vectorielle (déjà amorcé dans engine.py via build_where_clause).

- Extensions de BDD : Intégration future d'autres stores (Epic Games, GOG).

- Affinement du système de notation : Modifier le reranking pour pondérer les résultats finaux avec la note Steam (% d'avis positifs), le prix et le nombre d'avis totaux (Popularité vs Pertinence pure).


<br><br><br>

---
<div align="center">
🇬🇧 <strong>English version below</strong>
</div>

---
<br>

# 🎮 GamePulse — Semantic Steam Recommendation Engine

> An intelligent search and recommendation engine for Steam games, based on a hybrid RAG (Retrieval-Augmented Generation) architecture, combining NLP, vector databases, and Reranking models.

---
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-FFD21E?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![ChromaDB](https://img.shields.io/badge/ChromaDB-3178C6?style=for-the-badge)
![Mistral AI](https://img.shields.io/badge/Mistral_AI-FF6000?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### 🌍 **Live Demo:** [Here](https://game-pulse-7ndoj7wnq-enguer2s-projects.vercel.app/)

---

## Table of Contents

1. [Overview](#1-overview)
2. [GamePulse Intelligence (`lab.ipynb` Notebook)](#2-gamepulse-intelligence-labipynb-notebook)
3. [RAG Pipeline Architecture](#3-rag-pipeline-architecture)
4. [Data Origin and Engineering](#4-data-origin-and-engineering)
5. [Tech Stack](#5-tech-stack)
6. [Quick Start (Docker)](#6-quick-start-docker)
7. [Future Improvements](#7-future-improvements)

---

## 1. Overview

**GamePulse** is not just a simple keyword search bar. It is a semantic engine capable of understanding complex queries in natural language (e.g., *"A space survival game with crafting elements"*).

The system analyzes a database of over **114,000 Steam games** and returns the most relevant results by combining the understanding of user intent (via LLM) and vector analysis of game descriptions.

---

## 2. GamePulse Intelligence (`lab.ipynb` Notebook)

The entire algorithmic core of the project was modeled in a research environment (`notebooks/lab.ipynb`). The goal was to build a multi-stage search pipeline optimizing both **latency** and **accuracy**.

### Design Choices & Alternatives
- **Keyword vs. Vector Search:** A classic search (ElasticSearch/BM25) often fails on conceptual queries. We opted for an **Embeddings** approach (Bi-encoder).
- **Bi-encoder alone vs. Hybrid (Bi-encoder + Cross-encoder):** A Bi-encoder is extremely fast on 114k rows but lacks semantic finesse. The Cross-encoder is very accurate but too computationally heavy to analyze 114k games in real-time. **The final choice**: A funnel pipeline (The Bi-encoder filters the top 20 candidates, the Cross-encoder reranks them).
- **Single Query vs. Multi-Query:** A single vector query tends to drown out rare criteria (e.g., *"pixel art"*). Using **Mistral AI** to generate sub-queries helps broaden the search (Query Expansion) and target every aspect of the user's need.

---

## 3. RAG Pipeline Architecture

The recommendation system, implemented in `backend/app/engine.py`, follows a strict 4-step pipeline for filtering and enrichment.

### Step 1: Query Expansion (Mistral AI)
The user's query is sent to an LLM (`mistral-small-latest`). The LLM breaks down this intent into **3 targeted English sub-queries** (core mechanic, genre/universe, rare criteria).

### Step 2: Multi-Query Vector Search (ChromaDB + SentenceTransformers)
Each sub-query is vector-encoded by the `all-MiniLM-L6-v2` model (a lightweight and highly efficient Bi-encoder). ChromaDB then retrieves the mathematically closest $N$ games from the 114,000 games database.

### Step 3: Reciprocal Rank Fusion (RRF)
To fairly merge the rankings from the 3 sub-queries of Step 2, the system uses the **RRF** algorithm. Each game earns points based on its position in each sub-query.

**RRF Formula used:**
$$score\_RRF(d) = \sum_{q \in Queries} \frac{1}{k + rank_q(d)}$$
> *Here, $k = 60$. This constant smooths out the advantage of top ranks, preventing a document that ranks first on a mediocre query from crushing a document that is consistently relevant across all queries.*

### Step 4: Reranking & Confidence Score (Cross-Encoder)
The top candidates merged via RRF are fine-combed by a heavier model: `ms-marco-MiniLM-L-6-v2` (Cross-encoder). This model analyzes the absolute relevance between the initial query and the game's full description.
The raw score of the Cross-encoder is then smoothed into a human-readable percentage using a shifted **Sigmoid** function:

**Sigmoid Transformation:**
$$P(score) = \frac{1}{1 + e^{-(score + 10)}}$$
> *Adding $+10$ to the raw score helps center the output distribution of our MS-MARCO model to obtain intuitive probabilities (0 to 100%).*

---

## 4. Data Origin and Engineering

This project relies on the 🏆 **[Steam Games Dataset](https://www.kaggle.com/datasets/fronkongames/steam-games-dataset)** by FronkonGames.

### Engineering Decisions
1. **Avoiding a "Homebrew" Scraper:** Building a custom scraper for 120,000 games via the Steam API would have cost dozens of hours handling *rate-limiting*. Using an existing dataset allows us to focus on the core business value: **artificial intelligence and RAG architecture**.
2. **Cloud Vectorization (Kaggle Kernels) vs. Local:**
   Generating embeddings for 114,000 descriptions is highly compute-intensive. Instead of monopolizing a local CPU/GPU for 3 hours, the script was deployed in a Kaggle kernel.
   - **Gain:** Complete processing in **20 minutes** (Cloud-first).
   - **Portability:** The resulting `ChromaDB` database was compressed and imported into this repository. Docker now only performs **read-only** operations, ensuring an instant backend startup.

---

## 5. Tech Stack

### Backend & Machine Learning
| Component | Technology |
|---|---|
| Language / API | Python 3, FastAPI |
| Vector Database | ChromaDB |
| Embeddings (Bi-Encoder) | `all-MiniLM-L6-v2` (SentenceTransformers) |
| Reranker (Cross-Encoder)| `ms-marco-MiniLM-L-6-v2` |
| LLM (Query Expansion) | Mistral AI (`mistral-small-latest`) |
| Math & Data | Numpy, Scikit-Learn |

---

## 6. Quick Start (Docker)

The project uses Docker to package the API, the search engine (and its cached ML models), and the frontend.

### Prerequisites
- Docker and Docker Compose installed.
- API keys configured in a `.env` file.

### `.env` File
At the root of the project, create a `.env` file:
```env
MISTRAL_API_KEY=your_mistral_key
STEAM_API_KEY=your_optional_steam_key
```


## 7. Future Improvements

-   UI/UX Enrichment: Add actual thumbnails (header images) and direct links to the Steam store for the suggested games.

-   Hybrid Functional Filtering: Implement dynamic pre-query filters (price, multiplayer, specific tags) combined with vector search (already initiated in engine.py via build_where_clause).

-   Database Expansion: Future integration of other stores (Epic Games, GOG).

-   Scoring Refinement: Modify the reranking to weight the final results with the Steam rating (% of positive reviews), the price, and the total number of reviews (Popularity vs. Pure Relevance).


<br><br><br>

---