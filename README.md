# UniPlanr 📚

Une application complète de planification et de gestion universitaire conçue pour aider les étudiants à organiser efficacement leur vie académique.

## ✨ Fonctionnalités

- **Planification Académique** : Organisez vos cours, devoirs et horaires d'étude
- **Gestion des Tâches** : Suivez vos devoirs, projets et échéances
- **Intégration Calendrier** : Visualisez votre calendrier académique
- **Interface Conviviale** : Design moderne et responsive construit avec React
- **API Backend** : Backend PHP/Laravel robuste pour la gestion des données

## 🚀 Stack Technique

### Frontend
- **React** - Framework UI
- **Vite** - Outil de build et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **ESLint** - Linter de code

### Backend
- **PHP** - Langage côté serveur
- **Laravel** - Framework PHP (basé sur les templates Blade)
- **MySQL/Base de données** - Stockage des données

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Node.js (v16 ou supérieur)
- npm ou yarn
- PHP (v8.0 ou supérieur)
- Composer (gestionnaire de dépendances PHP)
- MySQL ou un autre système de base de données

## 🛠️ Installation

### Configuration du Frontend

1. Clonez le dépôt :
```bash
git clone https://github.com/Amina151004/UniPlanr.git
cd UniPlanr
```

2. Installez les dépendances frontend :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Configuration du Backend

1. Accédez au répertoire backend :
```bash
cd backend
```

2. Installez les dépendances PHP :
```bash
composer install
```

3. Copiez le fichier d'environnement et configurez votre base de données :
```bash
cp .env.example .env
```

4. Modifiez `.env` avec vos identifiants de base de données :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=uniplanr
DB_USERNAME=votre_nom_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

5. Générez la clé d'application :
```bash
php artisan key:generate
```

6. Exécutez les migrations de base de données :
```bash
php artisan migrate
```

7. Démarrez le serveur backend :
```bash
php artisan serve
```

L'API sera disponible sur `http://localhost:8000`

## 📦 Scripts Disponibles

### Scripts Frontend

- `npm run dev` - Démarrer le serveur de développement avec rechargement à chaud
- `npm run build` - Compiler pour la production
- `npm run preview` - Prévisualiser la version de production
- `npm run lint` - Exécuter ESLint

### Scripts Backend

- `php artisan serve` - Démarrer le serveur de développement Laravel
- `php artisan migrate` - Exécuter les migrations de base de données
- `php artisan db:seed` - Peupler la base de données avec des données d'exemple

## 🏗️ Structure du Projet

```
UniPlanr/
├── backend/              # Backend Laravel
│   ├── app/             # Logique applicative
│   ├── routes/          # Routes API
│   └── resources/       # Templates Blade
├── src/                 # Code source React
│   ├── components/      # Composants React
│   ├── pages/          # Composants de pages
│   └── assets/         # Ressources statiques
├── public/             # Ressources publiques
├── index.html          # Fichier HTML principal
├── vite.config.js      # Configuration Vite
└── tailwind.config.js  # Configuration Tailwind CSS
```

## 🔧 Configuration

### Configuration Vite
Le projet utilise Vite avec React Fast Refresh et React Compiler activés. La configuration peut être modifiée dans `vite.config.js`.

### Tailwind CSS
Tailwind CSS est configuré dans `tailwind.config.js`. Vous pouvez personnaliser votre système de design en modifiant ce fichier.

### ESLint
Les règles de linting du code sont définies dans `eslint.config.js`. Ajustez ces règles selon les standards de codage de votre équipe.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Forkez le dépôt
2. Créez une branche de fonctionnalité (`git checkout -b feature/NouvelleFonctionnalité`)
3. Commitez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/NouvelleFonctionnalité`)
5. Ouvrez une Pull Request

---

Fait avec ❤️ pour les étudiants, par des étudiants
