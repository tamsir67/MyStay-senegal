# 🇸🇳 MyStay Voyager Sénégal — Traçabilité Complète (Développement à la Production)

Bienvenue dans la documentation officielle et la **traçabilité complète** du projet **MyStay Voyager Sénégal**, la plateforme dédiée à l'écotourisme authentique et aux séjours solidaires célébrant la **Teranga sénégalaise**.

---

## 📋 Sommaire
1. [Vision & Spécifications du Produit](#1-vision--spécifications-du-produit)
2. [Matrice de Traçabilité des Exigences Utilisateur](#2-matrice-de-traçabilité-des-exigences-utilisateur)
3. [Chronologie des Opérations : Du Développement à la Production](#3-chronologie-des-opérations--du-développement-à-la-production)
4. [Fonctionnement de la Version Windows (Ordinateur Normal)](#4-fonctionnement-de-la-version-windows-ordinateur-normal)
5. [Guide de Démarrage Rapide sous Windows](#5-guide-de-démarrage-rapide-sous-windows)
6. [Packaging Exécutable Windows (.exe) & PWA Desktop](#6-packaging-exécutable-windows-exe--pwa-desktop)
7. [Architecture Technique & Stack Multiplateforme](#7-architecture-technique--stack-multiplateforme)
8. [Vérification & Assurance Qualité](#8-vérification--assurance-qualité)

---

## 1. Vision & Spécifications du Produit

**MyStay Voyager Sénégal** est une solution complète multiplateforme conçue pour valoriser le tourisme responsable au Sénégal à travers :
* **Les 14 régions administratives du Sénégal** : Fatick (Saloum), Dakar (Gorée, Ngor), Ziguinchor (Casamance, Cap Skirring), Thiès (Petite Côte, Somone), Louga (Désert de Lompoul), Saint-Louis (Djoudj), Kédougou, Kaolack, Kaffrine, Matam, Diourbel, Kolda, Sédhiou, Tambacounda.
* **L'Authentification complète** pour voyageurs et hôtes locaux (sécurisation des réservations et gestion des annonces).
* **L'Espace Hôte avec Médias Riches** : Publication de séjours avec sélection de photos haute définition et possibilité de visite vidéo immersive.
* **Le Guide Teranga IA (Koumba)** : Concierge culturel interactif (salutations en wolof, spécialités culinaires, météo et saisons).
* **Une Double Expérience utilisateur :**
  1. **Version Ordinateur (Windows / PC Bureau) :** Affichage panoramique widescreen 1920x1080 avec navigation multi-colonnes, tableau de bord hôte et simulateur Windows 11.
  2. **Version Mobile (Android) :** Application native moderne en Jetpack Compose avec Material Design 3.

---

## 2. Matrice de Traçabilité des Exigences Utilisateur

| Réf. Exigence | Demande Utilisateur | Statut | Composants & Fichiers Implémentés |
| :--- | :--- | :---: | :--- |
| **REQ-01** | *"je peux avoir la plateforme avec les fichiers zip"* | ✅ Livré | `MyStay_Voyager_Senegal.zip` à la racine (14 Mo) contenant la totalité des codes sources Web, Android, configurations et images réelles. |
| **REQ-02** | *"rajouter pour que l'utilisateur puisse s'inscrire ou se connecter s'il a déjà un compte"* | ✅ Livré | `AuthDialog.kt`, `MyStayViewModel.kt` (Android) & Modal `App.tsx` (Web) avec onglets Connexion/Inscription, profils Voyageurs et Hôtes, initiales et déconnexion. |
| **REQ-03** | *"l'hôte puisse aussi ajouter un séjour avec des photos et possibilité de vidéo"* | ✅ Livré | `AddListingDialog.kt` (Android) & formulaire modal dans `App.tsx` (Web) avec sélection de photos multiples, champ URL vidéo, badge vidéo et lecteur vidéo interactif. |
| **REQ-04** | *"pour toutes les régions je veux la liste déroulante de toutes les régions l'utilisateur soit celle qui lui viendra"* | ✅ Livré | Liste déroulante interactive des **14 régions officielles** intégrée dans la recherche, dans le filtre d'accueil et dans le formulaire d'ajout hôte (`SenegalData.all14SenegalRegions` & `ALL_14_REGIONS`). |
| **REQ-05** | *"l'affichage sur un ordinateur normal pour voir comment ça marche avec la version windows"* | ✅ Livré | Simulateur d'ordinateur Windows 11 complet (`deviceView = 'windows'`) avec barre de titre Windows, barre d'adresses, boutons de contrôle, barre des tâches Windows 11 et affichage bureau widescreen 1920x1080. |

---

## 3. Chronologie des Opérations : Du Développement à la Production

### Étape 1 : Ingestion & Analyse des Sources
* Extraction et analyse du zip d'origine contenant le prototype React / Vite / TypeScript.
* Identification des modules clés : catalogue de séjours, conciergerie, réservations et gestion hôte.

### Étape 2 : Identité Visuelle « Teranga Sénégal »
* Création de la palette de couleurs officielle : Ocre sahélien (`#C2410C`), Or solaire (`#D97706`), Vert émeraude des mangroves (`#0D9488`), Argile et Sable chaud (`#FAF7F2`).
* Intégration de visuels photographiques réels du Sénégal : Île de Mar Lodj (Saloum), Île de Gorée, Forêts d'Oussouye (Casamance) et Lagune de la Somone.

### Étape 3 : Module d'Authentification (Voyageurs & Hôtes)
* Implémentation du modèle utilisateur avec rôles distincts (`traveler` et `host`).
* Création des formulaires d'inscription et de connexion avec validation.
* Ajout de boutons de démonstration en 1 clic pour tester immédiatement sans saisie manuelle.

### Étape 4 : Gestion des Séjours Hôte (Photos, Vidéos & 14 Régions)
* Développement du formulaire complet d'ajout de séjour :
  * Sélection obligatoire via la **liste déroulante des 14 régions du Sénégal**.
  * Galerie de photos avec prévisualisation.
  * Champ URL vidéo et intégration d'un lecteur vidéo modal interactif.
  * Paramétrage des éco-engagements (pourcentage reversé aux communautés villageoises).

### Étape 5 : Version Ordinateur Windows (Bureau PC)
* Conception d'un environnement de bureau Windows 11 virtuel :
  * Cadre de fenêtre avec icône Windows, barre de titre, boutons `[ — □ ✕ ]`.
  * Barre d'outils navigateur avec URL sécurisée `https://www.mystay-senegal.sn/explore`.
  * Affichage bureau widescreen multi-colonnes (grille 3 à 4 colonnes, bandeau héro panoramique, widgets latéraux).
  * Barre des tâches Windows 11 avec menu Démarrer, recherche et horloge système.
  * Commandes de zoom adaptatif (75%, 90%, 100%, 125%) et bascule instantanée vers le mode mobile.

### Étape 6 : Tests & Intégration Continue
* Création de tests unitaires complets (`MyStayViewModelTest.kt`) validant le filtrage par région, les réservations, l'authentification et les modes d'affichage.
* Compilation réussie avec `gradle testDebugUnitTest` (`BUILD SUCCESSFUL in 22s`).
* Build de production Web via `tsc && vite build` générant le dossier de distribution optimisé.

---

## 4. Fonctionnement de la Version Windows (Ordinateur Normal)

Sur un ordinateur ordinaire fonctionnant sous Windows (Windows 10 ou Windows 11), **MyStay Voyager Sénégal** tire pleinement parti du grand écran :

1. **Disposition Grand Écran (Widescreen 1920x1080) :**
   * **Barre de navigation horizontale complète :** Accès direct à *Découvrir*, *Régions*, *Mes Séjours*, *Guide Koumba IA*, *Espace Hôte* et au profil connecté.
   * **Bandeau Héro Panoramique :** Photographie immersive avec barre de recherche élargie intégrant la liste déroulante des 14 régions du Sénégal.
   * **Grille de cartes multi-colonnes :** Affichage de 3 à 4 hébergements par rangée avec badges d'impact solidaire, note Teranga et bouton de visionnage vidéo.
   * **Fiche Détail Séjour avec volet latéral fixe :** La colonne de gauche détaille l'histoire culturelle et les engagements écotouristiques, tandis que le widget de réservation reste fixé à droite pour faciliter la sélection des dates et du nombre de voyageurs en Francs CFA.
   * **Espace Hôte sous forme de Dashboard :** Tableau récapitulatif des indicateurs clés (revenus, réservations, séjours actifs) et bouton de publication de nouveau séjour.

---

## 5. Guide de Démarrage Rapide sous Windows

Pour exécuter et tester la version Windows directement sur votre ordinateur :

### Prérequis
* [Node.js](https://nodejs.org/) version 18 ou supérieure installée sur votre PC Windows.
* Un navigateur moderne (Google Chrome, Microsoft Edge, Firefox, Brave).

### Instructions pas à pas :

1. **Décompresser l'archive :**
   Extrayez le fichier `MyStay_Voyager_Senegal.zip` dans le dossier de votre choix (ex: `C:\Projets\MyStay-Senegal`).

2. **Ouvrir le terminal Windows (PowerShell ou Invite de commandes) :**
   ```cmd
   cd C:\Projets\MyStay-Senegal\web-platform
   ```

3. **Installer les dépendances :**
   ```cmd
   npm install
   ```

4. **Lancer le serveur de développement :**
   ```cmd
   npm run dev
   ```

5. **Ouvrir sur votre ordinateur :**
   Le terminal affichera une URL locale. Ouvrez votre navigateur sur :
   ```
   http://localhost:3000
   ```
   *L'application s'affichera immédiatement en plein écran avec sa disposition ordinateur complète.*

---

## 6. Packaging Exécutable Windows (.exe) & PWA Desktop

La plateforme est conçue pour être déployée sur Windows sous deux formes :

### Option A : Progressive Web App (PWA) de bureau
1. Ouvrez `http://localhost:3000` (ou votre URL de production) dans **Microsoft Edge** ou **Google Chrome**.
2. Cliquez sur l'icône **« Installer l'application »** située à droite de la barre d'adresse (ou dans le menu `...` > *Applications* > *Installer MyStay Sénégal*).
3. L'application s'ouvre alors dans sa propre fenêtre Windows indépendante, avec son icône sur le bureau et dans la barre des tâches Windows.

### Option B : Fichier d'installation Windows (.exe) avec Electron
Pour transformer le projet en logiciel Windows natif distribuable :
```cmd
cd web-platform
npm install --save-dev electron electron-builder
npm run electron:build
```
*Le fichier `MyStay-Voyager-Senegal-Setup-1.0.0.exe` est alors généré dans le sous-dossier `dist-electron/` et peut être installé sur n'importe quel PC Windows sans aucun prérequis.*

---

## 7. Architecture Technique & Stack Multiplateforme

```
MyStay-Voyager-Senegal/
├── README.md                      # Traçabilité complète du projet
├── LISEZMOI_PLATEFORME.md         # Guide d'utilisation de la plateforme
├── MyStay_Voyager_Senegal.zip     # Archive de distribution complète (14 Mo)
│
├── web-platform/                  # Plateforme Web & Ordinateur Windows
│   ├── src/
│   │   ├── App.tsx                # Interface principale (Simulateur PC Windows & Mobile)
│   │   ├── data/
│   │   │   └── senegalListings.ts # Données des séjours, 14 régions et utilisateurs
│   │   └── index.css              # Styles Tailwind CSS
│   ├── public/images/             # Visuels photographiques haute définition
│   ├── package.json               # Scripts et dépendances React / Vite / Lucide
│   └── vite.config.ts             # Configuration du bundler de production
│
└── app/                           # Application Mobile Android Native
    ├── src/main/java/com/example/
    │   ├── MainActivity.kt        # Point d'entrée Android (Edge-to-Edge)
    │   ├── viewmodel/             # Gestion d'état unifiée (MyStayViewModel)
    │   ├── model/                 # Modèles de données (User, Listing, Booking)
    │   ├── data/                  # Données sénégalaises & base Koumba
    │   └── ui/screens/            # Écrans Compose & WebPlatformScreen (WebView PC)
    └── src/main/assets/web/       # Build de production Web intégré dans l'APK
```

---

## 8. Vérification & Assurance Qualité

* **Tests Unitaires JVM :** `gradle :app:testDebugUnitTest` -> `33 actionable tasks executed, BUILD SUCCESSFUL`.
* **Validation des 14 Régions :** Test de sélection et filtrage dynamique sans perte de données.
* **Validation Authentification :** Test de connexion voyageur, création de compte hôte et déconnexion.
* **Validation Médias :** Test d'ajout d'image personnalisée et lecture de flux vidéo dans le lecteur immersif.
* **Validation Affichage Écran Ordinateur :** Test de la vue bureau Windows 11 avec bascule mobile et zoom dynamique.

---
*Fait avec fierté pour la promotion de la Teranga et de l'écotourisme sénégalais.* 🇸🇳
