## 🗄️ Origine des Données & Crédits

Ce projet s'appuie sur l'excellent travail de la communauté pour la phase d'initialisation de la base de données. 

Les données initiales (plus de 120 000 jeux) proviennent du dataset suivant :
* 🏆 **[Steam Games Dataset](https://www.kaggle.com/datasets/fronkongames/steam-games-dataset) par FronkonGames (Kaggle)**

### 💡 Décisions d'Ingénierie & Optimisation

#### 1. Pourquoi utiliser un Dataset existant plutôt qu'un Scraper "Maison" ?
Bien que les premières versions de ce lab incluaient un script Python personnalisé pour extraire les données via l'API Steam, j'ai choisi de pivoter vers un dataset Kaggle pour la mise en production :
* **Efficacité :** Scraper 120 000 jeux prendrait des dizaines d'heures en respectant les limites de l'API Steam.
* **Focus :** Cela permet de se concentrer sur la vraie valeur ajoutée : l'architecture RAG et l'intelligence de recommandation.

#### 2. Vectorisation sur Cloud (Kaggle Kernels) vs Local
La création d'une base de données vectorielle pour 122 000 jeux est une tâche lourde (calcul des *embeddings*). Au lieu de solliciter mon processeur local pendant plus de 3 heures, j'ai opté pour une approche **Cloud-first** :
* **Utilisation de Kaggle Kernels :** J'ai déployé un script de vectorisation directement sur l'infrastructure de Kaggle pour profiter de leurs ressources (CPU/GPU) et de la proximité immédiate avec le dataset.
* **Gain de performance :** Le processus complet (vectorisation + création de la base ChromaDB) a été réduit à environ **20 minutes**.
* **Portabilité :** La base de données générée a été compressée puis rapatriée localement dans le projet. Docker ne s'occupe désormais que de la lecture, rendant l'application extrêmement rapide au démarrage.