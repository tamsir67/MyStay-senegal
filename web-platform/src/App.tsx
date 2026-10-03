import React, { useState } from 'react';
import { 
  Compass, MapPin, Calendar, Users, Heart, Star, Leaf, 
  Sparkles, Check, ChevronRight, ShieldCheck, 
  MessageSquare, User as UserIcon, Building2, Send, X, Share2, 
  DollarSign, Plus, Video, Play, LogIn, UserPlus, LogOut, CheckCircle,
  Eye, Phone, Mail, Award, ArrowLeft
} from 'lucide-react';
import { 
  SENEGAL_LISTINGS, SENEGAL_REGIONS, ALL_14_REGIONS, SAMPLE_USERS,
  Listing, Region, User
} from './data/senegalListings';

export default function App() {
  const [listings, setListings] = useState<Listing[]>(SENEGAL_LISTINGS);
  const [activeTab, setActiveTab] = useState<'explore' | 'regions' | 'trips' | 'koumba' | 'host'>('explore');
  const [selectedRegion, setSelectedRegion] = useState<string>('Toutes');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [ecoOnly, setEcoOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(['saloum-lodge', 'goree-demeure']);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(SAMPLE_USERS[0]); // Default logged in as Amadou Diallo
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authRole, setAuthRole] = useState<'traveler' | 'host'>('traveler');
  const [authRegion, setAuthRegion] = useState('Dakar');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Host Add Listing Modal State
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newRegion, setNewRegion] = useState('Fatick');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('Éco-lodge');
  const [newPrice, setNewPrice] = useState(35000);
  const [newMaxGuests, setNewMaxGuests] = useState(3);
  const [newBedrooms, setNewBedrooms] = useState(1);
  const [newDescription, setNewDescription] = useState('');
  const [newCulturalStory, setNewCulturalStory] = useState('');
  const [newSelectedImage, setNewSelectedImage] = useState('/images/lodge-saloum.jpg');
  const [newCustomImageUrl, setNewCustomImageUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newEcoImpact, setNewEcoImpact] = useState(10);
  const [newSpecialties, setNewSpecialties] = useState('Thiéboudienne, Jus de bissap frais');

  // Video viewer modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  // Bookings state
  const [bookings, setBookings] = useState([
    {
      id: 'bk_1',
      listing: SENEGAL_LISTINGS[0],
      checkIn: '18 Nov 2026',
      checkOut: '22 Nov 2026',
      nights: 4,
      guests: 2,
      totalXof: 180000,
      ref: 'TERANGA-SL-7824',
      status: 'Confirmé'
    }
  ]);

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingNights, setBookingNights] = useState(3);
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState<string | null>(null);

  // Koumba Chat
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'koumba',
      text: 'Dalal Ak Jamm ! Je suis Koumba, votre conseillère Teranga. Comment puis-je vous aider à préparer votre séjour au Sénégal ?',
      time: '10:00'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredListings = listings.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = q === '' || 
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    
    const matchRegion = selectedRegion === 'Toutes' || item.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchEco = !ecoOnly || item.ecoImpactPercent >= 10;

    return matchSearch && matchRegion && matchCategory && matchEco;
  });

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Veuillez remplir votre email et mot de passe.');
      return;
    }
    const initials = authEmail.substring(0, 2).toUpperCase();
    const isHost = authEmail.toLowerCase().includes('host') || authEmail.toLowerCase().includes('hote');
    const user: User = {
      id: 'usr_' + Date.now(),
      name: authEmail.split('@')[0],
      email: authEmail,
      phone: '+221 77 000 00 00',
      role: isHost ? 'host' : 'traveler',
      avatarInitials: initials,
      region: 'Dakar'
    };
    setCurrentUser(user);
    setAuthModalOpen(false);
    setAuthError(null);
    setAuthNotice(`Bienvenue, ${user.name} !`);
    setTimeout(() => setAuthNotice(null), 4000);
  };

  // Handle Register
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName.trim() || !authEmail.trim() || !authPassword.trim()) {
      setAuthError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    const initials = authName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'SN';
    const user: User = {
      id: 'usr_' + Date.now(),
      name: authName,
      email: authEmail,
      phone: authPhone || '+221 77 123 45 67',
      role: authRole,
      avatarInitials: initials,
      region: authRegion
    };
    setCurrentUser(user);
    setAuthModalOpen(false);
    setAuthError(null);
    setAuthNotice(`Compte créé avec succès ! Dalal Ak Jamm, ${user.name}.`);
    setTimeout(() => setAuthNotice(null), 4000);
  };

  // Switch demo users
  const handleQuickLogin = (user: User) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    setAuthNotice(`Connecté en tant que ${user.name} (${user.role === 'host' ? 'Hôte' : 'Voyageur'})`);
    setTimeout(() => setAuthNotice(null), 4000);
  };

  // Handle Add Listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) {
      alert('Veuillez renseigner au moins le titre et la localité du séjour.');
      return;
    }

    const finalImage = newCustomImageUrl.trim() || newSelectedImage;
    const finalVideo = newVideoUrl.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    const specs = newSpecialties.split(',').map(s => s.trim()).filter(Boolean);

    const created: Listing = {
      id: 'listing_' + Date.now(),
      title: newTitle,
      subtitle: newSubtitle || `Séjour authentique dans la région de ${newRegion}`,
      region: newRegion,
      location: newLocation,
      priceXof: Number(newPrice) || 35000,
      rating: 5.0,
      reviewsCount: 1,
      category: newCategory,
      imageUrl: finalImage,
      videoUrl: finalVideo,
      description: newDescription || `Magnifique séjour situé à ${newLocation} dans la région de ${newRegion}. Découvrez la véritable Teranga sénégalaise dans un cadre chaleureux et respectueux de l'environnement.`,
      culturalStory: newCulturalStory || `Accueil traditionnel sénégalais avec dégustation de thé Attaya et immersion auprès des habitants de ${newRegion}.`,
      amenities: ['Énergie solaire', 'Repas du terroir', 'Accueil Teranga', 'Wi-Fi', 'Visite guidée locale'],
      host: {
        name: currentUser ? currentUser.name : 'Hôte Teranga',
        role: `Hôte certifié de ${newRegion}`,
        avatar: currentUser ? currentUser.avatarInitials : 'HT',
        rating: 5.0,
        bio: `Bienvenue dans notre hébergement à ${newRegion} ! Nous serons ravis de vous faire découvrir notre culture et notre gastronomie.`
      },
      ecoCommitments: [
        { title: 'Écotourisme local', description: `${newEcoImpact}% reversés pour la communauté locale de ${newRegion}` },
        { title: 'Préservation naturelle', description: 'Gestion durable de l’eau et des énergies renouvelables' }
      ],
      ecoImpactPercent: Number(newEcoImpact) || 10,
      maxGuests: Number(newMaxGuests) || 3,
      bedrooms: Number(newBedrooms) || 1,
      bathrooms: 1,
      localSpecialties: specs.length ? specs : ['Thiéboudienne', 'Jus de bissap frais', 'Café Touba']
    };

    setListings([created, ...listings]);
    setAddListingModalOpen(false);
    setSelectedListing(created);
    setBookingSuccessNotice(`Votre hébergement "${created.title}" à ${created.region} a été publié avec succès !`);
    setTimeout(() => setBookingSuccessNotice(null), 5000);
  };

  const handleConfirmBooking = () => {
    if (!selectedListing) return;
    const total = selectedListing.priceXof * bookingNights;
    const newBooking = {
      id: 'bk_' + Date.now(),
      listing: selectedListing,
      checkIn: '10 Déc 2026',
      checkOut: '14 Déc 2026',
      nights: bookingNights,
      guests: bookingGuests,
      totalXof: total,
      ref: 'TERANGA-' + Math.floor(1000 + Math.random() * 9000),
      status: 'Confirmé'
    };

    setBookings([newBooking, ...bookings]);
    setBookingModalOpen(false);
    setSelectedListing(null);
    setActiveTab('trips');
    setBookingSuccessNotice('Félicitations ! Votre séjour solidaire au Sénégal a été confirmé.');
  };

  const openVideo = (videoUrl: string, title: string) => {
    setActiveVideoUrl(videoUrl);
    setActiveVideoTitle(title);
    setVideoModalOpen(true);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text,
      time: 'À l\'instant'
    };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let reply = "Jërëjëf pour votre message ! En voyageant avec MyStay Voyager, vous contribuez directement aux initiatives de préservation des mangroves et à l'artisanat local.";
      const lower = text.toLowerCase();
      if (lower.includes('wolof') || lower.includes('bonjour') || lower.includes('saluer')) {
        reply = "Voici les salutations en wolof :\n• Salaamaalekum (Bonjour / Paix sur vous)\n• Nanga def ? (Comment vas-tu ?)\n• Mangi fi rekk (Je vais très bien)\n• Jërëjëf (Merci beaucoup !)";
      } else if (lower.includes('manger') || lower.includes('plat') || lower.includes('thieb')) {
        reply = "Les spécialités incontournables : le Thiéboudienne (riz au poisson national), le Poulet Yassa mariné aux oignons de Casamance, le Mafé et le jus de bissap frais !";
      } else if (lower.includes('saison') || lower.includes('meteo') || lower.includes('quand')) {
        reply = "La saison idéale va de novembre à mai : un climat doux et ensoleillé (25-28°C), parfait pour le Saloum, Gorée et la Petite Côte !";
      } else if (lower.includes('region') || lower.includes('ou aller')) {
        reply = "Le Sénégal compte 14 superbes régions ! Parmi les plus prisées : Fatick pour les îles du Saloum, Dakar & Gorée pour la mémoire et l'art, Ziguinchor pour la Casamance tropicale, Thiès pour la Petite Côte, et Louga pour le désert de Lompoul !";
      }

      setChatMessages(prev => [...prev, {
        id: 'k_' + Date.now(),
        sender: 'koumba',
        text: reply,
        time: 'À l\'instant'
      }]);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      {/* Toast Notice */}
      {(authNotice || bookingSuccessNotice) && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#15803D] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-green-400/40 animate-bounce">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{authNotice || bookingSuccessNotice}</span>
          <button onClick={() => { setAuthNotice(null); setBookingSuccessNotice(null); }} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E7E5E4] px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => { setActiveTab('explore'); setSelectedListing(null); }}>
            <img src="/images/logo-teranga.jpg" alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#D97706]" />
            <div>
              <div className="flex items-center">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#C2410C]">MyStay</span>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#D97706] ml-1">Sénégal</span>
              </div>
              <span className="hidden md:inline-block text-[11px] font-semibold text-[#92400E]">
                Teranga & Écotourisme
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => { setActiveTab('explore'); setSelectedListing(null); }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${activeTab === 'explore' ? 'bg-[#C2410C] text-white shadow' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Découvrir
            </button>
            <button 
              onClick={() => { setActiveTab('regions'); setSelectedListing(null); }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${activeTab === 'regions' ? 'bg-[#C2410C] text-white shadow' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Régions
            </button>
            <button 
              onClick={() => { setActiveTab('trips'); setSelectedListing(null); }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${activeTab === 'trips' ? 'bg-[#C2410C] text-white shadow' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Séjours ({bookings.length})
            </button>
            <button 
              onClick={() => { setActiveTab('koumba'); setSelectedListing(null); }}
              className={`hidden sm:flex px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition items-center gap-1.5 ${activeTab === 'koumba' ? 'bg-[#0D9488] text-white shadow' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Koumba IA
            </button>
            <button 
              onClick={() => { setActiveTab('host'); setSelectedListing(null); }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${activeTab === 'host' ? 'bg-[#1C1917] text-white shadow' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Hôte
            </button>
          </nav>

          {/* User Account / Auth Actions */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => {
                    if (currentUser.role === 'host') {
                      setActiveTab('host');
                    } else {
                      setActiveTab('trips');
                    }
                  }}
                  className="flex items-center gap-2 bg-[#F5F2EB] hover:bg-[#EFECE6] px-2.5 py-1.5 rounded-xl cursor-pointer transition border border-[#E7E5E4]"
                  title="Voir votre profil"
                >
                  <div className="w-7 h-7 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-xs font-extrabold">
                    {currentUser.avatarInitials}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold leading-tight truncate max-w-[100px]">{currentUser.name}</p>
                    <p className="text-[10px] text-[#78716C] capitalize">{currentUser.role === 'host' ? 'Hôte' : 'Voyageur'}</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setCurrentUser(null); setAuthNotice('Vous avez été déconnecté.'); }}
                  title="Déconnexion"
                  className="p-1.5 text-[#78716C] hover:text-[#C2410C] rounded-lg hover:bg-[#F5F2EB] transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-5">
        
        {/* EXPLORE TAB */}
        {activeTab === 'explore' && !selectedListing && (
          <div className="space-y-7">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-[320px] sm:h-[350px] flex items-end">
              <img 
                src="/images/hero-senegal.jpg" 
                alt="Sénégal" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="relative z-10 p-5 sm:p-9 w-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F59E0B] text-[#1F160C] mb-2">
                  Hospitalité & Teranga Sénégalaise
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif mb-2">
                  Dalal Ak Jamm au Sénégal
                </h1>
                <p className="text-white/90 text-xs sm:text-sm max-w-2xl mb-4">
                  Découvrez nos hébergements éco-responsables à travers les 14 régions du pays de la Teranga.
                </p>

                {/* Search Bar & 14 Regions Dropdown Bar */}
                <div className="bg-white/95 backdrop-blur p-2.5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 max-w-4xl">
                  {/* Search text input */}
                  <div className="flex items-center gap-2 px-3 py-1 flex-1 w-full border-b md:border-b-0 md:border-r border-[#E7E5E4]">
                    <MapPin className="w-4 h-4 text-[#C2410C] flex-shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Rechercher un séjour, une ville ou un mot clé..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none placeholder-[#78716C]"
                    />
                  </div>

                  {/* 14 REGIONS DROPDOWN SELECTOR (MANDATORY USER REQUEST) */}
                  <div className="flex items-center gap-2 px-3 py-1 w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E7E5E4]">
                    <Compass className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                    <select
                      value={selectedRegion}
                      onChange={e => setSelectedRegion(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none text-[#1C1917] cursor-pointer"
                    >
                      <option value="Toutes">🌍 Toutes les 14 régions</option>
                      {ALL_14_REGIONS.map(reg => (
                        <option key={reg} value={reg}>📍 {reg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filters & Action */}
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => setEcoOnly(!ecoOnly)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${ecoOnly ? 'bg-[#0D9488] text-white' : 'bg-[#FAF7F2] text-[#57534E]'}`}
                    >
                      <Leaf className="w-3.5 h-3.5" />
                      Éco
                    </button>
                    {currentUser?.role === 'host' && (
                      <button 
                        onClick={() => setAddListingModalOpen(true)}
                        className="bg-[#D97706] hover:bg-[#B45309] text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Ajouter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Region selector pill badges */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  Sélection rapide par région ({ALL_14_REGIONS.length} régions)
                </span>
                {selectedRegion !== 'Toutes' && (
                  <button 
                    onClick={() => setSelectedRegion('Toutes')}
                    className="text-xs text-[#C2410C] font-semibold hover:underline"
                  >
                    Effacer le filtre ({selectedRegion})
                  </button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedRegion('Toutes')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${selectedRegion === 'Toutes' ? 'bg-[#C2410C] text-white shadow' : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#FAF7F2]'}`}
                >
                  Toutes ({listings.length})
                </button>
                {ALL_14_REGIONS.map(reg => {
                  const count = listings.filter(l => l.region.toLowerCase() === reg.toLowerCase()).length;
                  return (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${selectedRegion === reg ? 'bg-[#C2410C] text-white shadow' : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#FAF7F2]'}`}
                    >
                      <span>{reg}</span>
                      {count > 0 && <span className="opacity-75 text-[10px]">({count})</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['Tous', 'Éco-lodge', 'Maison d\'hôte', 'Campement villageois', 'Villa Lagune & Mer', 'Tente Nomade'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-[#78350F] text-white' : 'bg-white text-[#78716C] border border-[#E7E5E4] hover:bg-[#F5F2EB]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Listings Grid Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif">
                  {selectedRegion !== 'Toutes' ? `Séjours à ${selectedRegion}` : 'Tous les séjours disponibles'}
                </h2>
                <p className="text-xs text-[#78716C]">
                  {filteredListings.length} hébergement{filteredListings.length > 1 ? 's' : ''} trouvé{filteredListings.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Add stay quick button for hosts */}
              <button 
                onClick={() => {
                  if (!currentUser) {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  } else {
                    setAddListingModalOpen(true);
                  }
                }}
                className="bg-[#15803D] hover:bg-[#166534] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un séjour</span>
              </button>
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E7E5E4] p-10 text-center space-y-3">
                <Compass className="w-10 h-10 text-[#D97706] mx-auto" />
                <h3 className="font-bold text-base">Aucun séjour ne correspond aux filtres</h3>
                <p className="text-xs text-[#78716C] max-w-md mx-auto">
                  Aucun hébergement n'est encore listé dans cette sélection. Vous pouvez ajouter le premier séjour dans cette région !
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button 
                    onClick={() => { setSelectedRegion('Toutes'); setSelectedCategory('Tous'); setEcoOnly(false); setSearchQuery(''); }}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-[#E7E5E4] hover:bg-[#FAF7F2]"
                  >
                    Réinitialiser les filtres
                  </button>
                  <button 
                    onClick={() => setAddListingModalOpen(true)}
                    className="bg-[#C2410C] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un séjour ici
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-sm hover:shadow-md transition cursor-pointer flex flex-col group"
                    onClick={() => setSelectedListing(item)}
                  >
                    {/* Card Image */}
                    <div className="relative h-52 overflow-hidden bg-stone-200">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          // Fallback to stock image if image URL fails
                          (e.target as HTMLImageElement).src = '/images/lodge-saloum.jpg';
                        }}
                      />
                      
                      {/* Region Tag */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#F59E0B]" />
                        <span>{item.region}</span>
                      </div>

                      {/* Video indicator badge if stay has video */}
                      {item.videoUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openVideo(item.videoUrl!, item.title);
                          }}
                          className="absolute top-3 right-12 bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md transition"
                          title="Regarder la vidéo du séjour"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Vidéo</span>
                        </button>
                      )}

                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#78716C] hover:text-red-500 transition"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {/* Category Pill */}
                      <div className="absolute bottom-3 left-3 bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                        {item.category}
                      </div>

                      {/* Eco Contribution Tag */}
                      <div className="absolute bottom-3 right-3 bg-[#0D9488] text-white px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        <span>{item.ecoImpactPercent}% réinvestis</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
                          <span className="truncate max-w-[200px]">{item.location}</span>
                          <span className="flex items-center gap-1 font-bold text-[#1C1917]">
                            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                            {item.rating} ({item.reviewsCount})
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-[#1C1917] line-clamp-1 group-hover:text-[#C2410C] transition">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#78716C] line-clamp-2 mt-1">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#F5F2EB] flex items-center justify-between">
                        <div>
                          <span className="text-base font-extrabold text-[#C2410C]">{item.priceXof.toLocaleString()} CFA</span>
                          <span className="text-xs text-[#78716C]"> / nuit</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.videoUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openVideo(item.videoUrl!, item.title);
                              }}
                              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition"
                            >
                              <Video className="w-3.5 h-3.5" />
                              Vidéo
                            </button>
                          )}
                          <span className="text-xs font-bold text-[#D97706] group-hover:translate-x-1 transition flex items-center">
                            Détails →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LISTING DETAIL VIEW */}
        {selectedListing && (
          <div className="space-y-6">
            {/* Top Back Button */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedListing(null)}
                className="flex items-center gap-2 text-sm font-bold text-[#57534E] hover:text-[#C2410C] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour aux séjours</span>
              </button>

              <div className="flex items-center gap-3">
                {selectedListing.videoUrl && (
                  <button 
                    onClick={() => openVideo(selectedListing.videoUrl!, selectedListing.title)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Voir la vidéo du séjour</span>
                  </button>
                )}
                <button 
                  onClick={() => toggleFavorite(selectedListing.id)}
                  className="p-2 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#FAF7F2] transition text-[#78716C]"
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedListing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Listing Header Image Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-[340px] sm:h-[420px]">
              <img 
                src={selectedListing.imageUrl} 
                alt={selectedListing.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/lodge-saloum.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Région : {selectedListing.region}
                </span>
                <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-xs font-bold">
                  {selectedListing.category}
                </span>
              </div>

              {selectedListing.videoUrl && (
                <button 
                  onClick={() => openVideo(selectedListing.videoUrl!, selectedListing.title)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition hover:scale-110"
                >
                  <Play className="w-7 h-7 fill-white ml-1" />
                </button>
              )}

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-2xl sm:text-4xl font-extrabold font-serif mb-2">
                  {selectedListing.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-base">
                  {selectedListing.location}
                </p>
              </div>
            </div>

            {/* Details Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Description, Teranga Story, Host, Amenities */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overview Card */}
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-4">
                  <h2 className="text-lg font-bold font-serif text-[#1C1917]">À propos de cet hébergement</h2>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    {selectedListing.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F5F2EB] text-center">
                    <div className="bg-[#FAF7F2] p-2.5 rounded-xl">
                      <span className="block text-base font-bold text-[#C2410C]">{selectedListing.maxGuests}</span>
                      <span className="text-xs text-[#78716C]">Voyageurs max</span>
                    </div>
                    <div className="bg-[#FAF7F2] p-2.5 rounded-xl">
                      <span className="block text-base font-bold text-[#C2410C]">{selectedListing.bedrooms}</span>
                      <span className="text-xs text-[#78716C]">Chambre(s)</span>
                    </div>
                    <div className="bg-[#FAF7F2] p-2.5 rounded-xl">
                      <span className="block text-base font-bold text-[#C2410C]">{selectedListing.bathrooms}</span>
                      <span className="text-xs text-[#78716C]">Salle d'eau</span>
                    </div>
                  </div>
                </div>

                {/* Cultural Teranga Story */}
                <div className="bg-[#FFFBEB] rounded-2xl border border-[#FDE68A] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#92400E]">
                    <Sparkles className="w-5 h-5 text-[#D97706]" />
                    <h3 className="font-bold text-base">Histoire Teranga & Valeurs Locales</h3>
                  </div>
                  <p className="text-sm text-[#78350F] leading-relaxed">
                    {selectedListing.culturalStory}
                  </p>
                </div>

                {/* Host Card */}
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-lg font-extrabold flex-shrink-0">
                    {selectedListing.host.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base">{selectedListing.host.name}</h3>
                      <span className="bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Hôte vérifié
                      </span>
                    </div>
                    <p className="text-xs text-[#D97706] font-semibold">{selectedListing.host.role}</p>
                    <p className="text-xs text-[#78716C] pt-1">{selectedListing.host.bio}</p>
                  </div>
                </div>

                {/* Eco Commitments */}
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-[#0D9488]" />
                      <h3 className="font-bold text-base">Engagements Écologiques & Solidaires</h3>
                    </div>
                    <span className="bg-[#CCFBF1] text-[#0F766E] px-2.5 py-1 rounded-full text-xs font-bold">
                      {selectedListing.ecoImpactPercent}% Reversés au village
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedListing.ecoCommitments.map((eco, idx) => (
                      <div key={idx} className="bg-[#F0FDFA] p-3 rounded-xl border border-[#CCFBF1]">
                        <h4 className="font-bold text-xs text-[#0F766E] mb-1">{eco.title}</h4>
                        <p className="text-xs text-[#115E59]">{eco.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Booking Widget */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 shadow-md sticky top-24 space-y-5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-[#C2410C]">
                        {selectedListing.priceXof.toLocaleString()} CFA
                      </span>
                      <span className="text-xs text-[#78716C]"> / nuit</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1C1917]">
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      <span>{selectedListing.rating}</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E7E5E4] space-y-3">
                    <div>
                      <label className="text-xs font-bold text-[#78716C] block mb-1">Nombre de nuits</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="30" 
                        value={bookingNights}
                        onChange={e => setBookingNights(Number(e.target.value) || 1)}
                        className="w-full bg-white border border-[#E7E5E4] rounded-lg px-3 py-1.5 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#78716C] block mb-1">Voyageurs</label>
                      <input 
                        type="number" 
                        min="1" 
                        max={selectedListing.maxGuests} 
                        value={bookingGuests}
                        onChange={e => setBookingGuests(Number(e.target.value) || 1)}
                        className="w-full bg-white border border-[#E7E5E4] rounded-lg px-3 py-1.5 text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#78716C]">
                    <div className="flex justify-between">
                      <span>{selectedListing.priceXof.toLocaleString()} CFA x {bookingNights} nuits</span>
                      <span className="font-bold text-[#1C1917]">{(selectedListing.priceXof * bookingNights).toLocaleString()} CFA</span>
                    </div>
                    <div className="flex justify-between text-[#0D9488]">
                      <span>Impact villageois ({selectedListing.ecoImpactPercent}%)</span>
                      <span className="font-bold">+{Math.round((selectedListing.priceXof * bookingNights * selectedListing.ecoImpactPercent) / 100).toLocaleString()} CFA</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-[#1C1917] pt-2 border-t border-[#E7E5E4]">
                      <span>Total</span>
                      <span className="text-[#C2410C]">{(selectedListing.priceXof * bookingNights).toLocaleString()} CFA</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (!currentUser) {
                        setAuthMode('login');
                        setAuthModalOpen(true);
                      } else {
                        handleConfirmBooking();
                      }
                    }}
                    className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-3 rounded-xl font-bold text-sm shadow-md transition"
                  >
                    Réserver maintenant
                  </button>

                  {selectedListing.videoUrl && (
                    <button 
                      onClick={() => openVideo(selectedListing.videoUrl!, selectedListing.title)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Video className="w-4 h-4 text-red-600" />
                      Visite Vidéo immersive
                    </button>
                  )}

                  <p className="text-[11px] text-center text-[#78716C]">
                    Paiement sécurisé Wave, Orange Money ou Carte à l'arrivée
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGIONS TAB */}
        {activeTab === 'regions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-serif">Les 14 Régions du Sénégal</h2>
              <p className="text-sm text-[#78716C]">
                Explorez la diversité culturelle et géographique de notre pays, des mangroves du Saloum au désert de Lompoul.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SENEGAL_REGIONS.map(reg => (
                <div 
                  key={reg.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
                  onClick={() => { setSelectedRegion(reg.name); setActiveTab('explore'); }}
                >
                  <div className="relative h-44">
                    <img src={reg.imageUrl} alt={reg.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <h3 className="font-extrabold text-xl">{reg.name}</h3>
                      <p className="text-xs text-white/80">{reg.tagline}</p>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {reg.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F5F2EB]">
                      <span className="text-xs font-bold text-[#D97706]">{reg.bestSeason}</span>
                      <button className="text-xs font-bold text-[#C2410C] hover:underline">
                        Voir les séjours →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete list of all 14 regions as pill selector */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] space-y-3">
              <h3 className="font-bold text-sm text-[#1C1917]">Accès direct aux 14 régions administratives :</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_14_REGIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => { setSelectedRegion(r); setActiveTab('explore'); }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF7F2] hover:bg-[#C2410C] hover:text-white border border-[#E7E5E4] transition"
                  >
                    📍 {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRIPS TAB */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif">Mes Séjours Teranga</h2>
                <p className="text-sm text-[#78716C]">
                  Gérez vos réservations, bons d'échange et votre impact écologique au Sénégal.
                </p>
              </div>

              {!currentUser && (
                <button 
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                  className="bg-[#C2410C] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Se connecter pour retrouver mes séjours
                </button>
              )}
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center space-y-3">
                <Compass className="w-12 h-12 text-[#D97706] mx-auto" />
                <h3 className="font-bold text-lg">Aucun séjour réservé pour le moment</h3>
                <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                  Partez à la découverte des merveilles du Sénégal en réservant votre premier éco-lodge solidaire.
                </p>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="bg-[#C2410C] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  Explorer les séjours
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(b => (
                  <div key={b.id} className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img 
                        src={b.listing.imageUrl} 
                        alt={b.listing.title} 
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0" 
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/lodge-saloum.jpg'; }}
                      />
                      <div>
                        <span className="bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                          {b.status}
                        </span>
                        <h3 className="font-bold text-base text-[#1C1917] mt-1">{b.listing.title}</h3>
                        <p className="text-xs text-[#78716C] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C2410C]" /> {b.listing.location} (Région de {b.listing.region})
                        </p>
                        <p className="text-xs text-[#57534E] mt-1">
                          Du {b.checkIn} au {b.checkOut} ({b.nights} nuits, {b.guests} voyageurs)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#F5F2EB]">
                      <div>
                        <span className="text-lg font-extrabold text-[#C2410C]">{b.totalXof.toLocaleString()} CFA</span>
                        <span className="text-xs text-[#78716C] block md:text-right">Réf: {b.ref}</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#0D9488] bg-[#F0FDFA] px-2.5 py-1 rounded-lg">
                        Impact : {(b.totalXof * 0.1).toLocaleString()} CFA reversés
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* KOUMBA AI CONCIERGE TAB */}
        {activeTab === 'koumba' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-[#0D9488] text-white p-5 rounded-2xl shadow-md flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif">Koumba — Guide & Concierge Teranga</h2>
                <p className="text-xs text-white/90">
                  Posez vos questions sur la culture, les salutations en Wolof, les 14 régions et la gastronomie sénégalaise.
                </p>
              </div>
            </div>

            {/* Chat Box */}
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 h-[400px] flex flex-col justify-between">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-[#C2410C] text-white rounded-tr-none' : 'bg-[#FAF7F2] text-[#1C1917] rounded-tl-none border border-[#E7E5E4]'}`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className={`block text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#78716C]'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions chips */}
              <div className="flex gap-2 overflow-x-auto py-2 border-t border-[#F5F2EB]">
                {['Salutations en wolof', 'Spécialités culinaires', 'Meilleure saison météo', 'Les 14 régions'].map(sug => (
                  <button 
                    key={sug}
                    onClick={() => handleSendMessage(sug)}
                    className="px-3 py-1 bg-[#F5F2EB] hover:bg-[#EFECE6] text-[#57534E] rounded-full text-xs font-semibold whitespace-nowrap transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="text" 
                  placeholder="Posez une question à Koumba (ex: Nanga def, idées d'escapade...)"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                  className="flex-1 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#0D9488]"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white p-2.5 rounded-xl transition shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HOST DASHBOARD TAB */}
        {activeTab === 'host' && (
          <div className="space-y-6">
            {/* Host Banner */}
            <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="bg-[#D97706] text-black px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  Espace Hôte Teranga
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-2">
                  Partagez votre hébergement au Sénégal
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-1">
                  Rejoignez le réseau d’écotourisme solidaire. Ajoutez vos séjours avec photos et vidéos pour accueillir des voyageurs du monde entier.
                </p>
              </div>

              <button 
                onClick={() => setAddListingModalOpen(true)}
                className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 transition flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
                <span>+ Ajouter un séjour</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] text-center">
                <span className="text-2xl font-extrabold text-[#C2410C]">{listings.length}</span>
                <span className="block text-xs text-[#78716C]">Séjours actifs</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] text-center">
                <span className="text-2xl font-extrabold text-[#15803D]">14</span>
                <span className="block text-xs text-[#78716C]">Régions couvertes</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] text-center">
                <span className="text-2xl font-extrabold text-[#D97706]">4.95 ★</span>
                <span className="block text-xs text-[#78716C]">Note Teranga</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] text-center">
                <span className="text-2xl font-extrabold text-[#0D9488]">100%</span>
                <span className="block text-xs text-[#78716C]">Mobile Money (Wave/OM)</span>
              </div>
            </div>

            {/* Host Listings List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg font-serif">Vos hébergements publiés ({listings.length})</h3>
                <button 
                  onClick={() => setAddListingModalOpen(true)}
                  className="text-xs font-bold text-[#C2410C] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Nouveau séjour
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listings.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-[#E7E5E4] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-16 h-16 rounded-xl object-cover" 
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/lodge-saloum.jpg'; }}
                      />
                      <div>
                        <span className="bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded text-[10px] font-bold">
                          {item.region}
                        </span>
                        <h4 className="font-bold text-sm text-[#1C1917] mt-0.5">{item.title}</h4>
                        <p className="text-xs text-[#C2410C] font-bold">{item.priceXof.toLocaleString()} CFA / nuit</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.videoUrl && (
                        <button 
                          onClick={() => openVideo(item.videoUrl!, item.title)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Voir la vidéo"
                        >
                          <Play className="w-4 h-4 fill-red-600" />
                        </button>
                      )}
                      <button 
                        onClick={() => setSelectedListing(item)}
                        className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] text-xs font-bold hover:bg-[#FAF7F2] transition"
                      >
                        Aperçu
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E7E5E4] py-8 px-4 lg:px-8 mt-12 text-center text-xs text-[#78716C] space-y-2">
        <div className="flex justify-center items-center gap-2">
          <span className="font-bold text-base text-[#C2410C]">MyStay</span>
          <span className="font-bold text-base text-[#D97706]">Sénégal</span>
          <span className="text-stone-300">|</span>
          <span>14 Régions</span>
          <span className="text-stone-300">|</span>
          <span>Écotourisme Solidaire & Teranga</span>
        </div>
        <p>© 2026 MyStay Voyager Sénégal — Plateforme & Application Mobile Dédiée au Tourisme Éco-responsable.</p>
      </footer>

      {/* ========================================================================= */}
      {/* AUTH MODAL (CONNEXION & INSCRIPTION)                                     */}
      {/* ========================================================================= */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative my-8">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-[#78716C] hover:text-black p-1 rounded-full hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brand Header */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mx-auto mb-2">
                <UserIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">
                {authMode === 'login' ? 'Connexion à votre compte' : 'Créer un compte Teranga'}
              </h3>
              <p className="text-xs text-[#78716C]">
                {authMode === 'login' 
                  ? 'Accédez à vos séjours et gérez vos réservations' 
                  : 'Rejoignez la communauté des voyageurs et hôtes sénégalais'}
              </p>
            </div>

            {/* Auth Mode Tabs */}
            <div className="flex bg-[#FAF7F2] p-1 rounded-2xl border border-[#E7E5E4]">
              <button 
                onClick={() => { setAuthMode('login'); setAuthError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${authMode === 'login' ? 'bg-white text-[#C2410C] shadow-sm' : 'text-[#78716C]'}`}
              >
                Se connecter
              </button>
              <button 
                onClick={() => { setAuthMode('register'); setAuthError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${authMode === 'register' ? 'bg-white text-[#C2410C] shadow-sm' : 'text-[#78716C]'}`}
              >
                S'inscrire
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-xl border border-red-200">
                {authError}
              </div>
            )}

            {/* Quick Demo Logins for Testing */}
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E7E5E4] space-y-2">
              <span className="text-[11px] font-bold text-[#78716C] block uppercase tracking-wider">
                ⚡ Connexion rapide pour tester :
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin(SAMPLE_USERS[0])}
                  className="bg-white hover:bg-stone-50 border border-[#E7E5E4] p-2 rounded-xl text-left text-xs transition"
                >
                  <span className="font-bold text-[#C2410C] block truncate">Amadou (Voyageur)</span>
                  <span className="text-[10px] text-[#78716C]">Dakar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin(SAMPLE_USERS[1])}
                  className="bg-white hover:bg-stone-50 border border-[#E7E5E4] p-2 rounded-xl text-left text-xs transition"
                >
                  <span className="font-bold text-[#D97706] block truncate">Ba Tamsir (Hôte)</span>
                  <span className="text-[10px] text-[#78716C]">Fatick / Saloum</span>
                </button>
              </div>
            </div>

            {/* LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Email ou identifiant</label>
                  <input 
                    type="email" 
                    placeholder="ex: amadou@teranga.sn"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Mot de passe</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-2.5 rounded-xl font-bold text-sm shadow transition"
                >
                  Se connecter
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Nom et Prénom</label>
                  <input 
                    type="text" 
                    placeholder="ex: Ousmane Diop"
                    value={authName}
                    onChange={e => setAuthName(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-[#57534E] block mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="votre@email.com"
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      required
                      className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#57534E] block mb-1">Téléphone (Wave/OM)</label>
                    <input 
                      type="tel" 
                      placeholder="+221 77..."
                      value={authPhone}
                      onChange={e => setAuthPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Mot de passe</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Vous êtes :</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthRole('traveler')}
                      className={`p-2 rounded-xl text-xs font-bold border transition ${authRole === 'traveler' ? 'bg-[#C2410C] text-white border-[#C2410C]' : 'bg-[#FAF7F2] text-[#57534E] border-[#E7E5E4]'}`}
                    >
                      🧳 Voyageur
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthRole('host')}
                      className={`p-2 rounded-xl text-xs font-bold border transition ${authRole === 'host' ? 'bg-[#D97706] text-white border-[#D97706]' : 'bg-[#FAF7F2] text-[#57534E] border-[#E7E5E4]'}`}
                    >
                      🏡 Hôte (Propriétaire)
                    </button>
                  </div>
                </div>

                {/* 14 Regions Dropdown for Registration */}
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Région de résidence / hébergement :</label>
                  <select 
                    value={authRegion}
                    onChange={e => setAuthRegion(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-[#C2410C]"
                  >
                    {ALL_14_REGIONS.map(reg => (
                      <option key={reg} value={reg}>📍 {reg}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-2.5 rounded-xl font-bold text-sm shadow transition"
                >
                  Créer mon compte
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HOST ADD LISTING MODAL (PHOTOS, VIDEOS, 14 REGIONS)                       */}
      {/* ========================================================================= */}
      {addListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative my-8">
            <button 
              onClick={() => setAddListingModalOpen(false)}
              className="absolute top-5 right-5 text-[#78716C] hover:text-black p-1.5 rounded-full hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                Espace Hôte Sénégal
              </span>
              <h2 className="text-2xl font-bold font-serif mt-2">Ajouter un nouveau séjour</h2>
              <p className="text-xs text-[#78716C]">
                Publiez votre hébergement avec photos, vidéo et rattachement à l'une des 14 régions du Sénégal.
              </p>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Titre de l'hébergement *</label>
                  <input 
                    type="text" 
                    placeholder="ex: Campement Écologique des Baobabs"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Sous-titre accrocheur</label>
                  <input 
                    type="text" 
                    placeholder="ex: Tente nomade avec vue panoramique"
                    value={newSubtitle}
                    onChange={e => setNewSubtitle(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
              </div>

              {/* 14 REGIONS DROPDOWN (CRITICAL REQUIREMENT) & LOCALITY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#C2410C] block mb-1">
                    📍 Région du Sénégal (14 régions disponibles) *
                  </label>
                  <select 
                    value={newRegion}
                    onChange={e => setNewRegion(e.target.value)}
                    className="w-full bg-[#FFFBEB] border-2 border-[#D97706] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#78350F] focus:outline-none"
                  >
                    {ALL_14_REGIONS.map(reg => (
                      <option key={reg} value={reg}>📍 Région de {reg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Ville / Localité précise *</label>
                  <input 
                    type="text" 
                    placeholder="ex: Île de Mar Lodj, Somone, Cap Skirring..."
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
              </div>

              {/* Category, Price & Capacity */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Type de séjour</label>
                  <select 
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Éco-lodge">Éco-lodge</option>
                    <option value="Maison d'hôte">Maison d'hôte</option>
                    <option value="Campement villageois">Campement villageois</option>
                    <option value="Villa Lagune & Mer">Villa Lagune & Mer</option>
                    <option value="Tente Nomade">Tente Nomade</option>
                    <option value="Case Traditionnelle">Case Traditionnelle</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Prix par nuit (CFA) *</label>
                  <input 
                    type="number" 
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-2.5 py-2 text-xs font-bold text-[#C2410C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Capacité (personnes)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="20"
                    value={newMaxGuests}
                    onChange={e => setNewMaxGuests(Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-2.5 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#57534E] block mb-1">Éco-Impact (%)</label>
                  <input 
                    type="number" 
                    min="5"
                    max="50"
                    value={newEcoImpact}
                    onChange={e => setNewEcoImpact(Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-2.5 py-2 text-xs font-semibold text-[#0D9488]"
                  />
                </div>
              </div>

              {/* PHOTOS SELECTION (CRITICAL REQUIREMENT) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#57534E] block">
                  📷 Photos de l'hébergement (Sélectionnez ou ajoutez votre image) :
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Saloum Lodge', src: '/images/lodge-saloum.jpg' },
                    { label: 'Gorée Demeure', src: '/images/goree-teranga.jpg' },
                    { label: 'Casamance', src: '/images/casamance-campement.jpg' },
                    { label: 'Petite Côte / Mer', src: '/images/hero-senegal.jpg' },
                  ].map(img => (
                    <div 
                      key={img.src}
                      onClick={() => { setNewSelectedImage(img.src); setNewCustomImageUrl(''); }}
                      className={`relative rounded-xl overflow-hidden cursor-pointer h-16 border-2 transition ${newSelectedImage === img.src && !newCustomImageUrl ? 'border-[#C2410C] scale-95 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'}`}
                    >
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5 truncate">
                        {img.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-1">
                  <input 
                    type="url" 
                    placeholder="Ou collez l'URL d'une image en ligne (https://...jpg/png)"
                    value={newCustomImageUrl}
                    onChange={e => setNewCustomImageUrl(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
              </div>

              {/* VIDEO URL FIELD (CRITICAL REQUIREMENT) */}
              <div className="bg-[#FEF2F2] p-3 rounded-2xl border border-red-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-red-700">
                  <Video className="w-4 h-4" />
                  <label className="text-xs font-bold">
                    🎥 Possibilité de Vidéo (Visite virtuelle / Clip du séjour) :
                  </label>
                </div>
                <input 
                  type="url" 
                  placeholder="ex: https://commondatastorage.googleapis.com/.../video.mp4 ou lien vidéo"
                  value={newVideoUrl}
                  onChange={e => setNewVideoUrl(e.target.value)}
                  className="w-full bg-white border border-red-200 rounded-xl px-3.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:border-red-500"
                />
                <p className="text-[10px] text-red-600">
                  Une icône vidéo et un lecteur interactif seront affichés sur la fiche du séjour pour les voyageurs.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-[#57534E] block mb-1">Description détaillée du séjour</label>
                <textarea 
                  rows={2}
                  placeholder="Décrivez l'ambiance, la vue, le confort et les équipements..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              {/* Cultural Story */}
              <div>
                <label className="text-xs font-bold text-[#57534E] block mb-1">Histoire Teranga & Valeurs locales</label>
                <input 
                  type="text" 
                  placeholder="ex: Dîners au feu de bois avec contes locaux, pêche durable en pirogue..."
                  value={newCulturalStory}
                  onChange={e => setNewCulturalStory(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F5F2EB]">
                <button 
                  type="button"
                  onClick={() => setAddListingModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#78716C] hover:bg-stone-100 transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publier mon hébergement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIDEO VIEWER MODAL                                                        */}
      {/* ========================================================================= */}
      {videoModalOpen && activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-black rounded-3xl overflow-hidden max-w-3xl w-full border border-stone-800 shadow-2xl relative">
            <div className="p-4 bg-stone-900 flex items-center justify-between text-white border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-sm truncate max-w-md">{activeVideoTitle}</h3>
              </div>
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            </div>

            <div className="p-3 bg-stone-900 text-stone-400 text-xs flex items-center justify-between">
              <span>Visite virtuelle immersive du séjour au Sénégal</span>
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="text-white hover:underline font-bold text-xs"
              >
                Fermer la vidéo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
