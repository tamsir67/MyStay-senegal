export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  region: string;
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

export const SENEGAL_LISTINGS: Listing[] = [
  {
    id: 'saloum-lodge',
    title: 'Éco-Lodge des Bolongs du Saloum',
    subtitle: 'Bungalow sur pilotis face au sanctuaire marin',
    region: 'Sine-Saloum',
    location: 'Île de Mar Lodj, Delta du Saloum',
    priceXof: 45000,
    rating: 4.96,
    reviewsCount: 128,
    category: 'Éco-lodge',
    imageUrl: '/images/lodge-saloum.jpg',
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
    region: 'Dakar & Gorée',
    location: 'Rue des Dongeons, Île de Gorée',
    priceXof: 55000,
    rating: 4.98,
    reviewsCount: 94,
    category: 'Maison d\'hôte',
    imageUrl: '/images/goree-teranga.jpg',
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
    region: 'Casamance',
    location: 'Oussouye, Basse Casamance',
    priceXof: 25000,
    rating: 4.92,
    reviewsCount: 72,
    category: 'Campement villageois',
    imageUrl: '/images/casamance-campement.jpg',
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
    region: 'Petite Côte',
    location: 'La Somone, Région de Thiès',
    priceXof: 70000,
    rating: 4.95,
    reviewsCount: 110,
    category: 'Villa Lagune & Mer',
    imageUrl: '/images/hero-senegal.jpg',
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
  }
];

export const SENEGAL_REGIONS: Region[] = [
  {
    id: 'saloum',
    name: 'Sine-Saloum',
    tagline: 'Le labyrinthe féerique des îles et des mangroves',
    description: 'Delta mythique classé Réserve Mondiale de Biosphère. Plus de 200 îles sablonneuses entrecoupées de bolongs où les dauphins nagent près des pirogues.',
    imageUrl: '/images/lodge-saloum.jpg',
    bestSeason: 'Novembre à Mai',
    highlights: ['Pirogue à Mar Lodj', 'Réserve de Fathala', 'Huîtres traditionnelles', 'Marché de Ndangane'],
    listingsCount: 14
  },
  {
    id: 'dakar-goree',
    name: 'Dakar & Gorée',
    tagline: 'Vibration artistique, océan et mémoire vivante',
    description: 'La pointe la plus occidentale d\'Afrique : de l\'effervescence créative de Dakar jusqu\'à la poésie paisible de l\'île de Gorée.',
    imageUrl: '/images/goree-teranga.jpg',
    bestSeason: 'Toute l\'année',
    highlights: ['Maison des Esclaves', 'Village d\'art de Ngor', 'Renaissance Africaine', 'Marché Soumbédioune'],
    listingsCount: 22
  },
  {
    id: 'casamance',
    name: 'Casamance',
    tagline: 'Le grenier vert, royaume des fromagers et de la paix',
    description: 'Région bénie par la nature tropicale. Forêts sacrées du pays Diola, plages sauvages de Cap Skirring et labyrinthes de rizières fertiles.',
    imageUrl: '/images/casamance-campement.jpg',
    bestSeason: 'Octobre à Juin',
    highlights: ['Royaume d\'Oussouye', 'Cases à étages de Mlomp', 'Plages de Cap Skirring', 'Île aux oiseaux de Kafountine'],
    listingsCount: 18
  },
  {
    id: 'petite-cote',
    name: 'Petite Côte & Somone',
    tagline: 'Plages dorées, lagunes sauvages et douceur de vivre',
    description: 'À moins d\'une heure de Dakar, les lagunes calmes et les villages de pêcheurs de la Somone et Toubab Dialaw invitent à la déconnexion.',
    imageUrl: '/images/hero-senegal.jpg',
    bestSeason: 'Octobre à Juillet',
    highlights: ['Lagune de la Somone', 'Falaises de Toubab Dialaw', 'Sanctuaire de Popenguine', 'Pêche à Mbour'],
    listingsCount: 19
  }
];

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
