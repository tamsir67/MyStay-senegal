package com.example.data

import com.example.R
import com.example.model.Booking
import com.example.model.BookingStatus
import com.example.model.ChatMessage
import com.example.model.EcoCommitment
import com.example.model.Host
import com.example.model.Listing
import com.example.model.RegionInfo
import com.example.model.User
import com.example.model.UserRole

object SenegalData {

    // Les 14 régions administratives officielles du Sénégal
    val all14SenegalRegions = listOf(
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
    )

    val sampleUsers = listOf(
        User(
            id = "user_traveler_1",
            name = "Amadou Diallo",
            email = "amadou.diallo@teranga.sn",
            phone = "+221 77 543 21 00",
            role = UserRole.TRAVELER,
            avatarInitials = "AD",
            region = "Dakar"
        ),
        User(
            id = "user_host_1",
            name = "Ba Tamsir Ndiaye",
            email = "tamsir.ndiaye@teranga.sn",
            phone = "+221 78 876 54 32",
            role = UserRole.HOST,
            avatarInitials = "TN",
            region = "Fatick"
        )
    )

    val hosts = listOf(
        Host(
            id = "host_tamsir",
            name = "Ba Tamsir Ndiaye",
            role = "Piroguier & Éco-gardien du Saloum",
            avatarInitials = "TN",
            rating = 4.96,
            reviewsCount = 124,
            bio = "Natif de Mar Lodj, je transmets les secrets de la mangrove et des îles du Saloum depuis plus de 20 ans. Ici, la Teranga n'est pas un vain mot mais une bénédiction partagée."
        ),
        Host(
            id = "host_fatou",
            name = "Fatou Kiné Sow",
            role = "Historienne & Maîtresse de maison",
            avatarInitials = "FS",
            rating = 4.98,
            reviewsCount = 89,
            bio = "Passionnée par le patrimoine de l'île de Gorée, j'accueille les voyageurs dans la maison familiale du XIXe siècle restaurée avec des matériaux locaux."
        ),
        Host(
            id = "host_ansou",
            name = "Ansoumana Diatta",
            role = "Guide Communautaire Diola",
            avatarInitials = "AD",
            rating = 4.92,
            reviewsCount = 67,
            bio = "En Casamance, nous vivons en harmonie avec les grands fromagers et les rizières. Notre campement solidaire finance la cantine scolaire du village."
        ),
        Host(
            id = "host_awa",
            name = "Awa Fall",
            role = "Créatrice culinaire & Hôte",
            avatarInitials = "AF",
            rating = 4.95,
            reviewsCount = 108,
            bio = "Bienvenue sur la Petite Côte ! J'adore partager les secrets du vrai Thiéboudienne rouge aux poissons du jour et du jus de bissap bio du jardin."
        )
    )

    val listings = mutableListOf(
        Listing(
            id = "listing_saloum",
            title = "Éco-Lodge des Bolongs du Saloum",
            subtitle = "Bungalow sur pilotis face au sanctuaire marin",
            region = "Fatick",
            location = "Île de Mar Lodj, Delta du Saloum (Fatick)",
            priceXofPerNight = 45000,
            rating = 4.96,
            reviewsCount = 128,
            category = "Éco-lodge",
            imageDrawableRes = R.drawable.img_lodge_saloum,
            videoUrl = "https://www.youtube.com/watch?v=senegal_saloum_ecolodge",
            description = "Un havre de paix écologique niché au cœur du parc national du Delta du Saloum (classé UNESCO). Réveillez-vous avec le chant des pélicans et profitez d'une vue panoramique sur les méandres de la mangrove.",
            culturalStory = "Chaque soir, dînez autour du feu au son de la Kora joué par les griots de Mar Lodj. Les villageoises récoltent les huîtres de palétuvier selon des méthodes durables ancestrales.",
            amenities = listOf("Énergie 100% Solaire", "Pirogue traditionnelle", "Repas bio & pêche locale", "Kayak dans les mangroves", "Moustiquaires artisanales", "Connexion Wi-Fi solaire"),
            host = hosts[0],
            ecoCommitments = listOf(
                EcoCommitment("Reforestation Mangrove", "5 000 palétuviers replantés chaque saison grâce aux séjours"),
                EcoCommitment("Zéro Plastique", "Filtration d'eau par jarres d'argile traditionnelles"),
                EcoCommitment("Énergie Renouvelable", "Alimenté intégralement par 24 panneaux solaires avec batteries")
            ),
            ecoImpactPercent = 10,
            maxGuests = 3,
            bedrooms = 1,
            bathrooms = 1,
            isFeatured = true,
            localSpecialties = listOf("Huîtres grillées de mangrove", "Couscous de mil au poisson salé", "Jus de Ditakh frais")
        ),
        Listing(
            id = "listing_goree",
            title = "Demeure Coloniale Teranga Gorée",
            subtitle = "Maison d'hôtes chargée d'histoire & patio bougainvillier",
            region = "Dakar",
            location = "Rue des Dongeons, Île de Gorée (Dakar)",
            priceXofPerNight = 55000,
            rating = 4.98,
            reviewsCount = 94,
            category = "Maison d'hôte",
            imageDrawableRes = R.drawable.img_goree_teranga,
            videoUrl = "https://www.youtube.com/watch?v=senegal_goree_patrimoine",
            description = "Une adresse d'exception sur l'île piétonne de Gorée, à 20 minutes de chaloupe de Dakar. Les murs aux teintes ocre et rose pastel s'ouvrent sur un patio ombragé où flotte le parfum des jasmins.",
            culturalStory = "L'île de Gorée est le sanctuaire de la mémoire et de la résilience africaine. Le soir, après le départ du dernier chaloupe, l'île s'enveloppe d'un silence magique bercé par les vagues.",
            amenities = listOf("Petit-déjeuner teranga inclus", "Terrasse océan", "Atelier Batik & Peinture sous verre", "Climatisation naturelle", "Bibliothèque d'auteurs africains", "Accès direct plage"),
            host = hosts[1],
            ecoCommitments = listOf(
                EcoCommitment("Patrimoine Vivant", "Restauration à la chaux locale et bois de récupération"),
                EcoCommitment("Artisanat Féminin", "Ateliers d'artisanat solidaire pour les femmes de l'île"),
                EcoCommitment("Circuit Court", "Produits du marché maraîcher bio de Rufisque")
            ),
            ecoImpactPercent = 8,
            maxGuests = 2,
            bedrooms = 1,
            bathrooms = 1,
            isFeatured = true,
            localSpecialties = listOf("Pastels au thon & sauce tomate pimentée", "Thieboudienne Penda Mbaye", "Cocktail gingembre-bouye")
        ),
        Listing(
            id = "listing_casamance",
            title = "Campement Solidaire d'Oussouye",
            subtitle = "Case à impluvium traditionnelle au milieu des fromagers",
            region = "Ziguinchor",
            location = "Oussouye, Basse Casamance (Ziguinchor)",
            priceXofPerNight = 25000,
            rating = 4.92,
            reviewsCount = 72,
            category = "Campement villageois",
            imageDrawableRes = R.drawable.img_casamance_campement,
            videoUrl = "https://www.youtube.com/watch?v=senegal_casamance_village",
            description = "Immergez-vous dans la fascinante culture Diola au sein d'une case traditionnelle ronde en banco. Géré directement par la communauté villageoise, ce campement allie simplicité chaleureuse et authenticité absolue.",
            culturalStory = "Rencontrez le Roi d'Oussouye dans le bois sacré pour comprendre les traditions de paix et de respect de la nature. Balades à vélo à travers les vergers de manguiers et les rizières sculptées.",
            amenities = listOf("Randonnée avec guide local", "Vélos tout-terrain fournis", "Repas du terroir en communauté", "Douche solaire", "Atelier vannerie en rônier"),
            host = hosts[2],
            ecoCommitments = listOf(
                EcoCommitment("100% Communautaire", "Tous les bénéfices financent la scolarisation et le dispensaire local"),
                EcoCommitment("Construction Banco", "Matériaux écologiques biosourcés : terre, chaume et rônier"),
                EcoCommitment("Agriculture Vivrière", "Riz de Casamance issu des récoltes du village")
            ),
            ecoImpactPercent = 15,
            maxGuests = 4,
            bedrooms = 2,
            bathrooms = 1,
            isFeatured = true,
            localSpecialties = listOf("Poulet Yassa aux citrons verts de Casamance", "Caldou au poisson et bouillon d'oseille", "Vin de palme doux de la matinée")
        ),
        Listing(
            id = "listing_somone",
            title = "Villa Écologique de la Lagune Somone",
            subtitle = "Élégance naturelle face aux flamants roses",
            region = "Thiès",
            location = "La Somone, Petite Côte (Thiès)",
            priceXofPerNight = 70000,
            rating = 4.95,
            reviewsCount = 110,
            category = "Villa Lagune & Mer",
            imageDrawableRes = R.drawable.img_senegal_hero,
            videoUrl = "https://www.youtube.com/watch?v=senegal_somone_lagune",
            description = "Située en bordure de la réserve ornithologique de la Somone, cette villa conçue en pierre du pays offre une vue imprenable sur l'embouchure de la lagune et l'océan Atlantique.",
            culturalStory = "Chaque matin, observez les martins-pêcheurs, hérons et flamants roses depuis la terrasse en dégustant un café touba traditionnel infusé au piment de Selim.",
            amenities = listOf("Piscine naturelle eau salée", "Chef cuisinier privé", "Accès kayak lagune", "Jardin tropical de baobabs", "Climatisation douce solaire", "Parking sécurisé"),
            host = hosts[3],
            ecoCommitments = listOf(
                EcoCommitment("Réserve Protégée", "Partenariat avec les écogardes pour la protection des oiseaux migrateurs"),
                EcoCommitment("Piscine Écologique", "Système de phyto-épuration sans aucun produit chimique"),
                EcoCommitment("Compost & Permaculture", "Fruits et aromates cultivés sur place")
            ),
            ecoImpactPercent = 7,
            maxGuests = 6,
            bedrooms = 3,
            bathrooms = 2,
            isFeatured = true,
            localSpecialties = listOf("Capitaine braisé aux épices douces", "Salade de crevettes de la Somone", "Mousse de mangue du verger")
        ),
        Listing(
            id = "listing_lompoul",
            title = "Bivouac Nomade du Désert de Lompoul",
            subtitle = "Tentes khaïmas sous la voûte céleste du Sahel",
            region = "Louga",
            location = "Désert de Lompoul (Louga)",
            priceXofPerNight = 38000,
            rating = 4.88,
            reviewsCount = 85,
            category = "Tente Nomade",
            imageDrawableRes = R.drawable.img_senegal_hero,
            videoUrl = "https://www.youtube.com/watch?v=senegal_lompoul_desert",
            description = "Le désert de Lompoul est une merveille naturelle unique au Sénégal avec ses dunes de sable ocre culminant à 50 mètres. Une expérience saharienne inoubliable sous les étoiles.",
            culturalStory = "Partagez la cérémonie traditionnelle des 3 thés à la menthe (le premier amer comme la mort, le deuxième doux comme la vie, le troisième sucré comme l'amour) au rythme des djembés.",
            amenities = listOf("Méharée à dromadaire", "Tente saharienne spacieuse", "Soirée feu de camp & contes", "Lit traditionnel king size", "Salle de bain privée à ciel ouvert"),
            host = hosts[0],
            ecoCommitments = listOf(
                EcoCommitment("Barrière Verte", "Contribution à la Grande Muraille Verte contre la désertification"),
                EcoCommitment("Énergie Nomade", "Lanternes solaires LED sans aucune pollution sonore"),
                EcoCommitment("Emploi Local", "Guides et chameliers tous originaires des hameaux voisins")
            ),
            ecoImpactPercent = 10,
            maxGuests = 2,
            bedrooms = 1,
            bathrooms = 1,
            isFeatured = false,
            localSpecialties = listOf("Méchoui d'agneau cuit à l'étouffée", "Couscous Thiéré au bœuf", "Thé à la menthe Sahélien")
        ),
        Listing(
            id = "listing_kedougou",
            title = "Refuge des Cascades de Dindéfélo",
            subtitle = "Éco-lodge aux confins du Pays Bassari & Bédik",
            region = "Kédougou",
            location = "Dindéfélo, Fouta Djalon sénégalais (Kédougou)",
            priceXofPerNight = 30000,
            rating = 4.94,
            reviewsCount = 59,
            category = "Campement villageois",
            imageDrawableRes = R.drawable.img_casamance_campement,
            videoUrl = "https://www.youtube.com/watch?v=senegal_dindefelo_cascade",
            description = "Niché dans la végétation luxuriante aux abords de la spectaculaire cascade de Dindéfélo (115 m). Le point de départ parfait pour des randonnées vers les villages ancestraux perchés d'Iwol.",
            culturalStory = "La réserve communautaire de Dindéfélo protège les derniers chimpanzés de savane. Vous découvrirez les traditions initiatiques et les danses des masques du peuple Bassari.",
            amenities = listOf("Guide expert biodiversité", "Baignade naturelle cascade", "Cuisine du terroir Fouta", "Eau de source pure", "Observation des oiseaux"),
            host = hosts[2],
            ecoCommitments = listOf(
                EcoCommitment("Sanctuaire Faune", "Protection des chimpanzés de savane avec l'Institut Jane Goodall"),
                EcoCommitment("Forêt Primaire", "Surveillance citoyenne contre les feux de brousse"),
                EcoCommitment("Soutien aux Femmes", "Achat équitable du café sauvage et du miel de montagne")
            ),
            ecoImpactPercent = 12,
            maxGuests = 3,
            bedrooms = 1,
            bathrooms = 1,
            isFeatured = false,
            localSpecialties = listOf("Mafé aux arachides grillées du Fouta", "Gari au miel sauvage", "Café de Dindéfélo pilé à la main")
        ),
        Listing(
            id = "listing_saint_louis",
            title = "Hôtel Fluvial & Éco-Camp du Gandiol",
            subtitle = "Au bord de l'embouchure du fleuve Sénégal",
            region = "Saint-Louis",
            location = "Gandiol, Réserve de la Langue de Barbarie (Saint-Louis)",
            priceXofPerNight = 48000,
            rating = 4.91,
            reviewsCount = 76,
            category = "Éco-lodge",
            imageDrawableRes = R.drawable.img_goree_teranga,
            videoUrl = "https://www.youtube.com/watch?v=senegal_saint_louis_gandiol",
            description = "Face à la Langue de Barbarie et aux vagues de l'Atlantique, cet éco-camp en bois flotté et chaume propose une reconnexion totale avec la nature.",
            culturalStory = "Saint-Louis (Ndar) est le berceau du jazz africain et de l'élégance des Signares. Explorez en pirogue les îlots de nidification des sternes et cormorans.",
            amenities = listOf("Pirogue dans la lagune", "Cuisine saint-louisienne", "Observations oiseaux", "Énergie solaire", "Plage privée"),
            host = hosts[1],
            ecoCommitments = listOf(
                EcoCommitment("Protection Littorale", "Reboisement des filaos pour freiner l'érosion côtière"),
                EcoCommitment("Protection Avifaune", "Surveillance des pontes de tortues marines et oiseaux migrateurs")
            ),
            ecoImpactPercent = 9,
            maxGuests = 4,
            bedrooms = 2,
            bathrooms = 1,
            isFeatured = false,
            localSpecialties = listOf("Thiéboudienne Penda Mbaye de Saint-Louis", "Thiof braisé au beurre de cacahuète")
        ),
        Listing(
            id = "listing_niokolo",
            title = "Éco-Bivouac du Parc Niokolo-Koba",
            subtitle = "Immersion sauvage au cœur du grand parc national",
            region = "Tambacounda",
            location = "Simenti, Parc National du Niokolo-Koba (Tambacounda)",
            priceXofPerNight = 35000,
            rating = 4.87,
            reviewsCount = 43,
            category = "Campement villageois",
            imageDrawableRes = R.drawable.img_lodge_saloum,
            videoUrl = "https://www.youtube.com/watch?v=senegal_niokolo_safari",
            description = "Le plus grand parc du Sénégal classé réserve de biosphère. Écoutez rugir les lions et observez les éléphants et hippopotames au bord du fleuve Gambie.",
            culturalStory = "Guides pisteurs locaux formés aux empreintes et au respect scrupuleux des couloirs de migration de la faune sauvage.",
            amenities = listOf("Safari 4x4 avec ranger", "Repas autour du feu", "Tente safari surélevée", "Énergie solaire"),
            host = hosts[0],
            ecoCommitments = listOf(
                EcoCommitment("Lutte Anti-Braconnage", "Financement direct des patrouilles d'éco-gardes"),
                EcoCommitment("Sensibilisation", "Ateliers nature dans les écoles de Tambacounda")
            ),
            ecoImpactPercent = 14,
            maxGuests = 2,
            bedrooms = 1,
            bathrooms = 1,
            isFeatured = false,
            localSpecialties = listOf("Ragoût de bœuf sahélien aux légumes de brousse", "Jus de Zaban rafraîchissant")
        )
    )

    val regions = listOf(
        RegionInfo(
            id = "reg_fatick",
            name = "Fatick",
            tagline = "Le labyrinthe féerique des îles du Sine-Saloum",
            description = "Delta mythique classé Réserve Mondiale de Biosphère. Plus de 200 îles sablonneuses entrecoupées de bolongs où les dauphins nagent près des pirogues traditionnelles.",
            imageDrawableRes = R.drawable.img_lodge_saloum,
            bestSeason = "Novembre à Mai (Idéal oiseaux)",
            highlights = listOf("Navigation en pirogue à Mar Lodj", "Réserve de Fathala (lions et girafes)", "Ramassage traditionnel des huîtres", "Marché de Ndangane"),
            listingsCount = 14
        ),
        RegionInfo(
            id = "reg_dakar",
            name = "Dakar",
            tagline = "Vibration artistique, île de Gorée et mémoire",
            description = "La pointe la plus occidentale d'Afrique : de l'énergie créative des galeries d'art de Dakar jusqu'à la quiétude historique et poétique de l'île de Gorée.",
            imageDrawableRes = R.drawable.img_goree_teranga,
            bestSeason = "Toute l'année (brise océane rafraîchissante)",
            highlights = listOf("Maison des Esclaves & ruelles de Gorée", "Monument de la Renaissance Africaine", "Surf sur les vagues de l'île de Ngor", "Marché artisanal de Soumbédioune"),
            listingsCount = 22
        ),
        RegionInfo(
            id = "reg_ziguinchor",
            name = "Ziguinchor",
            tagline = "Basse Casamance, royaume des fromagers et de la paix",
            description = "Région bénie par les eaux et la verdure tropicale. Forêts sacrées du pays Diola, plages sauvages de Cap Skirring et labyrinthes de rizières fertiles.",
            imageDrawableRes = R.drawable.img_casamance_campement,
            bestSeason = "Octobre à Juin",
            highlights = listOf("Royaume traditionnel d'Oussouye", "Rizières et cases à étages de Mlomp", "Plages de sable blanc de Cap Skirring", "Île aux oiseaux de Kafountine"),
            listingsCount = 18
        ),
        RegionInfo(
            id = "reg_thies",
            name = "Thiès",
            tagline = "Petite Côte, Somone, lagunes et plages dorées",
            description = "À moins d'une heure de Dakar, les lagunes calmes et les villages de pêcheurs de Toubab Dialaw, Popenguine et la Somone invitent à la déconnexion.",
            imageDrawableRes = R.drawable.img_senegal_hero,
            bestSeason = "Octobre à Juillet",
            highlights = listOf("Lagune aux oiseaux de la Somone", "Falaises ocres de Toubab Dialaw", "Falaises et sanctuaire de Popenguine", "Port de pêche artisanal de Mbour"),
            listingsCount = 19
        ),
        RegionInfo(
            id = "reg_louga",
            name = "Louga",
            tagline = "Désert de Lompoul, dunes ocres et nuits étoilées",
            description = "Une enclave désertique féerique entre Dakar et Saint-Louis. Le silence des grandes dunes et la magie du bivouac sous les étoiles.",
            imageDrawableRes = R.drawable.img_senegal_hero,
            bestSeason = "Novembre à Mai",
            highlights = listOf("Coucher de soleil sur les crêtes de dunes", "Balades en dromadaire", "Veillées contes et percussions", "Festival du Sahel"),
            listingsCount = 6
        ),
        RegionInfo(
            id = "reg_kedougou",
            name = "Kédougou",
            tagline = "Pays Bassari & Bédik, cascades et reliefs",
            description = "L'Afrique des reliefs et des traditions immémoriales. Randonnées dans les contreforts du Fouta-Djalon et immersion dans les villages Bédik et Bassari.",
            imageDrawableRes = R.drawable.img_casamance_campement,
            bestSeason = "Octobre à Avril",
            highlights = listOf("Chute d'eau de Dindéfélo (115m)", "Village perché d'Iwol", "Sanctuaire des chimpanzés", "Marché aux épices de Kédougou"),
            listingsCount = 8
        ),
        RegionInfo(
            id = "reg_saint_louis",
            name = "Saint-Louis",
            tagline = "Capitale historique, jazz et Langue de Barbarie",
            description = "L'ancienne capitale aux demeures coloniales classées UNESCO, porte d'entrée du fleuve Sénégal et du grand parc ornithologique du Djoudj.",
            imageDrawableRes = R.drawable.img_goree_teranga,
            bestSeason = "Novembre à Mai",
            highlights = listOf("Pont Faidherbe & île historique", "Parc National des Oiseaux du Djoudj", "Langue de Barbarie", "Festival International de Jazz"),
            listingsCount = 11
        ),
        RegionInfo(
            id = "reg_tambacounda",
            name = "Tambacounda",
            tagline = "Grand parc du Niokolo-Koba et safari d'Afrique de l'Ouest",
            description = "La plus vaste région du Sénégal, terre de savane et d'immensité naturelle protégée, avec le grand fleuve Gambie.",
            imageDrawableRes = R.drawable.img_lodge_saloum,
            bestSeason = "Décembre à Mai",
            highlights = listOf("Safari au Parc National du Niokolo-Koba", "Observation des éléphants et hippopotames", "Traversée du fleuve Gambie"),
            listingsCount = 5
        )
    )

    val sampleBookings = listOf(
        Booking(
            id = "bk_001",
            listingId = "listing_saloum",
            listingTitle = "Éco-Lodge des Bolongs du Saloum",
            listingLocation = "Île de Mar Lodj, Fatick",
            checkInDate = "15 Nov 2026",
            checkOutDate = "19 Nov 2026",
            nights = 4,
            guestsCount = 2,
            priceXofTotal = 180000,
            status = BookingStatus.CONFIRMED,
            bookingReference = "TERANGA-SL-7824",
            imageDrawableRes = R.drawable.img_lodge_saloum,
            ecoContributionXof = 18000
        ),
        Booking(
            id = "bk_002",
            listingId = "listing_goree",
            listingTitle = "Demeure Coloniale Teranga Gorée",
            listingLocation = "Île de Gorée, Dakar",
            checkInDate = "22 Déc 2026",
            checkOutDate = "25 Déc 2026",
            nights = 3,
            guestsCount = 2,
            priceXofTotal = 165000,
            status = BookingStatus.PENDING,
            bookingReference = "TERANGA-GR-9031",
            imageDrawableRes = R.drawable.img_goree_teranga,
            ecoContributionXof = 13200
        )
    )

    val initialChatMessages = listOf(
        ChatMessage(
            id = "msg_1",
            text = "Dalal Ak Jamm ! Je suis Koumba, votre conseillère Teranga pour le Sénégal. Comment puis-je vous aider à préparer votre séjour authentique ?",
            isFromUser = false,
            timestamp = "10:00",
            quickReplies = listOf(
                "Expressions wolof utiles",
                "Quoi manger au Sénégal ?",
                "Meilleure saison pour visiter",
                "Comment fonctionne la Teranga ?"
            )
        )
    )

    val koumbaResponses = mapOf(
        "wolof" to "Voici les formules magiques pour toucher le cœur des Sénégalais :\n\n• Salaamaalekum : Que la paix soit sur vous (réponse : Maalekum Salaam)\n• Nanga def ? : Comment vas-tu ?\n• Mangi fi rekk : Je vais très bien (littéralement : je suis là seulement)\n• Jërëjëf : Merci beaucoup !\n• Waaw / Déedéet : Oui / Non\n• Amul solo : De rien / Pas de problème\n• Ba beneen yoon : À la prochaine fois !",
        "manger" to "La gastronomie sénégalaise est inscrite au patrimoine immatériel de l'UNESCO ! Les incontournables :\n\n1. Thiéboudienne (Ceebu Jën) : Le plat national au riz rouge, mérou blanc, manioc, carottes et choux.\n2. Poulet Yassa : Mariné aux oignons caramélisés, moutarde et citron vert de Casamance.\n3. Mafé : Mijoté savoureux à la pâte d'arachide dorée et patates douces.\n4. Dibi d'agneau : Viande grillée au feu de bois avec piment et oignons doux.\n5. Boissons fraîches : Jus de Bissap (hibiscus), Jus de Bouye (pain de singe/baobab) et Ditakh !",
        "saison" to "Le Sénégal jouit d'un climat exceptionnel :\n\n• De Novembre à Mai (Saison sèche) : C'est la période idéale ! Températures douces (24-28°C), ciel bleu azur, brise marine et arrivée de milliers d'oiseaux migrateurs au Djoudj et dans le Saloum.\n• De Juin à Octobre (Hivernage) : Période des pluies tropicales, la nature devient spectaculairement verte et luxuriante, particulièrement en Casamance et au Pays Bassari.",
        "teranga" to "La 'Teranga' est bien plus qu'un mot, c'est l'âme du Sénégal ! C'est la valeur sacrée de l'hospitalité bienveillante, de la générosité et du partage sans attendre en retour. Quand vous arrivez dans un foyer sénégalais, on vous propose toujours de partager le bol commun (le 'bolou ceeb') et le thé de l'amitié.",
        "itineraire" to "Pour un séjour équilibré de 7 à 10 jours :\n\n• Jours 1-2 : Dakar et l'île de Gorée (histoire, musées, gastronomie)\n• Jours 3-5 : Delta du Sine-Saloum (éco-lodge sur pilotis, bolongs en pirogue, repos)\n• Jours 6-7 : Petite Côte et Lagune de la Somone (plages, baignade, réserve naturelle)\n• Option Casamance ou Lompoul si vous avez 12 jours ou plus !"
    )
}
