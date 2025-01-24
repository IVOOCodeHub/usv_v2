# Documentation Technique - Migration de l'USV vers React

## 1. Introduction
Ce document décrit l'architecture et les choix techniques de la migration de l'USV (Utilitaire Superviseur) d'une application en **ASP Classic + VBScript** vers une nouvelle version basée sur **React + TypeScript + Vite.js**.

## 2. Stack Technologique

- **Frontend** : React 18 avec TypeScript
- **Build Tool** : Vite.js
- **Gestion d'état** : `useContext`
- **Appels API** : `axios`
- **Routing** : `react-router-dom`
- **Tableau de données** : `nillys-react-table-library`
- **Sélection dynamique** : `react-select`
- **Style** : SCSS (Sass Embedded)
- **Linting & Formatage** : ESLint, Prettier

### Dépendances installées
```json
"dependencies": {
  "axios": "^1.7.7",
  "nillys-react-table-library": "^1.1.3",
  "prettier": "^3.3.3",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "react-select": "^5.8.1"
},
"devDependencies": {
  "@eslint/js": "^9.11.1",
  "@types/react": "^18.3.10",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.2",
  "eslint": "^9.11.1",
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.12",
  "globals": "^15.9.0",
  "sass-embedded": "^1.82.0",
  "typescript": "^5.5.3",
  "typescript-eslint": "^8.7.0",
  "vite": "^5.4.8"
}
```

## 3. Architecture de l'Application

L'application est découpée en plusieurs modules principaux, organisés en fonction de la navigation générale de l'application. Les sous-applications sont regroupées dans des dossiers reflétant la hiérarchie du menu principal.

### 3.1 Organisation des Fichiers
L'arborescence du projet suit la structure suivante :
- **`API/`** : Contient les appels à l'API et est divisé en deux sous-dossiers :
    - **`models/`** : Définit les structures de données TypeScript utilisées dans l'application.
    - **`services/`** : Contient les fichiers gérant les appels API via `axios`.
- **`assets/`** : Contient les ressources statiques telles que les images ou fichiers de styles globaux.
- **`components/`** : Contient les composants réutilisables et indépendants du contexte applicatif.
- **`context/`** : Gère les états globaux à l'aide de `useContext`.
- **`utils/`** : Contient des utilitaires génériques, regroupés en sous-dossiers :
    - **`scripts/`** : Fichiers de scripts et helpers réutilisables.
    - **`styles/`** : Contient les fichiers SCSS globaux, y compris les mixins et variables.
    - **`types/`** : Définit les interfaces TypeScript utilisées dans toute l'application.
- **`views/`** : Contient les différentes pages et sous-modules de l'application, organisés selon la structure du menu général.
- **`App.tsx`** : Fichier principal définissant la structure de l'application et la gestion des routes.
- **`main.tsx`** : Point d'entrée de l'application.

Les fichiers SCSS sont systématiquement placés dans le même dossier que les fichiers TSX concernés, afin de faciliter leur gestion et leur maintenance.

### 3.2 Navigation (React Router)
L'application utilise `react-router-dom` pour la gestion des routes. Les routes principales sont définies dans le fichier `App.tsx`, tandis que les sous-modules sont gérés par des fichiers de routes spécifiques.

Exemple de structure de routing dans un module :
```tsx
function OrganisationGeneraleRouter(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<OrganisationGeneraleMenuWithAuth />} />
      <Route path="gestion_services_destinataires" element={<GestionDesServicesDestinatairesWithAuth />} />
    </Routes>
  );
}
```

### 3.3 Protection des Routes avec `WithAuth`
L'application utilise un composant `WithAuth` pour protéger les routes nécessitant une authentification. Ce composant vérifie la présence d'un utilisateur connecté et redirige vers la page de connexion en cas d'absence d'authentification.

Exemple d'utilisation :
```tsx
const CourrierDepensesWithAuth: (props: object) => ReactElement | null = WithAuth(CourrierDepenses);
export default CourrierDepensesWithAuth;
```
Le composant `WithAuth` utilise `useContext` pour accéder aux informations de l'utilisateur et effectue une redirection conditionnelle si l'utilisateur n'est pas authentifié.

## 4. Bonnes Pratiques et Conventions

- Utilisation de **TypeScript strict** pour un typage robuste
- `ESLint` et `Prettier` pour le linting et le formatage
- Organisation des fichiers selon la structure de navigation
- Regroupement des fichiers TSX et SCSS dans les mêmes dossiers pour une meilleure lisibilité
- Utilisation des **hooks React** pour éviter les classes

## 5. Instructions d'Installation et de Développement

### Prérequis
- Node.js (version récente recommandée)
- Yarn ou npm

### Installation du projet
```bash
git clone <repository_url>
cd <nom_du_projet>
yarn install # ou npm install
```

### Lancer l'application
```bash
yarn dev # ou npm run dev
```

### Lancer les tests ESLint
```bash
yarn lint # ou npm run lint
```

## 6. Conclusion
Cette migration modernise l'USV en apportant de meilleures performances, une meilleure maintenabilité et une expérience utilisateur améliorée. La transition vers **React + TypeScript + Vite.js** assure une architecture évolutive et scalable.
