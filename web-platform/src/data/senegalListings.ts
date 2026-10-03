export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'traveler' | 'host';
  avatarInitials: string;
  region: string;
}

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  region: string; // One of the 14 Senegal regions
  location: string;
  priceXof: number;
  rating: number;
  reviewsCount: number;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  description: string;
  culturalStory: string;
  amenities: string[];
  host: {
    name: string;
    role: string;
    avatar: string;
    rating: number;
    bio: string;
  };
  ecoCommitments: Array<{
    title: string;
    description: string;
  }>;
  ecoImpactPercent: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  localSpecialties: string[];
}

export interface Region {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  bestSeason: string;
  highlights: string[];
  listingsCount: number;
}

// Les 14 régions administratives officielles du Sénégal
export const ALL_14_REGIONS = [
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Fatick",
  "Ziguinchor",
  "Kaolack",
  "Kaffrine",
  "Kédougou",
  "Louga",
  "Matam",
  "Diourbel",
  "Kolda",
  "Sédhiou",
  "Tambacounda"
];

export const SAMPLE_USERS: User[] = [
  {
    id: 'usr_amadou',
    name: 'Amadou Diallo',
    email: 'amadou.diallo@teranga.sn',
    phone: '+221 77 543 21 00',
    role: 'traveler',
    avatarInitials: 'AD',
    region: 'Dakar'
  },
  {
    id: 'usr_tamsir',
    name: 'Ba Tamsir Ndiaye',
    email: 'tamsir.ndiaye@teranga.sn',
    phone: '+221 78 876 54 32',
    role: 'host',
    avatarInitials: 'TN',
    region: 'Fatick'
  },
  {
    id: 'usr_awa',
    name: 'Awa Fall',
    email: 'awa.fall@teranga.sn',
    phone: '+221 77 345 67 89',
    role: 'host',
    avatarInitials: 'AF',
    region: 'Thiès'
  }
];

export const SENEGAL_LISTINGS: Listing[] = [
  {
    id: 'saloum-lodge',
    title: 'Éco-Lodge des Bolongs du Saloum',
    subtitle: 'Bungalow sur pilotis face au sanctuaire marin',
    region: 'Fatick',
    location: 'Île de Mar Lodj, Delta du Saloum (Fatick)',
    priceXof: 45000,
    rating: 4.96,
    reviewsCount: 128,
    category: 'Éco-lodge',
    imageUrl: '/images/lodge-saloum.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Havre de paix écologique niché au cœur du parc national du Delta du Saloum (classé UNESCO). Réveillez-vous avec le chant des pélicans et profitez d\'une vue panoramique sur les méandres de la mangrove.',
    culturalStory: 'Chaque soir, dînez autour du feu au son de la Kora joué par les griots de Mar Lodj. Les villageoises récoltent les huîtres de palétuvier selon des méthodes durables ancestrales.',
    amenities: ['Énergie 100% Solaire', 'Pirogue traditionnelle', 'Repas bio & pêche locale', 'Kayak dans les mangroves', 'Moustiquaires artisanales', 'Connexion Wi-Fi solaire'],
    host: {
      name: 'Ba Tamsir Ndiaye',
      role: 'Piroguier & Éco-gardien du Saloum',
      avatar: 'TN',
      rating: 4.96,
      bio: 'Natif de Mar Lodj, je transmets les secrets de la mangrove et des îles du Saloum depuis plus de 20 ans.'
    },
    ecoCommitments: [
      { title: 'Reforestation Mangrove', description: '5 000 palétuviers replantés chaque saison grâce à vos séjours' },
      { title: 'Zéro Plastique', description: 'Filtration d\'eau par jarres d\'argile traditionnelles' },
      { title: 'Énergie Renouvelable', description: '100% alimenté par 24 panneaux solaires avec batteries' }
    ],
    ecoImpactPercent: 10,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    localSpecialties: ['Huîtres grillées de mangrove', 'Couscous de mil au poisson salé', 'Jus de Ditakh frais']
  },
  {
    id: 'goree-demeure',
    title: 'Demeure Coloniale Teranga Gorée',
    subtitle: 'Maison d\'hôtes chargée d\'histoire & patio bougainvillier',
    region: 'Dakar',
    location: 'Rue des Dongeons, Île de Gorée (Dakar)',
    priceXof: 55000,
    rating: 4.98,
    reviewsCount: 94,
    category: 'Maison d\'hôte',
    imageUrl: '/images/goree-teranga.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Une adresse d\'exception sur l\'île piétonne de Gorée, à 20 minutes de chaloupe de Dakar. Les murs aux teintes ocre et rose pastel s\'ouvrent sur un patio ombragé où flotte le parfum des jasmins.',
    culturalStory: 'L\'île de Gorée est le sanctuaire de la mémoire et de la résilience africaine. Le soir, après le départ du dernier chaloupe, l\'île s\'enveloppe d\'un silence poétique bercé par les vagues.',
    amenities: ['Petit-déjeuner teranga inclus', 'Terrasse océan', 'Atelier Batik & Peinture sous verre', 'Climatisation naturelle', 'Bibliothèque d\'auteurs africains', 'Accès direct plage'],
    host: {
      name: 'Fatou Kiné Sow',
      role: 'Historienne & Maîtresse de maison',
      avatar: 'FS',
      rating: 4.98,
      bio: 'Passionnée par le patrimoine de l\'île de Gorée, j\'accueille les voyageurs dans la maison familiale du XIXe siècle restaurée.'
    },
    ecoCommitments: [
      { title: 'Patrimoine Vivant', description: 'Restauration à la chaux locale et bois de récupération' },
      { title: 'Artisanat Féminin', description: 'Ateliers d\'artisanat solidaire pour les femmes de l\'île' }
    ],
    ecoImpactPercent: 8,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    localSpecialties: ['Pastels au thon sauce piment doux', 'Thieboudienne Penda Mbaye', 'Cocktail gingembre-bouye']
  },
  {
    id: 'casamance-impluvium',
    title: 'Campement Solidaire d\'Oussouye',
    subtitle: 'Case à impluvium traditionnelle au milieu des fromagers',
    region: 'Ziguinchor',
    location: 'Oussouye, Basse Casamance (Ziguinchor)',
    priceXof: 25000,
    rating: 4.92,
    reviewsCount: 72,
    category: 'Campement villageois',
    imageUrl: '/images/casamance-campement.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Immergez-vous dans la fascinante culture Diola au sein d\'une case traditionnelle ronde en banco. Géré directement par la communauté villageoise, ce campement allie simplicité chaleureuse et authenticité.',
    culturalStory: 'Rencontrez le Roi d\'Oussouye dans le bois sacré pour comprendre les traditions de paix et de respect de la nature. Balades à vélo à travers les vergers de manguiers et les rizières.',
    amenities: ['Randonnée avec guide local', 'Vélos tout-terrain fournis', 'Repas du terroir en communauté', 'Douche solaire', 'Atelier vannerie'],
    host: {
      name: 'Ansoumana Diatta',
      role: 'Guide Communautaire Diola',
      avatar: 'AD',
      rating: 4.92,
      bio: 'En Casamance, nous vivons en harmonie avec les grands fromagers et les rizières.'
    },
    ecoCommitments: [
      { title: '100% Communautaire', description: 'Tous les bénéfices financent la cantine scolaire et le dispensaire' },
      { title: 'Construction Banco', description: 'Matériaux écologiques biosourcés : terre crue, chaume et rônier' }
    ],
    ecoImpactPercent: 15,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    localSpecialties: ['Poulet Yassa aux citrons verts de Casamance', 'Caldou au poisson & bouillon d\'oseille', 'Vin de palme doux de la matinée']
  },
  {
    id: 'somone-villa',
    title: 'Villa Écologique de la Lagune Somone',
    subtitle: 'Élégance naturelle face aux flamants roses',
    region: 'Thiès',
    location: 'La Somone, Petite Côte (Thiès)',
    priceXof: 70000,
    rating: 4.95,
    reviewsCount: 110,
    category: 'Villa Lagune & Mer',
    imageUrl: '/images/hero-senegal.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Située en bordure de la réserve ornithologique de la Somone, cette villa conçue en pierre du pays offre une vue imprenable sur l\'embouchure de la lagune et l\'océan Atlantique.',
    culturalStory: 'Chaque matin, observez les martins-pêcheurs, hérons et flamants roses depuis la terrasse en dégustant un café touba traditionnel.',
    amenities: ['Piscine naturelle eau salée', 'Chef cuisinier privé', 'Accès kayak lagune', 'Jardin tropical de baobabs', 'Climatisation douce solaire'],
    host: {
      name: 'Awa Fall',
      role: 'Créatrice culinaire & Hôte',
      avatar: 'AF',
      rating: 4.95,
      bio: 'Bienvenue sur la Petite Côte ! J\'adore partager les secrets du vrai Thiéboudienne et du jus de bissap bio.'
    },
    ecoCommitments: [
      { title: 'Réserve Protégée', description: 'Partenariat avec les écogardes pour la protection des oiseaux' },
      { title: 'Piscine Écologique', description: 'Système de phyto-épuration sans aucun produit chimique' }
    ],
    ecoImpactPercent: 7,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    localSpecialties: ['Capitaine braisé aux épices douces', 'Salade de crevettes de la Somone', 'Mousse de mangue']
  },
  {
    id: 'lompoul-bivouac',
    title: 'Écolodge Saharien des Dunes de Lompoul',
    subtitle: 'Tente mauritanienne sous la voûte étoilée du désert',
    region: 'Louga',
    location: 'Désert de Lompoul, Région de Louga',
    priceXof: 38000,
    rating: 4.89,
    reviewsCount: 85,
    category: 'Tente Nomade',
    imageUrl: '/images/hero-senegal.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Une parenthèse féerique dans l\'unique désert dunaire du Sénégal. Nichées entre les crêtes de sable ocre, nos tentes traditionnelles vous invitent à la contemplation.',
    culturalStory: 'Soirée contes et percussions djembé autour du feu de camp, suivie de la traditionnelle dégustation des 3 thés sénégalais (Attaya).',
    amenities: ['Balade à dos de dromadaire', 'Feu de camp & percussions', 'Observation des étoiles', 'Sanitaires solaires individuels'],
    host: {
      name: 'Mamadou Ba',
      role: 'Guide Bédouin & Gardien des sables',
      avatar: 'MB',
      rating: 4.89,
      bio: 'Je connais chaque dune de Lompoul depuis mon enfance et veille à préserver sa quiétude.'
    },
    ecoCommitments: [
      { title: 'Zéro Déchet Plastique', description: 'Gourdes inox fournies et gestion stricte des déchets' },
      { title: 'Protection de la Grande Muraille Verte', description: 'Participation au reboisement contre l\'avancée du désert' }
    ],
    ecoImpactPercent: 12,
    maxGuests: 4,
    bedrooms: 1,
    bathrooms: 1,
    localSpecialties: ['Méchoui d\'agneau aux herbes du Sahel', 'Couscous Thiéré traditionnel', 'Attaya aux feuilles de menthe fraîche']
  },
  {
    id: 'saint-louis-fleuve',
    title: 'Maison du Fleuve & Comptoir Saint-Louisien',
    subtitle: 'Architecture coloniale restaurée face au pont Faidherbe',
    region: 'Saint-Louis',
    location: 'Île de Saint-Louis (Classée UNESCO)',
    priceXof: 48000,
    rating: 4.94,
    reviewsCount: 104,
    category: 'Maison d\'hôte',
    imageUrl: '/images/goree-teranga.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'Demeure saint-louisienne historique avec coursive en fer forgé donnant sur le fleuve Sénégal. Ambiance jazzy, vélos de ville et accès privilégié au parc du Djoudj.',
    culturalStory: 'Capitale historique et berceau de l\'élégance des Signares. Dégustez le véritable Thiéboudienne rouge là même où Penda Mbaye l\'a inventé.',
    amenities: ['Excursion Parc National du Djoudj', 'Balade en calèche d\'époque', 'Petit-déjeuner au bord de l\'eau', 'Vélos à disposition'],
    host: {
      name: 'Sokhna Diop',
      role: 'Signare & Passionnée de patrimoine',
      avatar: 'SD',
      rating: 4.94,
      bio: 'Fille de Ndar (Saint-Louis), je vous fais découvrir la poésie des deux rives.'
    },
    ecoCommitments: [
      { title: 'Sanctuaire des Oiseaux', description: 'Soutien aux ornithologues du parc national du Djoudj' },
      { title: 'Rénovation Éco-patrimoine', description: 'Isolation thermique naturelle par briques de terre compressée' }
    ],
    ecoImpactPercent: 9,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    localSpecialties: ['Thiéboudienne rouge Penda Mbaye', 'Bouye au baobab frais', 'Beignets dougoub']
  }
];

export const SENEGAL_REGIONS: Region[] = [
  {
    id: 'fatick',
    name: 'Fatick',
    tagline: 'Sine-Saloum : le labyrinthe féerique des îles et mangroves',
    description: 'Delta mythique classé Réserve Mondiale de Biosphère UNESCO. Plus de 200 îles sablonneuses entrecoupées de bolongs où les dauphins nagent près des pirogues.',
    imageUrl: '/images/lodge-saloum.jpg',
    bestSeason: 'Novembre à Mai',
    highlights: ['Pirogue à Mar Lodj', 'Réserve de Fathala', 'Huîtres traditionnelles', 'Marché de Ndangane'],
    listingsCount: 14
  },
  {
    id: 'dakar',
    name: 'Dakar',
    tagline: 'Vibration artistique, Gorée et mémoire vivante',
    description: 'La pointe la plus occidentale d\'Afrique : de l\'effervescence créative de Dakar jusqu\'à la poésie paisible de l\'île de Gorée.',
    imageUrl: '/images/goree-teranga.jpg',
    bestSeason: 'Toute l\'année',
    highlights: ['Maison des Esclaves', 'Village d\'art de Ngor', 'Renaissance Africaine', 'Marché Soumbédioune'],
    listingsCount: 22
  },
  {
    id: 'ziguinchor',
    name: 'Ziguinchor',
    tagline: 'Casamance : le royaume des fromagers et de la paix',
    description: 'Région tropicale verdoyante. Forêts sacrées du pays Diola, plages sauvages de Cap Skirring et labyrinthes de rizières fertiles.',
    imageUrl: '/images/casamance-campement.jpg',
    bestSeason: 'Octobre à Juin',
    highlights: ['Royaume d\'Oussouye', 'Cases à étages de Mlomp', 'Plages de Cap Skirring', 'Île aux oiseaux de Kafountine'],
    listingsCount: 18
  },
  {
    id: 'thies',
    name: 'Thiès',
    tagline: 'Petite Côte, Somone, Saly & douceur océane',
    description: 'À moins d\'une heure de Dakar, les lagunes calmes et les villages de pêcheurs de la Somone et Toubab Dialaw invitent à la déconnexion.',
    imageUrl: '/images/hero-senegal.jpg',
    bestSeason: 'Octobre à Juillet',
    highlights: ['Lagune de la Somone', 'Falaises de Toubab Dialaw', 'Sanctuaire de Popenguine', 'Pêche à Mbour'],
    listingsCount: 19
  },
  {
    id: 'louga',
    name: 'Louga',
    tagline: 'Désert de Lompoul & grande muraille sahélienne',
    description: 'Immenses dunes dorées plongeant vers l\'Atlantique, bivouacs nomades et nuits sous un ciel constellé sans pollution lumineuse.',
    imageUrl: '/images/hero-senegal.jpg',
    bestSeason: 'Novembre à Avril',
    highlights: ['Dunes de sable ocre', 'Bivouac sous les étoiles', 'Chants autour du feu', 'Balade dromadaire'],
    listingsCount: 8
  },
  {
    id: 'saint-louis',
    name: 'Saint-Louis',
    tagline: 'L\'ancienne capitale fluviale & sanctuaire du Djoudj',
    description: 'Ambiance coloniale au charme suranné, festival de Jazz international et le sanctuaire du Djoudj accueillant 3 millions d\'oiseaux migrateurs.',
    imageUrl: '/images/goree-teranga.jpg',
    bestSeason: 'Novembre à Mai',
    highlights: ['Pont Faidherbe', 'Parc des oiseaux du Djoudj', 'Pêcheurs de Guet Ndar', 'Artisanat textile'],
    listingsCount: 12
  }
];
