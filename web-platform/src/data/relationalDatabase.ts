// ============================================================================
// 🇸🇳 MyStay Sénégal — Modèle Relationnel & Base de Données Complète
// ============================================================================
// Ce fichier implémente l'ensemble des 16 tables transmises, leurs relations
// (clés étrangères), calculs financiers (commission 12%, paiements, reversements)
// et fonctions de requêtage relationnel.

// ----------------------------------------------------------------------------
// 1. DÉFINITIONS DES TYPES DE TABLES
// ----------------------------------------------------------------------------

export interface Parametre {
  Parametre_ID: string;
  Cle: string;
  Valeur: string;
  Type: 'Texte' | 'Nombre' | 'Booleen';
  Description: string;
  Modifiable_admin: 'Oui' | 'Non';
}

export interface Region {
  Region_ID: string;
  Nom_region: string;
  Code_region: string;
  Description: string;
  Image_url: string;
  Statut: 'Active' | 'Inactive';
  Ordre_affichage: number;
}

export interface Site {
  Site_ID: string;
  Nom_site: string;
  Region_ID: string; // FK -> Region
  Departement: string;
  Localite: string;
  Type_site: 'Patrimoine' | 'Parc_et_reserve' | 'Nature_aventure' | 'Culture_communautes' | 'Littoral';
  Description: string;
  Latitude: string;
  Longitude: string;
  Source_reference: string;
  Statut_validation: 'Valide' | 'A_verifier';
}

export interface Utilisateur {
  Utilisateur_ID: string;
  Prenom: string;
  Nom: string;
  Email: string;
  Telephone: string;
  Role: 'Administrateur' | 'Hote' | 'Voyageur';
  Langue: string;
  Pays: string;
  Statut_compte: 'Actif' | 'Suspendu' | 'En_attente';
  Statut_verification: 'Verifie' | 'Email_verifie' | 'En_attente';
  Consentement_donnees: 'Oui' | 'Non';
  Date_inscription: string;
  Notes_admin: string;
  Avatar_initiales?: string;
}

export interface Hebergement {
  Hebergement_ID: string;
  Titre: string;
  Hote_ID: string;   // FK -> Utilisateur
  Region_ID: string; // FK -> Region
  Site_ID: string;   // FK -> Site
  Type_hebergement: 'Eco-lodge' | 'Maison d\'hote' | 'Campement villageois' | 'Villa Lagune & Mer' | 'Tente Nomade' | 'Case traditionnelle';
  Capacite: number;
  Chambres: number;
  Prix_nuit_XOF: number;
  Frais_menage_XOF: number;
  Description: string;
  Adresse_approximative: string;
  Latitude: string;
  Longitude: string;
  Photo_principale_url: string;
  Photos_galerie?: string[];
  Video_url: string;
  Statut_annonce: 'Active' | 'En_attente_validation' | 'Brouillon';
  Mode_reservation: 'Sur_demande' | 'Instantanee';
  Labels: string; // ex: "Eco-responsable;Accueil_engage"
  Date_creation: string;
}

export interface Equipement {
  Equipement_ID: string;
  Nom: string;
  Categorie: 'Confort' | 'Acces' | 'Loisirs' | 'Mobilite' | 'Services';
  Actif: 'Oui' | 'Non';
}

export interface HebergementEquipement {
  Lien_ID: string;
  Hebergement_ID: string; // FK -> Hebergement
  Equipement_ID: string;   // FK -> Equipement
  Commentaire: string;
}

export interface Engagement {
  Engagement_ID: string;
  Nom: string;
  Categorie: 'Energie' | 'Eau' | 'Dechets' | 'Economie locale' | 'Mobilite' | 'Nature' | 'Impact social';
  Description: string;
  Preuve_requise: string;
  Actif: 'Oui' | 'Non';
}

export interface HebergementEngagement {
  Lien_ID: string;
  Hebergement_ID: string; // FK -> Hebergement
  Engagement_ID: string;   // FK -> Engagement
  Justificatif_url: string;
  Commentaire: string;
  Verifie_par_admin: 'Oui' | 'Non';
  Date_verification: string;
}

export interface Disponibilite {
  Disponibilite_ID: string;
  Hebergement_ID: string; // FK -> Hebergement
  Date: string;
  Statut: 'Disponible' | 'Bloque' | 'Reserve';
  Prix_special_XOF: string;
  Sejour_min_nuits: number;
  Commentaire: string;
}

export interface Reservation {
  Reservation_ID: string;
  Hebergement_ID: string; // FK -> Hebergement
  Voyageur_ID: string;    // FK -> Utilisateur
  Date_arrivee: string;
  Date_depart: string;
  Nombre_nuits: number;
  Nombre_voyageurs: number;
  Montant_nuitees_XOF: number;
  Frais_menage_XOF: number;
  Frais_service_XOF: number; // 12% commission
  Taxes_XOF: number;
  Montant_total_XOF: number;
  Statut_reservation: 'En_attente_paiement' | 'Confirmee' | 'En_cours' | 'Terminee' | 'Annulee';
  Statut_paiement: 'Initie' | 'Paye' | 'Echoue' | 'Rembourse';
  Code_acces: string;
  Date_creation: string;
  Notes: string;
}

export interface Paiement {
  Paiement_ID: string;
  Reservation_ID: string; // FK -> Reservation
  Canal_paiement: 'Wave' | 'Orange Money' | 'Carte Bancaire' | 'Virement';
  Reference_transaction: string;
  Montant_XOF: number;
  Devise: string;
  Frais_transaction_XOF: number;
  Statut_paiement: 'Initie' | 'Confirme' | 'Echoue';
  Date_initiee: string;
  Date_confirmee: string;
  Webhook_recu: 'Oui' | 'Non';
  Remboursement_XOF: number;
  Notes_admin: string;
}

export interface Reversement {
  Reversement_ID: string;
  Reservation_ID: string; // FK -> Reservation
  Hote_ID: string;        // FK -> Utilisateur
  Montant_brut_XOF: number;
  Commission_MyStay_XOF: number;
  Frais_transaction_XOF: number;
  Montant_net_XOF: number;
  Canal_reversement: 'Orange Money' | 'Wave' | 'Virement bancaire';
  Statut_reversement: 'A_preparer' | 'En_cours' | 'Paye';
  Date_prevue: string;
  Date_effective: string;
  Reference_reversement: string;
}

export interface Experience {
  Experience_ID: string;
  Titre: string;
  Partenaire_ID: string; // FK -> Utilisateur
  Region_ID: string;     // FK -> Region
  Site_ID: string;       // FK -> Site
  Categorie: 'Nature' | 'Culture' | 'Gastronomie' | 'Artisanat' | 'Mer_et_Plage';
  Duree: string;
  Prix_XOF: number;
  Capacite_max: number;
  Description: string;
  Statut: 'Active' | 'En_attente_validation';
  Image_url: string;
}

export interface Avis {
  Avis_ID: string;
  Reservation_ID: string; // FK -> Reservation
  Hebergement_ID: string; // FK -> Hebergement
  Voyageur_ID: string;    // FK -> Utilisateur
  Note_globale: number;
  Note_accueil: number;
  Note_authenticite: number;
  Note_durabilite: number;
  Commentaire: string;
  Reponse_hote: string;
  Statut_moderation: 'Valide' | 'En_attente' | 'Rejete';
  Date_avis: string;
}

export interface Contenu {
  Contenu_ID: string;
  Region_ID: string; // FK -> Region
  Site_ID: string;   // FK -> Site
  Titre: string;
  Type_contenu: 'Guide_destination' | 'Conseil_voyage' | 'Histoire_teranga';
  Texte: string;
  Source: string;
  Statut_publication: 'Publie' | 'Brouillon';
  Date_mise_a_jour: string;
}

// ----------------------------------------------------------------------------
// 2. DONNÉES INITIALES EXACTES DES 16 TABLES
// ----------------------------------------------------------------------------

export const INITIAL_PARAMETRES: Parametre[] = [
  { Parametre_ID: "SET-001", Cle: "devise", Valeur: "XOF", Type: "Texte", Description: "Franc CFA BCEAO", Modifiable_admin: "Oui" },
  { Parametre_ID: "SET-002", Cle: "commission_mystay_pourcent", Valeur: "12", Type: "Nombre", Description: "Commission plateforme par defaut (12%)", Modifiable_admin: "Oui" },
  { Parametre_ID: "SET-003", Cle: "delai_paiement_minutes", Valeur: "30", Type: "Nombre", Description: "Delai de paiement avant liberation dates", Modifiable_admin: "Oui" },
  { Parametre_ID: "SET-004", Cle: "minimum_engagements_durables", Valeur: "3", Type: "Nombre", Description: "Minimum d engagements durables requis pour un hote", Modifiable_admin: "Oui" },
  { Parametre_ID: "SET-005", Cle: "adresse_exacte_avant_confirmation", Valeur: "Non", Type: "Booleen", Description: "Protection de la localisation exacte", Modifiable_admin: "Oui" }
];

export const INITIAL_REGIONS: Region[] = [
  { Region_ID: "REG-DAK", Nom_region: "Dakar", Code_region: "DK", Description: "Capitale, culture, littoral et patrimoine.", Image_url: "/images/goree-teranga.jpg", Statut: "Active", Ordre_affichage: 1 },
  { Region_ID: "REG-DIU", Nom_region: "Diourbel", Code_region: "DB", Description: "Patrimoine religieux, artisanat et culture.", Image_url: "/images/hero-senegal.jpg", Statut: "Active", Ordre_affichage: 2 },
  { Region_ID: "REG-FAT", Nom_region: "Fatick", Code_region: "FK", Description: "Delta du Saloum, mangroves et culture serere.", Image_url: "/images/lodge-saloum.jpg", Statut: "Active", Ordre_affichage: 3 },
  { Region_ID: "REG-THI", Nom_region: "Thies", Code_region: "TH", Description: "Petite-Cote, Popenguine, Joal-Fadiouth et littoral.", Image_url: "/images/hero-senegal.jpg", Statut: "Active", Ordre_affichage: 4 },
  { Region_ID: "REG-STL", Nom_region: "Saint-Louis", Code_region: "SL", Description: "Ville historique, fleuve, Djoudj et Langue de Barbarie.", Image_url: "/images/goree-teranga.jpg", Statut: "Active", Ordre_affichage: 5 },
  { Region_ID: "REG-LOU", Nom_region: "Louga", Code_region: "LG", Description: "Lompoul, paysages saheliens et experiences communautaires.", Image_url: "/images/hero-senegal.jpg", Statut: "Active", Ordre_affichage: 6 },
  { Region_ID: "REG-MAT", Nom_region: "Matam", Code_region: "MT", Description: "Fouta-Toro, fleuve Senegal et patrimoine peul.", Image_url: "/images/hero-senegal.jpg", Statut: "Active", Ordre_affichage: 7 },
  { Region_ID: "REG-KAO", Nom_region: "Kaolack", Code_region: "KL", Description: "Carrefour du Saloum, marches, artisanat et gastronomie.", Image_url: "/images/hero-senegal.jpg", Statut: "Active", Ordre_affichage: 8 },
  { Region_ID: "REG-KAF", Nom_region: "Kaffrine", Code_region: "KF", Description: "Territoires ruraux, artisanat et circuits communautaires.", Image_url: "/images/hero-senegal.jpg", Statut: "Active", Ordre_affichage: 9 },
  { Region_ID: "REG-TAM", Nom_region: "Tambacounda", Code_region: "TC", Description: "Senegal oriental et acces au Niokolo-Koba.", Image_url: "/images/casamance-campement.jpg", Statut: "Active", Ordre_affichage: 10 },
  { Region_ID: "REG-KED", Nom_region: "Kedougou", Code_region: "KD", Description: "Pays Bassari, cascades, montagnes et cultures vivantes.", Image_url: "/images/casamance-campement.jpg", Statut: "Active", Ordre_affichage: 11 },
  { Region_ID: "REG-KOL", Nom_region: "Kolda", Code_region: "KD", Description: "Haute-Casamance, forets et experiences rurales.", Image_url: "/images/casamance-campement.jpg", Statut: "Active", Ordre_affichage: 12 },
  { Region_ID: "REG-ZIG", Nom_region: "Ziguinchor", Code_region: "ZG", Description: "Basse-Casamance, bolongs, villages et cultures diola.", Image_url: "/images/casamance-campement.jpg", Statut: "Active", Ordre_affichage: 13 },
  { Region_ID: "REG-SED", Nom_region: "Sedhiou", Code_region: "SD", Description: "Casamance interieure, fleuve, agriculture et artisanat.", Image_url: "/images/casamance-campement.jpg", Statut: "Active", Ordre_affichage: 14 }
];

export const INITIAL_SITES: Site[] = [
  { Site_ID: "SITE-GOR", Nom_site: "Ile de Goree", Region_ID: "REG-DAK", Departement: "Dakar", Localite: "Goree", Type_site: "Patrimoine", Description: "Ile historique et culturelle classee UNESCO.", Latitude: "14.667", Longitude: "-17.398", Source_reference: "Partenaire municipal Goree", Statut_validation: "Valide" },
  { Site_ID: "SITE-SAL", Nom_site: "Delta du Saloum", Region_ID: "REG-FAT", Departement: "Foundiougne", Localite: "Sine-Saloum", Type_site: "Parc_et_reserve", Description: "Mangroves, iles de Mar Lodj et ecotourisme.", Latitude: "13.800", Longitude: "-16.600", Source_reference: "Reserve de Biosphere UNESCO", Statut_validation: "Valide" },
  { Site_ID: "SITE-DJO", Nom_site: "Parc national des oiseaux du Djoudj", Region_ID: "REG-STL", Departement: "Dagana", Localite: "Djoudj", Type_site: "Parc_et_reserve", Description: "Reserve ornithologique mondiale et 3e reserve d oiseaux aquatiques.", Latitude: "16.400", Longitude: "-16.300", Source_reference: "Direction des Parcs Nationaux", Statut_validation: "Valide" },
  { Site_ID: "SITE-LOM", Nom_site: "Desert de Lompoul", Region_ID: "REG-LOU", Departement: "Kebemer", Localite: "Lompoul", Type_site: "Nature_aventure", Description: "Dunes de sable ocre et paysages saheliens.", Latitude: "15.300", Longitude: "-16.200", Source_reference: "Comite villageois Lompoul", Statut_validation: "Valide" },
  { Site_ID: "SITE-NIO", Nom_site: "Parc national du Niokolo-Koba", Region_ID: "REG-TAM", Departement: "Tambacounda", Localite: "Niokolo-Koba", Type_site: "Parc_et_reserve", Description: "Faune sauvage et paysages du Senegal oriental.", Latitude: "13.100", Longitude: "-13.000", Source_reference: "Parcs Nationaux", Statut_validation: "Valide" },
  { Site_ID: "SITE-KED", Nom_site: "Cascades de Dindefelo", Region_ID: "REG-KED", Departement: "Kedougou", Localite: "Dindefelo", Type_site: "Nature_aventure", Description: "Cascades spectaculaires et paysages du sud-est.", Latitude: "12.560", Longitude: "-12.180", Source_reference: "Reserve naturelle communautaire", Statut_validation: "Valide" },
  { Site_ID: "SITE-CAS", Nom_site: "Basse-Casamance & Oussouye", Region_ID: "REG-ZIG", Departement: "Ziguinchor", Localite: "Oussouye", Type_site: "Culture_communautes", Description: "Bolongs, forets sacrees et cases traditionnelles diola.", Latitude: "12.580", Longitude: "-16.270", Source_reference: "Royaume d Oussouye", Statut_validation: "Valide" },
  { Site_ID: "SITE-POP", Nom_site: "Popenguine & Lagune Somone", Region_ID: "REG-THI", Departement: "Mbour", Localite: "Popenguine", Type_site: "Littoral", Description: "Falaises, reserve naturelle et littoral de la Petite-Cote.", Latitude: "14.550", Longitude: "-17.120", Source_reference: "Commune de Popenguine", Statut_validation: "Valide" }
];

export const INITIAL_UTILISATEURS: Utilisateur[] = [
  { Utilisateur_ID: "USR-ADM-001", Prenom: "Admin", Nom: "MyStay", Email: "admin@mystay.sn", Telephone: "+221 77 000 00 00", Role: "Administrateur", Langue: "fr", Pays: "Senegal", Statut_compte: "Actif", Statut_verification: "Verifie", Consentement_donnees: "Oui", Date_inscription: "2026-10-03", Notes_admin: "Compte administrateur initial", Avatar_initiales: "AD" },
  { Utilisateur_ID: "USR-HOT-001", Prenom: "Awa", Nom: "Diop", Email: "awa.diop@example.sn", Telephone: "770000001", Role: "Hote", Langue: "fr", Pays: "Senegal", Statut_compte: "Actif", Statut_verification: "Verifie", Consentement_donnees: "Oui", Date_inscription: "2026-10-03", Notes_admin: "Hote pilote Saloum", Avatar_initiales: "AD" },
  { Utilisateur_ID: "USR-HOT-002", Prenom: "Ba Tamsir", Nom: "Ndiaye", Email: "tamsir.ndiaye@teranga.sn", Telephone: "788765432", Role: "Hote", Langue: "fr", Pays: "Senegal", Statut_compte: "Actif", Statut_verification: "Verifie", Consentement_donnees: "Oui", Date_inscription: "2026-10-03", Notes_admin: "Piroguier et hote ecotourisme", Avatar_initiales: "TN" },
  { Utilisateur_ID: "USR-HOT-003", Prenom: "Fatou Kine", Nom: "Sow", Email: "fatou.sow@teranga.sn", Telephone: "771234567", Role: "Hote", Langue: "fr", Pays: "Senegal", Statut_compte: "Actif", Statut_verification: "Verifie", Consentement_donnees: "Oui", Date_inscription: "2026-10-03", Notes_admin: "Maitresse de maison Goree", Avatar_initiales: "FS" },
  { Utilisateur_ID: "USR-VYG-001", Prenom: "Mamadou", Nom: "Sarr", Email: "mamadou.sarr@example.sn", Telephone: "770000002", Role: "Voyageur", Langue: "fr", Pays: "Senegal", Statut_compte: "Actif", Statut_verification: "Email_verifie", Consentement_donnees: "Oui", Date_inscription: "2026-10-03", Notes_admin: "Exemple voyageur", Avatar_initiales: "MS" }
];

export const INITIAL_EQUIPEMENTS: Equipement[] = [
  { Equipement_ID: "EQ-001", Nom: "WiFi", Categorie: "Confort", Actif: "Oui" },
  { Equipement_ID: "EQ-002", Nom: "Cuisine", Categorie: "Confort", Actif: "Oui" },
  { Equipement_ID: "EQ-003", Nom: "Parking", Categorie: "Acces", Actif: "Oui" },
  { Equipement_ID: "EQ-004", Nom: "Climatisation", Categorie: "Confort", Actif: "Oui" },
  { Equipement_ID: "EQ-005", Nom: "Moustiquaire", Categorie: "Confort", Actif: "Oui" },
  { Equipement_ID: "EQ-006", Nom: "Acces plage", Categorie: "Loisirs", Actif: "Oui" },
  { Equipement_ID: "EQ-007", Nom: "Velo", Categorie: "Mobilite", Actif: "Oui" },
  { Equipement_ID: "EQ-008", Nom: "Petit-dejeuner", Categorie: "Services", Actif: "Oui" }
];

export const INITIAL_ENGAGEMENTS: Engagement[] = [
  { Engagement_ID: "ENG-001", Nom: "Energie renouvelable", Categorie: "Energie", Description: "Solaire, renouvelable ou solution basse consommation.", Preuve_requise: "Photo ou descriptif", Actif: "Oui" },
  { Engagement_ID: "ENG-002", Nom: "Gestion de l eau", Categorie: "Eau", Description: "Recuperation, economie d eau ou dispositifs adaptes.", Preuve_requise: "Photo ou descriptif", Actif: "Oui" },
  { Engagement_ID: "ENG-003", Nom: "Tri et compostage", Categorie: "Dechets", Description: "Tri, reduction des dechets et compostage.", Preuve_requise: "Photo ou descriptif", Actif: "Oui" },
  { Engagement_ID: "ENG-004", Nom: "Produits locaux", Categorie: "Economie locale", Description: "Petit-dejeuner, panier ou partenariats locaux.", Preuve_requise: "Description et partenaire", Actif: "Oui" },
  { Engagement_ID: "ENG-005", Nom: "Mobilite douce", Categorie: "Mobilite", Description: "Velos, navette ou information mobilite responsable.", Preuve_requise: "Description", Actif: "Oui" },
  { Engagement_ID: "ENG-006", Nom: "Biodiversite", Categorie: "Nature", Description: "Protection de la biodiversite et sensibilisation.", Preuve_requise: "Photo ou descriptif", Actif: "Oui" },
  { Engagement_ID: "ENG-007", Nom: "Emploi local", Categorie: "Impact social", Description: "Recours a des emplois ou prestataires locaux.", Preuve_requise: "Description", Actif: "Oui" }
];

export const INITIAL_HEBERGEMENTS: Hebergement[] = [
  {
    Hebergement_ID: "HEB-001",
    Titre: "Eco-lodge pilote du Saloum",
    Hote_ID: "USR-HOT-001",
    Region_ID: "REG-FAT",
    Site_ID: "SITE-SAL",
    Type_hebergement: "Eco-lodge",
    Capacite: 4,
    Chambres: 2,
    Prix_nuit_XOF: 45000,
    Frais_menage_XOF: 5000,
    Description: "Hebergement pilote au coeur du Saloum face aux mangroves. Bungalow sur pilotis alimenté à l'énergie solaire avec vue imprenable sur le fleuve.",
    Adresse_approximative: "Ile de Mar Lodj, Sine-Saloum",
    Latitude: "13.810",
    Longitude: "-16.610",
    Photo_principale_url: "/images/lodge-saloum.jpg",
    Video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    Statut_annonce: "Active",
    Mode_reservation: "Sur_demande",
    Labels: "Eco-responsable;Accueil_engage",
    Date_creation: "2026-10-03"
  },
  {
    Hebergement_ID: "HEB-002",
    Titre: "Demeure Coloniale Teranga Goree",
    Hote_ID: "USR-HOT-003",
    Region_ID: "REG-DAK",
    Site_ID: "SITE-GOR",
    Type_hebergement: "Maison d'hote",
    Capacite: 2,
    Chambres: 1,
    Prix_nuit_XOF: 55000,
    Frais_menage_XOF: 6000,
    Description: "Maison d'hôtes chargée d'histoire avec patio ombragé de bougainvilliers sur l'île piétonne de Gorée, à 20 min de chaloupe de Dakar.",
    Adresse_approximative: "Rue des Dongeons, Ile de Goree",
    Latitude: "14.667",
    Longitude: "-17.398",
    Photo_principale_url: "/images/goree-teranga.jpg",
    Video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    Statut_annonce: "Active",
    Mode_reservation: "Instantanee",
    Labels: "Patrimoine_vivant;Artisanat_feminin",
    Date_creation: "2026-10-03"
  },
  {
    Hebergement_ID: "HEB-003",
    Titre: "Campement Solidaire d'Oussouye",
    Hote_ID: "USR-HOT-002",
    Region_ID: "REG-ZIG",
    Site_ID: "SITE-CAS",
    Type_hebergement: "Campement villageois",
    Capacite: 5,
    Chambres: 2,
    Prix_nuit_XOF: 25000,
    Frais_menage_XOF: 3000,
    Description: "Case à impluvium traditionnelle au milieu des grands fromagers. Géré par la communauté villageoise d'Oussouye.",
    Adresse_approximative: "Oussouye, Basse Casamance",
    Latitude: "12.580",
    Longitude: "-16.270",
    Photo_principale_url: "/images/casamance-campement.jpg",
    Video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    Statut_annonce: "Active",
    Mode_reservation: "Sur_demande",
    Labels: "100% Communautaire;Architecture_banco",
    Date_creation: "2026-10-03"
  },
  {
    Hebergement_ID: "HEB-004",
    Titre: "Villa Ecologique de la Lagune Somone",
    Hote_ID: "USR-HOT-001",
    Region_ID: "REG-THI",
    Site_ID: "SITE-POP",
    Type_hebergement: "Villa Lagune & Mer",
    Capacite: 6,
    Chambres: 3,
    Prix_nuit_XOF: 70000,
    Frais_menage_XOF: 8000,
    Description: "Élégance naturelle en pierre du pays face aux flamants roses de la réserve ornithologique de la Somone.",
    Adresse_approximative: "La Somone, Petite Cote",
    Latitude: "14.500",
    Longitude: "-17.080",
    Photo_principale_url: "/images/hero-senegal.jpg",
    Video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    Statut_annonce: "Active",
    Mode_reservation: "Instantanee",
    Labels: "Reserve_protegee;Piscine_naturelle",
    Date_creation: "2026-10-03"
  },
  {
    Hebergement_ID: "HEB-005",
    Titre: "Bivouac Saharien des Dunes de Lompoul",
    Hote_ID: "USR-HOT-002",
    Region_ID: "REG-LOU",
    Site_ID: "SITE-LOM",
    Type_hebergement: "Tente Nomade",
    Capacite: 4,
    Chambres: 1,
    Prix_nuit_XOF: 38000,
    Frais_menage_XOF: 4000,
    Description: "Tentes mauritaniennes traditionnelles au coeur du désert dunaire de Lompoul. Nuit sous un ciel constellé d'étoiles.",
    Adresse_approximative: "Dunes de Lompoul, Louga",
    Latitude: "15.300",
    Longitude: "-16.200",
    Photo_principale_url: "/images/hero-senegal.jpg",
    Video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    Statut_annonce: "Active",
    Mode_reservation: "Sur_demande",
    Labels: "Zero_plastique;Grande_muraille_verte",
    Date_creation: "2026-10-03"
  }
];

export const INITIAL_HEBERGEMENT_EQUIPEMENTS: HebergementEquipement[] = [
  { Lien_ID: "HEQ-001", Hebergement_ID: "HEB-001", Equipement_ID: "EQ-001", Commentaire: "Connexion WiFi solaire selon disponibilite" },
  { Lien_ID: "HEQ-002", Hebergement_ID: "HEB-001", Equipement_ID: "EQ-002", Commentaire: "Cuisine locale equipee" },
  { Lien_ID: "HEQ-003", Hebergement_ID: "HEB-001", Equipement_ID: "EQ-008", Commentaire: "Option locale petit-dejeuner sur demande" },
  { Lien_ID: "HEQ-004", Hebergement_ID: "HEB-001", Equipement_ID: "EQ-005", Commentaire: "Moustiquaires artisanales traitees" },
  { Lien_ID: "HEQ-005", Hebergement_ID: "HEB-002", Equipement_ID: "EQ-001", Commentaire: "Fibre optique haut debit" },
  { Lien_ID: "HEQ-006", Hebergement_ID: "HEB-002", Equipement_ID: "EQ-006", Commentaire: "Plage a 150m" },
  { Lien_ID: "HEQ-007", Hebergement_ID: "HEB-002", Equipement_ID: "EQ-008", Commentaire: "Petit-dejeuner teranga inclus" },
  { Lien_ID: "HEQ-008", Hebergement_ID: "HEB-003", Equipement_ID: "EQ-007", Commentaire: "Velos tout-terrain fournis" },
  { Lien_ID: "HEQ-009", Hebergement_ID: "HEB-004", Equipement_ID: "EQ-004", Commentaire: "Climatisation douce solaire" }
];

export const INITIAL_HEBERGEMENT_ENGAGEMENTS: HebergementEngagement[] = [
  { Lien_ID: "HEN-001", Hebergement_ID: "HEB-001", Engagement_ID: "ENG-002", Justificatif_url: "", Commentaire: "Recuperation eau de pluie et jarres de filtration", Verifie_par_admin: "Oui", Date_verification: "2026-10-03" },
  { Lien_ID: "HEN-002", Hebergement_ID: "HEB-001", Engagement_ID: "ENG-003", Justificatif_url: "", Commentaire: "Tri et compostage pour le potager bio", Verifie_par_admin: "Oui", Date_verification: "2026-10-03" },
  { Lien_ID: "HEN-003", Hebergement_ID: "HEB-001", Engagement_ID: "ENG-004", Justificatif_url: "", Commentaire: "Panier produits locaux et huitres de mangrove", Verifie_par_admin: "Oui", Date_verification: "2026-10-03" },
  { Lien_ID: "HEN-004", Hebergement_ID: "HEB-001", Engagement_ID: "ENG-001", Justificatif_url: "", Commentaire: "Installation photovoltaique 24 panneaux solaires", Verifie_par_admin: "Oui", Date_verification: "2026-10-03" },
  { Lien_ID: "HEN-005", Hebergement_ID: "HEB-002", Engagement_ID: "ENG-007", Justificatif_url: "", Commentaire: "Atelier solidaire pour les artisanes de Goree", Verifie_par_admin: "Oui", Date_verification: "2026-10-03" },
  { Lien_ID: "HEN-006", Hebergement_ID: "HEB-003", Engagement_ID: "ENG-007", Justificatif_url: "", Commentaire: "100% des benefices reversés a l ecole du village", Verifie_par_admin: "Oui", Date_verification: "2026-10-03" }
];

export const INITIAL_DISPONIBILITES: Disponibilite[] = [
  { Disponibilite_ID: "DISP-001", Hebergement_ID: "HEB-001", Date: "2026-11-01", Statut: "Disponible", Prix_special_XOF: "", Sejour_min_nuits: 1, Commentaire: "" },
  { Disponibilite_ID: "DISP-002", Hebergement_ID: "HEB-001", Date: "2026-11-02", Statut: "Disponible", Prix_special_XOF: "", Sejour_min_nuits: 1, Commentaire: "" },
  { Disponibilite_ID: "DISP-003", Hebergement_ID: "HEB-001", Date: "2026-12-31", Statut: "Bloque", Prix_special_XOF: "", Sejour_min_nuits: 1, Commentaire: "Maintenance annuelle" }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    Reservation_ID: "RES-001",
    Hebergement_ID: "HEB-001",
    Voyageur_ID: "USR-VYG-001",
    Date_arrivee: "2026-11-01",
    Date_depart: "2026-11-03",
    Nombre_nuits: 2,
    Nombre_voyageurs: 2,
    Montant_nuitees_XOF: 90000,
    Frais_menage_XOF: 5000,
    Frais_service_XOF: 10800, // 12% de 90 000 XOF
    Taxes_XOF: 0,
    Montant_total_XOF: 105800,
    Statut_reservation: "En_attente_paiement",
    Statut_paiement: "Initie",
    Code_acces: "TERANGA-7824",
    Date_creation: "2026-10-03",
    Notes: "Reservation exemple pilote"
  }
];

export const INITIAL_PAIEMENTS: Paiement[] = [
  {
    Paiement_ID: "PAY-001",
    Reservation_ID: "RES-001",
    Canal_paiement: "Wave",
    Reference_transaction: "TX-WAVE-892173",
    Montant_XOF: 105800,
    Devise: "XOF",
    Frais_transaction_XOF: 0,
    Statut_paiement: "Initie",
    Date_initiee: "2026-10-03",
    Date_confirmee: "",
    Webhook_recu: "Non",
    Remboursement_XOF: 0,
    Notes_admin: "Transaction test Wave"
  }
];

export const INITIAL_REVERSEMENTS: Reversement[] = [
  {
    Reversement_ID: "REV-001",
    Reservation_ID: "RES-001",
    Hote_ID: "USR-HOT-001",
    Montant_brut_XOF: 90000,
    Commission_MyStay_XOF: 10800, // 12%
    Frais_transaction_XOF: 0,
    Montant_net_XOF: 79200,      // 90 000 - 10 800
    Canal_reversement: "Orange Money",
    Statut_reversement: "A_preparer",
    Date_prevue: "2026-11-04",
    Date_effective: "",
    Reference_reversement: "OM-SN-78912"
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    Experience_ID: "EXP-001",
    Titre: "Pirogue dans le Delta du Saloum",
    Partenaire_ID: "USR-HOT-001",
    Region_ID: "REG-FAT",
    Site_ID: "SITE-SAL",
    Categorie: "Nature",
    Duree: "3 heures",
    Prix_XOF: 15000,
    Capacite_max: 8,
    Description: "Sortie decouverte des bolongs et mangroves avec guide local et degustation d huitres fraiches.",
    Statut: "Active",
    Image_url: "/images/lodge-saloum.jpg"
  },
  {
    Experience_ID: "EXP-002",
    Titre: "Circuit Memoire & Art à l'Ile de Goree",
    Partenaire_ID: "USR-HOT-003",
    Region_ID: "REG-DAK",
    Site_ID: "SITE-GOR",
    Categorie: "Culture",
    Duree: "4 heures",
    Prix_XOF: 12000,
    Capacite_max: 12,
    Description: "Visite commentee de la Maison des Esclaves et rencontre avec les artistes peintres sous verre.",
    Statut: "Active",
    Image_url: "/images/goree-teranga.jpg"
  },
  {
    Experience_ID: "EXP-003",
    Titre: "Randonnee velo et foret sacree Diola",
    Partenaire_ID: "USR-HOT-002",
    Region_ID: "REG-ZIG",
    Site_ID: "SITE-CAS",
    Categorie: "Nature",
    Duree: "Half day",
    Prix_XOF: 10000,
    Capacite_max: 6,
    Description: "Parcours a velo a travers les fromagers centenaires et rizières de Basse-Casamance.",
    Statut: "Active",
    Image_url: "/images/casamance-campement.jpg"
  }
];

export const INITIAL_AVIS: Avis[] = [
  {
    Avis_ID: "AVIS-001",
    Reservation_ID: "RES-001",
    Hebergement_ID: "HEB-001",
    Voyageur_ID: "USR-VYG-001",
    Note_globale: 4.95,
    Note_accueil: 5.0,
    Note_authenticite: 5.0,
    Note_durabilite: 4.9,
    Commentaire: "Séjour inoubliable ! Le coucher de soleil sur les mangroves et la cuisine d'Awa sont d'une authenticité rare. L'engagement solaire est exemplaire.",
    Reponse_hote: "Jërëjëf Mamadou ! Ce fut un plaisir de vous faire découvrir notre belle région du Saloum.",
    Statut_moderation: "Valide",
    Date_avis: "2026-10-03"
  }
];

export const INITIAL_CONTENUS: Contenu[] = [
  {
    Contenu_ID: "CONT-001",
    Region_ID: "REG-FAT",
    Site_ID: "SITE-SAL",
    Titre: "Decouvrir le Delta du Saloum",
    Type_contenu: "Guide_destination",
    Texte: "Le Delta du Saloum est classe Reserve Mondiale de Biosphere par l UNESCO. Il abrite plus de 200 iles, une mangrove protegee et les traditions ancestrales sereres et niominka.",
    Source: "MyStay Senegal & Communaute Mar Lodj",
    Statut_publication: "Publie",
    Date_mise_a_jour: "2026-10-03"
  },
  {
    Contenu_ID: "CONT-002",
    Region_ID: "REG-DAK",
    Site_ID: "SITE-GOR",
    Titre: "L'Ile de Goree, Sanctuaire de Memoire et d'Art",
    Type_contenu: "Histoire_teranga",
    Texte: "A 20 minutes de chaloupe de Dakar, Goree incarne la resilience et la fraternite africaine. Ses ruelles colorees sans voiture accueillent ateliers d art et poesie.",
    Source: "Guide Historique de Goree",
    Statut_publication: "Publie",
    Date_mise_a_jour: "2026-10-03"
  }
];

// ----------------------------------------------------------------------------
// 3. MOTEUR DE REQUÊTAGE RELATIONNEL & GESTIONNAIRE D'ÉTAT
// ----------------------------------------------------------------------------

export interface HebergementComplet extends Hebergement {
  hote: Utilisateur;
  region: Region;
  site?: Site;
  equipements: Equipement[];
  engagements: Array<{
    engagement: Engagement;
    commentaire: string;
    justificatifUrl?: string;
    verifieParAdmin: 'Oui' | 'Non';
  }>;
  avisList: Avis[];
  experiencesLiees: Experience[];
}

export class RelationalDatabase {
  parametres: Parametre[] = [...INITIAL_PARAMETRES];
  regions: Region[] = [...INITIAL_REGIONS];
  sites: Site[] = [...INITIAL_SITES];
  utilisateurs: Utilisateur[] = [...INITIAL_UTILISATEURS];
  hebergements: Hebergement[] = [...INITIAL_HEBERGEMENTS];
  equipements: Equipement[] = [...INITIAL_EQUIPEMENTS];
  hebergementEquipements: HebergementEquipement[] = [...INITIAL_HEBERGEMENT_EQUIPEMENTS];
  engagements: Engagement[] = [...INITIAL_ENGAGEMENTS];
  hebergementEngagements: HebergementEngagement[] = [...INITIAL_HEBERGEMENT_ENGAGEMENTS];
  disponibilites: Disponibilite[] = [...INITIAL_DISPONIBILITES];
  reservations: Reservation[] = [...INITIAL_RESERVATIONS];
  paiements: Paiement[] = [...INITIAL_PAIEMENTS];
  reversements: Reversement[] = [...INITIAL_REVERSEMENTS];
  experiences: Experience[] = [...INITIAL_EXPERIENCES];
  avis: Avis[] = [...INITIAL_AVIS];
  contenus: Contenu[] = [...INITIAL_CONTENUS];

  // Helper: récupérer la commission plateforme
  getCommissionPourcent(): number {
    const p = this.parametres.find(x => x.Cle === "commission_mystay_pourcent");
    return p ? Number(p.Valeur) : 12;
  }

  // Helper: récupérer le minimum d'engagements durables requis
  getMinimumEngagements(): number {
    const p = this.parametres.find(x => x.Cle === "minimum_engagements_durables");
    return p ? Number(p.Valeur) : 3;
  }

  // Obtenir un hébergement avec toutes ses relations jointes (JOIN)
  getHebergementJoint(id: string): HebergementComplet | null {
    const heb = this.hebergements.find(h => h.Hebergement_ID === id);
    if (!heb) return null;

    const hote = this.utilisateurs.find(u => u.Utilisateur_ID === heb.Hote_ID) || {
      Utilisateur_ID: heb.Hote_ID,
      Prenom: "Hôte",
      Nom: "Teranga",
      Email: "contact@mystay.sn",
      Telephone: "+221 77 000 00 00",
      Role: "Hote" as const,
      Langue: "fr",
      Pays: "Senegal",
      Statut_compte: "Actif" as const,
      Statut_verification: "Verifie" as const,
      Consentement_donnees: "Oui" as const,
      Date_inscription: "2026-10-03",
      Notes_admin: "",
      Avatar_initiales: "HT"
    };

    const region = this.regions.find(r => r.Region_ID === heb.Region_ID) || {
      Region_ID: heb.Region_ID,
      Nom_region: "Sénégal",
      Code_region: "SN",
      Description: "Région du Sénégal",
      Image_url: heb.Photo_principale_url,
      Statut: "Active" as const,
      Ordre_affichage: 99
    };

    const site = this.sites.find(s => s.Site_ID === heb.Site_ID);

    // Join Equipements via table de liaison Hebergement_Equipement
    const eqLiens = this.hebergementEquipements.filter(l => l.Hebergement_ID === heb.Hebergement_ID);
    const equipementsList = eqLiens.map(l => {
      return this.equipements.find(e => e.Equipement_ID === l.Equipement_ID);
    }).filter((e): e is Equipement => e !== undefined);

    // Join Engagements via table de liaison Hebergement_Engagement
    const engLiens = this.hebergementEngagements.filter(l => l.Hebergement_ID === heb.Hebergement_ID);
    const engagementsList = engLiens.map(l => {
      const eng = this.engagements.find(e => e.Engagement_ID === l.Engagement_ID);
      if (!eng) return null;
      return {
        engagement: eng,
        commentaire: l.Commentaire,
        justificatifUrl: l.Justificatif_url,
        verifieParAdmin: l.Verifie_par_admin
      };
    }).filter((x): x is NonNullable<typeof x> => x !== null);

    // Join Avis
    const avisList = this.avis.filter(a => a.Hebergement_ID === heb.Hebergement_ID);

    // Join Experiences du même site / région
    const experiencesLiees = this.experiences.filter(exp => 
      exp.Site_ID === heb.Site_ID || exp.Region_ID === heb.Region_ID
    );

    return {
      ...heb,
      hote,
      region,
      site,
      equipements: equipementsList,
      engagements: engagementsList,
      avisList,
      experiencesLiees
    };
  }

  // Obtenir tous les hébergements avec relations
  getAllHebergementsJoints(): HebergementComplet[] {
    return this.hebergements.map(h => this.getHebergementJoint(h.Hebergement_ID)!);
  }

  // Calcul du coût et répartition financière (conformément aux Paramètres)
  calculerDevisReservation(hebergement: Hebergement, nuits: number, voyageurs: number) {
    const montantNuitees = hebergement.Prix_nuit_XOF * nuits;
    const fraisMenage = hebergement.Frais_menage_XOF || 0;
    const commissionTaux = this.getCommissionPourcent() / 100; // 12%
    const fraisService = Math.round(montantNuitees * commissionTaux);
    const montantTotal = montantNuitees + fraisMenage + fraisService;
    const montantNetHote = (montantNuitees + fraisMenage) - fraisService;

    return {
      montantNuitees,
      fraisMenage,
      fraisService,
      montantTotal,
      montantNetHote,
      commissionTauxPourcent: this.getCommissionPourcent()
    };
  }

  // Enregistrer une nouvelle réservation avec ses tables filles (Paiement & Reversement)
  creerReservationComplete(params: {
    hebergementId: string;
    voyageurId: string;
    dateArrivee: string;
    dateDepart: string;
    nombreNuits: number;
    nombreVoyageurs: number;
    canalPaiement: 'Wave' | 'Orange Money' | 'Carte Bancaire';
    notes?: string;
  }): { reservation: Reservation; paiement: Paiement; reversement: Reversement } {
    const heb = this.hebergements.find(h => h.Hebergement_ID === params.hebergementId);
    if (!heb) throw new Error("Hébergement introuvable");

    const devis = this.calculerDevisReservation(heb, params.nombreNuits, params.nombreVoyageurs);
    const dateNow = new Date().toISOString().split('T')[0];
    const resId = "RES-" + Date.now().toString().slice(-6);

    const reservation: Reservation = {
      Reservation_ID: resId,
      Hebergement_ID: heb.Hebergement_ID,
      Voyageur_ID: params.voyageurId,
      Date_arrivee: params.dateArrivee,
      Date_depart: params.dateDepart,
      Nombre_nuits: params.nombreNuits,
      Nombre_voyageurs: params.nombreVoyageurs,
      Montant_nuitees_XOF: devis.montantNuitees,
      Frais_menage_XOF: devis.fraisMenage,
      Frais_service_XOF: devis.fraisService,
      Taxes_XOF: 0,
      Montant_total_XOF: devis.montantTotal,
      Statut_reservation: "Confirmee",
      Statut_paiement: "Paye",
      Code_acces: "TERANGA-" + Math.floor(1000 + Math.random() * 9000),
      Date_creation: dateNow,
      Notes: params.notes || "Réservation confirmée via plateforme MyStay Sénégal"
    };

    const paiement: Paiement = {
      Paiement_ID: "PAY-" + Date.now().toString().slice(-6),
      Reservation_ID: resId,
      Canal_paiement: params.canalPaiement,
      Reference_transaction: `TX-${params.canalPaiement.toUpperCase().slice(0, 2)}-${Math.floor(100000 + Math.random() * 900000)}`,
      Montant_XOF: devis.montantTotal,
      Devise: "XOF",
      Frais_transaction_XOF: 0,
      Statut_paiement: "Confirme",
      Date_initiee: dateNow,
      Date_confirmee: dateNow,
      Webhook_recu: "Oui",
      Remboursement_XOF: 0,
      Notes_admin: `Paiement ${params.canalPaiement} confirmé avec succès`
    };

    const reversement: Reversement = {
      Reversement_ID: "REV-" + Date.now().toString().slice(-6),
      Reservation_ID: resId,
      Hote_ID: heb.Hote_ID,
      Montant_brut_XOF: devis.montantNuitees,
      Commission_MyStay_XOF: devis.fraisService,
      Frais_transaction_XOF: 0,
      Montant_net_XOF: devis.montantNetHote,
      Canal_reversement: params.canalPaiement === 'Wave' ? 'Wave' : 'Orange Money',
      Statut_reversement: "A_preparer",
      Date_prevue: params.dateArrivee,
      Date_effective: "",
      Reference_reversement: `REV-OM-${Math.floor(10000 + Math.random() * 90000)}`
    };

    this.reservations.unshift(reservation);
    this.paiements.unshift(paiement);
    this.reversements.unshift(reversement);

    return { reservation, paiement, reversement };
  }

  // Ajouter un nouvel hébergement avec création automatique des liaisons Equipements & Engagements
  ajouterHebergementComplet(params: {
    titre: string;
    hoteId: string;
    regionId: string;
    siteId?: string;
    typeHebergement: Hebergement['Type_hebergement'];
    capacite: number;
    chambres: number;
    prixNuitXof: number;
    fraisMenageXof: number;
    description: string;
    adresseApproximative: string;
    photoPrincipaleUrl: string;
    videoUrl?: string;
    equipementIds: string[];
    engagementIds: string[];
    labels?: string;
  }): HebergementComplet {
    const hebId = "HEB-" + (this.hebergements.length + 1).toString().padStart(3, '0');
    const dateNow = new Date().toISOString().split('T')[0];

    // Résolution du site par défaut si non spécifié
    let finalSiteId = params.siteId;
    if (!finalSiteId) {
      const siteDeLaRegion = this.sites.find(s => s.Region_ID === params.regionId);
      finalSiteId = siteDeLaRegion ? siteDeLaRegion.Site_ID : "SITE-SAL";
    }

    const hebergement: Hebergement = {
      Hebergement_ID: hebId,
      Titre: params.titre,
      Hote_ID: params.hoteId,
      Region_ID: params.regionId,
      Site_ID: finalSiteId,
      Type_hebergement: params.typeHebergement,
      Capacite: params.capacite,
      Chambres: params.chambres,
      Prix_nuit_XOF: params.prixNuitXof,
      Frais_menage_XOF: params.fraisMenageXof,
      Description: params.description,
      Adresse_approximative: params.adresseApproximative,
      Latitude: "14.000",
      Longitude: "-16.000",
      Photo_principale_url: params.photoPrincipaleUrl,
      Video_url: params.videoUrl || "",
      Statut_annonce: "Active",
      Mode_reservation: "Instantanee",
      Labels: params.labels || "Eco-responsable;Accueil_engage",
      Date_creation: dateNow
    };

    // Liaisons Equipements
    params.equipementIds.forEach((eqId, idx) => {
      this.hebergementEquipements.push({
        Lien_ID: `HEQ-${Date.now().toString().slice(-4)}-${idx}`,
        Hebergement_ID: hebId,
        Equipement_ID: eqId,
        Commentaire: "Inclus dans le séjour"
      });
    });

    // Liaisons Engagements durables
    params.engagementIds.forEach((engId, idx) => {
      this.hebergementEngagements.push({
        Lien_ID: `HEN-${Date.now().toString().slice(-4)}-${idx}`,
        Hebergement_ID: hebId,
        Engagement_ID: engId,
        Justificatif_url: "",
        Commentaire: "Engagement vérifié par MyStay Sénégal",
        Verifie_par_admin: "Oui",
        Date_verification: dateNow
      });
    });

    this.hebergements.unshift(hebergement);
    return this.getHebergementJoint(hebId)!;
  }
}

// Instance Singleton pour l'application
export const db = new RelationalDatabase();
