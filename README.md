# Projet MERN

## 1. Objectif du projet

Ce projet a pour objectif de développer une application web utilisant la stack MERN :

- **MongoDB** : base de données NoSQL.
- **Express.js** : framework backend pour créer les API REST.
- **React.js** : bibliothèque pour développer l'interface utilisateur.
- **Node.js** : environnement d'exécution JavaScript côté serveur.
- **Mongoose** : outil permettant de communiquer avec MongoDB.

## 2. Prérequis

Avant de commencer, installer :

- Node.js
- npm
- Git
- MongoDB local ou MongoDB Atlas

## 3. Installation

Cloner le dépôt GitHub :

```bash
git clone https://github.com/UTILISATEUR/MERN-jihane-bouaaza.git
```

Accéder au dossier du projet :

```bash
cd MERN-jihane-bouaaza
```

Installer les dépendances du backend :

```bash
cd backend
npm install
```

## 4. Variables d'environnement

Créer un fichier `.env` dans le dossier `backend` :

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/maBase
```

Pour MongoDB Atlas, remplacer `MONGO_URI` par l'URL de connexion Atlas.

**Important :** ne jamais publier le fichier `.env` sur GitHub.

## 5. Commandes disponibles

Démarrer le serveur :

```bash
node index.js
```

Démarrer avec Nodemon, si configuré :

```bash
npm run dev
```

Le serveur sera accessible sur :

http://localhost:3000

## 6. Routes API

Les routes suivantes sont des exemples à adapter selon les routes réellement implémentées.

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/users` | Récupérer les utilisateurs |
| GET | `/api/users/:id` | Récupérer un utilisateur |
| POST | `/api/users` | Ajouter un utilisateur |
| PUT | `/api/users/:id` | Modifier un utilisateur |
| DELETE | `/api/users/:id` | Supprimer un utilisateur |

## 7. Déploiement

Liens à compléter après le déploiement :

- **Frontend :** à ajouter (Vercel ou Netlify)
- **Backend :** à ajouter (Render ou autre hébergeur)
- **Dépôt GitHub :** à ajouter

## 8. Auteur

Projet développé par Jihane Bouaaza dans le cadre de l'apprentissage du développement web avec la stack MERN.
