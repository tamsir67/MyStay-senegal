import React, { useState } from 'react';
import { 
  Compass, MapPin, Calendar, Users, Heart, Star, Leaf, 
  Sparkles, Check, ChevronRight, ShieldCheck, 
  MessageSquare, User as UserIcon, Building2, Send, X, Share2, 
  DollarSign, Plus, LogIn, LogOut, Video, PlayCircle
} from 'lucide-react';
import { SENEGAL_LISTINGS, SENEGAL_REGIONS, ALL_14_REGIONS, Listing, Region } from './data/senegalListings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'regions' | 'trips' | 'koumba' | 'host'>('explore');
  const [selectedRegion, setSelectedRegion] = useState<string>('Toutes');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [ecoOnly, setEcoOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(['saloum-lodge', 'goree-demeure']);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [listings, setListings] = useState<Listing[]>(SENEGAL_LISTINGS);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'traveler' | 'host'; region: string } | null>({
    name: 'Amadou Diallo',
    email: 'amadou.diallo@teranga.sn',
    role: 'traveler',
    region: 'Dakar'
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authRole, setAuthRole] = useState<'traveler' | 'host'>('traveler');
  const [authRegion, setAuthRegion] = useState('Dakar');

  // Host Add Listing Modal state
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newRegion, setNewRegion] = useState('Fatick');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('Éco-lodge');
  const [newPrice, setNewPrice] = useState('40000');
  const [newDesc, setNewDesc] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('/images/lodge-saloum.jpg');

  // Video viewer modal
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

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
    const matchSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchRegion = selectedRegion === 'Toutes' || selectedRegion === 'Toutes les régions' || 
      item.region.toLowerCase() === selectedRegion.toLowerCase() ||
      item.location.toLowerCase().includes(selectedRegion.toLowerCase());

    const matchCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchEco = !ecoOnly || item.ecoImpactPercent >= 10;

    return matchSearch && matchRegion && matchCategory && matchEco;
  });

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
    setBookingSuccessNotice('Félicitations ! Votre séjour solidaire a été réservé avec succès.');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      setCurrentUser({
        name: authEmail.split('@')[0] || 'Voyageur Teranga',
        email: authEmail || 'voyageur@teranga.sn',
        role: authEmail.includes('hote') || authEmail.includes('host') ? 'host' : 'traveler',
        region: 'Dakar'
      });
    } else {
      setCurrentUser({
        name: authName || 'Membre Teranga',
        email: authEmail,
        role: authRole,
        region: authRegion
      });
    }
    setAuthModalOpen(false);
  };

  const handleAddListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListingItem: Listing = {
      id: 'custom_' + Date.now(),
      title: newTitle || 'Séjour Teranga ' + newRegion,
      subtitle: newSubtitle || 'Authenticité & écologie au Sénégal',
      region: newRegion,
      location: newLocation || `${newRegion}, Sénégal`,
      priceXof: parseInt(newPrice) || 35000,
      rating: 5.0,
      reviewsCount: 1,
      category: newCategory,
      imageUrl: newImageUrl,
      videoUrl: newVideoUrl || undefined,
      description: newDesc || 'Un magnifique hébergement respectueux de la nature et de la culture locale.',
      culturalStory: newStory || 'Accueil chaleureux dans la tradition de la Teranga.',
      amenities: ['Énergie solaire', 'Repas bio du terroir', 'Guide local'],
      host: {
        name: currentUser?.name || 'Hôte Partenaire Teranga',
        role: 'Hôte vérifié • ' + newRegion,
        avatar: currentUser?.name.slice(0, 2).toUpperCase() || 'SN',
        rating: 5.0,
        bio: 'Passionné par l\'accueil authentique et le partage des richesses de notre région.'
      },
      ecoCommitments: [
        { title: 'Développement local', description: 'Financement des projets éducatifs et environnementaux' }
      ],
      ecoImpactPercent: 10,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      localSpecialties: ['Plat traditionnel du jour', 'Jus de bissap bio']
    };

    setListings([newListingItem, ...listings]);
    setAddListingModalOpen(false);
    setActiveTab('explore');
    setBookingSuccessNotice(`Votre hébergement "${newListingItem.title}" a été publié avec succès !`);
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
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E7E5E4] px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('explore'); setSelectedListing(null); }}>
            <img src="/images/logo-teranga.jpg" alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-[#D97706]" />
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#C2410C]">MyStay</span>
              <span className="font-extrabold text-xl tracking-tight text-[#D97706] ml-1">Sénégal</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E]">
                Teranga Écotourisme
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => { setActiveTab('explore'); setSelectedListing(null); }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${activeTab === 'explore' ? 'bg-[#C2410C] text-white' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Découvrir
            </button>
            <button 
              onClick={() => { setActiveTab('regions'); setSelectedListing(null); }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${activeTab === 'regions' ? 'bg-[#C2410C] text-white' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Régions
            </button>
            <button 
              onClick={() => { setActiveTab('trips'); setSelectedListing(null); }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${activeTab === 'trips' ? 'bg-[#C2410C] text-white' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Mes Séjours ({bookings.length})
            </button>
            <button 
              onClick={() => { setActiveTab('koumba'); setSelectedListing(null); }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${activeTab === 'koumba' ? 'bg-[#0D9488] text-white' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              Koumba IA
            </button>
            <button 
              onClick={() => { setActiveTab('host'); setSelectedListing(null); }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${activeTab === 'host' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:bg-[#F5F2EB]'}`}
            >
              Espace Hôte
            </button>

            {/* Auth Profile / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#E7E5E4]">
                <div 
                  onClick={() => setCurrentUser(prev => prev ? { ...prev, role: prev.role === 'host' ? 'traveler' : 'host' } : null)}
                  className="cursor-pointer flex items-center gap-1.5 bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#E7E5E4] text-xs font-bold"
                  title="Cliquer pour basculer Hôte / Voyageur"
                >
                  <span className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px]">
                    {currentUser.name.slice(0, 1)}
                  </span>
                  <span className="hidden md:inline">{currentUser.name.split(' ')[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${currentUser.role === 'host' ? 'bg-[#0D9488] text-white' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                    {currentUser.role === 'host' ? 'Hôte' : 'Voyageur'}
                  </span>
                </div>
                <button 
                  onClick={() => setCurrentUser(null)}
                  title="Déconnexion"
                  className="text-[#78716C] hover:text-[#C2410C] p-1.5"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                className="ml-2 bg-[#C2410C] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow"
              >
                <LogIn className="w-3.5 h-3.5" />
                Connexion
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-6">
        
        {/* EXPLORE TAB */}
        {activeTab === 'explore' && !selectedListing && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-[340px] flex items-end">
              <img 
                src="/images/hero-senegal.jpg" 
                alt="Sénégal" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-10 w-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F59E0B] text-[#1F160C] mb-2">
                  Hospitalité & Nature Sénégalaise
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif mb-2">
                  Dalal Ak Jamm au Sénégal
                </h1>
                <p className="text-white/90 text-sm sm:text-base max-w-2xl mb-5">
                  Réservez des éco-lodges, campements villageois et maisons d’hôtes engagés dans la préservation de la biodiversité locale.
                </p>

                {/* Search Bar */}
                <div className="bg-white/95 backdrop-blur p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 max-w-3xl">
                  <div className="flex items-center gap-2 px-3 py-1.5 flex-1 w-full">
                    <MapPin className="w-5 h-5 text-[#C2410C]" />
                    <input 
                      type="text" 
                      placeholder="Où souhaitez-vous séjourner ? (ex: Saloum, Gorée, Casamance...)"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none placeholder-[#78716C]"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => setEcoOnly(!ecoOnly)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${ecoOnly ? 'bg-[#0D9488] text-white' : 'bg-[#FAF7F2] text-[#57534E]'}`}
                    >
                      <Leaf className="w-3.5 h-3.5" />
                      Fort Impact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 14 REGIONS DROPDOWN SELECTOR (EXPLICIT USER REQUEST) */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7E5E4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#C2410C] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#1C1917]">
                    Choisir parmi les 14 régions du Sénégal
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    Sélectionnez la région de votre choix dans la liste déroulante
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-[#FAF7F2] border-2 border-[#D97706] text-[#1C1917] font-bold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C2410C] cursor-pointer shadow-sm min-w-[220px]"
                >
                  <option value="Toutes">🇸🇳 Toutes les 14 régions</option>
                  {ALL_14_REGIONS.map(reg => (
                    <option key={reg} value={reg}>Région de {reg}</option>
                  ))}
                </select>

                {selectedRegion !== 'Toutes' && (
                  <button 
                    onClick={() => setSelectedRegion('Toutes')}
                    className="text-xs font-bold text-[#C2410C] hover:underline whitespace-nowrap"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block mb-2">
                Catégories d'hébergement
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {['Tous', 'Éco-lodge', 'Maison d\'hôte', 'Campement villageois', 'Villa Lagune & Mer'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-[#D97706] text-white shadow' : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#FAF7F2]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Host Quick Call to Action */}
            {currentUser?.role === 'host' && (
              <div className="bg-[#CCFBF1] p-4 rounded-2xl border border-[#0D9488]/30 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-[#065F46]">Espace Hôte Partenaire</h4>
                  <p className="text-xs text-[#065F46]/80">Publiez votre séjour avec photos et visite vidéo dans votre région.</p>
                </div>
                <button 
                  onClick={() => setAddListingModalOpen(true)}
                  className="bg-[#0D9488] hover:bg-[#065F46] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un séjour
                </button>
              </div>
            )}

            {/* Listings Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-[#1C1917]">
                  {selectedRegion !== 'Toutes' ? `Séjours à ${selectedRegion}` : 'Tous les séjours d\'exception'} ({filteredListings.length})
                </h2>
                <span className="text-xs text-[#78716C]">
                  Prix en Francs CFA (XOF)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <div 
                    key={listing.id}
                    onClick={() => setSelectedListing(listing)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-[#E7E5E4] cursor-pointer flex flex-col group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={listing.imageUrl} 
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-[#C2410C] shadow-sm">
                        {listing.category}
                      </span>
                      {listing.videoUrl && (
                        <span className="absolute top-3 left-28 px-2 py-1 rounded-full text-xs font-bold bg-black/60 text-white flex items-center gap-1 shadow-sm">
                          <PlayCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
                          Vidéo
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(listing.id); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:text-red-400 transition"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0D9488]/90 text-white flex items-center gap-1 shadow-sm">
                        <Leaf className="w-3 h-3 text-[#FDE68A]" />
                        {listing.ecoImpactPercent}% reversé
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                            {listing.location}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-[#1C1917]">
                            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                            {listing.rating} ({listing.reviewsCount})
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-[#1C1917] group-hover:text-[#C2410C] transition line-clamp-1 mb-1">
                          {listing.title}
                        </h3>
                        <p className="text-xs text-[#57534E] line-clamp-2 mb-3">
                          {listing.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F5F2EB] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#FEF3C7] text-[#C2410C] font-bold text-xs flex items-center justify-center">
                            {listing.host.avatar}
                          </span>
                          <span className="text-xs font-medium text-[#57534E]">
                            {listing.host.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-[#C2410C]">
                            {listing.priceXof.toLocaleString()} F
                          </span>
                          <span className="text-xs text-[#78716C]"> / nuit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LISTING DETAIL VIEW */}
        {selectedListing && (
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#E7E5E4] space-y-8 animate-fade-in">
            <button 
              onClick={() => setSelectedListing(null)}
              className="text-xs font-bold text-[#C2410C] hover:underline flex items-center gap-1"
            >
              ← Retour aux séjours
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden shadow h-[380px] relative">
                <img 
                  src={selectedListing.imageUrl} 
                  alt={selectedListing.title}
                  className="w-full h-full object-cover" 
                />
                {selectedListing.videoUrl && (
                  <button 
                    onClick={() => setActiveVideo({ url: selectedListing.videoUrl!, title: selectedListing.title })}
                    className="absolute bottom-4 left-4 bg-black/75 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition backdrop-blur shadow"
                  >
                    <PlayCircle className="w-4 h-4 text-[#F59E0B]" />
                    Visionner la visite vidéo
                  </button>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#CCFBF1] text-[#065F46]">
                      {selectedListing.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E]">
                      {selectedListing.region}
                    </span>
                    <span className="ml-auto text-sm font-bold flex items-center gap-1 text-[#1C1917]">
                      <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                      {selectedListing.rating} ({selectedListing.reviewsCount} avis)
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] font-serif mb-2">
                    {selectedListing.title}
                  </h1>
                  <p className="text-[#C2410C] font-semibold text-sm mb-4">
                    {selectedListing.location}
                  </p>
                  <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                    {selectedListing.description}
                  </p>

                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E7E5E4] mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#92400E] mb-1">
                      ✨ Esprit Teranga & Histoire Locale
                    </h4>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {selectedListing.culturalStory}
                    </p>
                  </div>
                </div>

                <div className="bg-[#FFFBEB] p-4 rounded-2xl flex items-center justify-between border border-[#FDE68A]">
                  <div>
                    <span className="text-xs text-[#78716C] block">Prix du séjour</span>
                    <span className="text-2xl font-black text-[#C2410C]">
                      {selectedListing.priceXof.toLocaleString()} FCFA
                    </span>
                    <span className="text-xs text-[#78716C]"> / nuit</span>
                  </div>
                  <button 
                    onClick={() => setBookingModalOpen(true)}
                    className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-6 py-3 rounded-xl font-bold shadow-md transition"
                  >
                    Réserver ce séjour
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGIONS TAB */}
        {activeTab === 'regions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black font-serif text-[#1C1917]">Les 14 Régions du Sénégal</h2>
              <p className="text-sm text-[#57534E]">Du Delta du Saloum aux falaises de Gorée et vergers de Casamance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SENEGAL_REGIONS.map(reg => (
                <div key={reg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E7E5E4] flex flex-col">
                  <div className="relative h-48">
                    <img src={reg.imageUrl} alt={reg.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F59E0B] text-black mb-1 inline-block">
                        {reg.listingsCount} hébergements
                      </span>
                      <h3 className="text-xl font-bold text-white">{reg.name}</h3>
                      <p className="text-xs text-white/80">{reg.tagline}</p>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-[#57534E] mb-3 leading-relaxed">{reg.description}</p>
                    <button
                      onClick={() => { setSelectedRegion(reg.name); setActiveTab('explore'); }}
                      className="w-full py-2 rounded-xl text-xs font-bold text-[#C2410C] border border-[#C2410C] hover:bg-[#C2410C] hover:text-white transition"
                    >
                      Explorer les hébergements
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRIPS TAB */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black font-serif text-[#1C1917]">Mes Séjours Réservés</h2>
            {bookingSuccessNotice && (
              <div className="p-4 bg-[#CCFBF1] text-[#065F46] rounded-xl flex items-center justify-between text-sm font-semibold">
                <span>{bookingSuccessNotice}</span>
                <button onClick={() => setBookingSuccessNotice(null)}><X className="w-4 h-4" /></button>
              </div>
            )}
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E7E5E4] flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <img src={b.listing.imageUrl} alt={b.listing.title} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#78716C]">Réf : {b.ref}</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#CCFBF1] text-[#065F46]">{b.status}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#1C1917]">{b.listing.title}</h3>
                    <p className="text-xs text-[#57534E] mb-2">{b.listing.location}</p>
                    <p className="text-xs font-semibold text-[#92400E]">
                      📅 {b.checkIn} - {b.checkOut} ({b.nights} nuits, {b.guests} pers.)
                    </p>
                  </div>
                  <div className="sm:text-right w-full sm:w-auto">
                    <span className="text-xs text-[#78716C] block">Montant</span>
                    <span className="text-lg font-black text-[#C2410C] block">{b.totalXof.toLocaleString()} F</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KOUMBA AI CHAT TAB */}
        {activeTab === 'koumba' && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E7E5E4] h-[600px] flex flex-col overflow-hidden">
            <div className="p-4 bg-[#0D9488] text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">K</span>
              <div>
                <h3 className="font-bold text-sm">Koumba - Conseillère Teranga</h3>
                <p className="text-xs text-white/80">Guide culturel, wolof, météo et conseils avisés</p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${m.sender === 'user' ? 'bg-[#C2410C] text-white rounded-br-xs' : 'bg-[#FAF7F2] text-[#1C1917] border border-[#E7E5E4] rounded-bl-xs'}`}>
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span className={`text-[10px] block mt-1 ${m.sender === 'user' ? 'text-white/70' : 'text-[#78716C]'}`}>{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 border-t border-[#E7E5E4] bg-[#FAF7F2] flex gap-1.5 overflow-x-auto text-xs">
              {['Expressions wolof', 'Quoi manger au Sénégal ?', 'Meilleure saison'].map((hint, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(hint)}
                  className="px-3 py-1 bg-white rounded-full border border-[#E7E5E4] text-[#57534E] hover:border-[#D97706] whitespace-nowrap"
                >
                  👉 {hint}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-[#E7E5E4] flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez une question sur le Sénégal, la cuisine, la culture..."
                className="flex-1 px-4 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-[#0D9488] hover:bg-[#065F46] text-white p-2.5 rounded-xl shadow transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* HOST DASHBOARD TAB */}
        {activeTab === 'host' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-full bg-[#FEF3C7] text-[#C2410C] font-black text-xl flex items-center justify-center">
                  TN
                </span>
                <div>
                  <h3 className="font-extrabold text-lg text-[#1C1917]">Ba Tamsir Ndiaye</h3>
                  <p className="text-xs text-[#78716C]">Super-Hôte Teranga • Île de Mar Lodj (Fatick)</p>
                  <span className="text-[11px] font-bold text-[#065F46] bg-[#CCFBF1] px-2 py-0.5 rounded-full inline-block mt-1">
                    ✓ Éco-hébergement certifié
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setAddListingModalOpen(true)}
                className="bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                Ajouter un hébergement
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4]">
                <span className="text-xs text-[#78716C] block">Revenus du mois</span>
                <span className="text-xl font-black text-[#C2410C]">1 245 000 F</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4]">
                <span className="text-xs text-[#78716C] block">Séjours accueillis</span>
                <span className="text-xl font-black text-[#1C1917]">18</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4]">
                <span className="text-xs text-[#78716C] block">Note moyenne</span>
                <span className="text-xl font-black text-[#F59E0B]">4.96 ★</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4]">
                <span className="text-xs text-[#78716C] block">Impact village</span>
                <span className="text-xl font-black text-[#0D9488]">124 500 F</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AUTH MODAL (CONNEXION & INSCRIPTION) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
              <h3 className="font-extrabold text-lg">
                {authMode === 'login' ? 'Connexion à MyStay' : 'Créer un compte Teranga'}
              </h3>
              <button onClick={() => setAuthModalOpen(false)}><X className="w-5 h-5 text-[#78716C]" /></button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#78716C] block mb-1">Nom complet *</label>
                    <input 
                      type="text" 
                      required
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      placeholder="Ex: Aïssatou Sow"
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#78716C] block mb-1">Votre rôle *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAuthRole('traveler')}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition ${authRole === 'traveler' ? 'bg-[#C2410C] text-white border-[#C2410C]' : 'bg-[#FAF7F2] border-[#E7E5E4]'}`}
                      >
                        Voyageur
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setAuthRole('host')}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition ${authRole === 'host' ? 'bg-[#0D9488] text-white border-[#0D9488]' : 'bg-[#FAF7F2] border-[#E7E5E4]'}`}
                      >
                        Hôte Teranga
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#78716C] block mb-1">Région de résidence *</label>
                    <select
                      value={authRegion}
                      onChange={e => setAuthRegion(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                    >
                      {ALL_14_REGIONS.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Adresse Email *</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  placeholder="nom@exemple.sn"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Mot de passe *</label>
                <input 
                  type="password" 
                  required
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-2.5 rounded-xl font-bold transition shadow mt-2"
              >
                {authMode === 'login' ? 'Se connecter' : 'Créer mon compte'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-xs font-bold text-[#C2410C] hover:underline"
              >
                {authMode === 'login' ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HOST ADD LISTING MODAL (14 RÉGIONS, PHOTOS, VIDÉO) */}
      {addListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
              <h3 className="font-extrabold text-lg">Publier un nouveau séjour</h3>
              <button onClick={() => setAddListingModalOpen(false)}><X className="w-5 h-5 text-[#78716C]" /></button>
            </div>

            <form onSubmit={handleAddListingSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Titre de l'hébergement *</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Ex: Éco-Lodge des Baobabs de Fatick"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 14 Regions Selector */}
                <div>
                  <label className="text-xs font-bold text-[#78716C] block mb-1">Région du Sénégal *</label>
                  <select 
                    value={newRegion}
                    onChange={e => setNewRegion(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C] font-semibold"
                  >
                    {ALL_14_REGIONS.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#78716C] block mb-1">Catégorie *</label>
                  <select 
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                  >
                    <option value="Éco-lodge">Éco-lodge</option>
                    <option value="Maison d'hôte">Maison d'hôte</option>
                    <option value="Campement villageois">Campement villageois</option>
                    <option value="Villa Lagune & Mer">Villa Lagune & Mer</option>
                    <option value="Tente Nomade">Tente Nomade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#78716C] block mb-1">Village / Emplacement *</label>
                  <input 
                    type="text" 
                    required
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    placeholder="Ex: Mar Lodj, près du quai"
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#78716C] block mb-1">Tarif / nuit (FCFA) *</label>
                  <input 
                    type="number" 
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    placeholder="40000"
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
              </div>

              {/* Photo Selector */}
              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Photo principale du séjour *</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { url: '/images/lodge-saloum.jpg', label: 'Saloum' },
                    { url: '/images/goree-teranga.jpg', label: 'Gorée' },
                    { url: '/images/casamance-campement.jpg', label: 'Casamance' },
                    { url: '/images/hero-senegal.jpg', label: 'Pirogues' }
                  ].map((p, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setNewImageUrl(p.url)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 p-0.5 transition ${newImageUrl === p.url ? 'border-[#C2410C] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={p.url} alt="" className="w-full h-14 object-cover rounded-lg" />
                      <span className="text-[10px] font-bold block text-center mt-0.5">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Lien de la visite vidéo (Optionnel)</label>
                <input 
                  type="url" 
                  value={newVideoUrl}
                  onChange={e => setNewVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Description complète du séjour</label>
                <textarea 
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Décrivez les atouts naturels, l'ambiance, les activités proposées..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-3 rounded-xl font-bold transition shadow mt-3"
              >
                Publier cet hébergement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIDEO PREVIEW DIALOG */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
              <div>
                <h3 className="font-extrabold text-base">Visite Vidéo Teranga</h3>
                <p className="text-xs text-[#78716C]">{activeVideo.title}</p>
              </div>
              <button onClick={() => setActiveVideo(null)}><X className="w-5 h-5 text-[#78716C]" /></button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black h-56 flex items-center justify-center">
              <img src="/images/hero-senegal.jpg" alt="" className="w-full h-full object-cover opacity-60" />
              <PlayCircle className="w-16 h-16 text-[#F59E0B] absolute" />
              <span className="absolute bottom-3 text-xs text-white font-bold bg-black/60 px-3 py-1 rounded-full">
                Présentation immersive du séjour
              </span>
            </div>

            <p className="text-xs text-[#57534E]">
              Source vidéo : <a href={activeVideo.url} target="_blank" rel="noreferrer" className="text-[#0D9488] font-bold underline">{activeVideo.url}</a>
            </p>

            <button 
              onClick={() => setActiveVideo(null)}
              className="w-full bg-[#1C1917] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              Fermer la vidéo
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
              <h3 className="font-extrabold text-lg">Finaliser la réservation</h3>
              <button onClick={() => setBookingModalOpen(false)}><X className="w-5 h-5 text-[#78716C]" /></button>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF7F2] p-3 rounded-xl">
              <img src={selectedListing.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <h4 className="font-bold text-sm line-clamp-1">{selectedListing.title}</h4>
                <p className="text-xs text-[#C2410C] font-semibold">{selectedListing.priceXof.toLocaleString()} F / nuit</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Nombre de nuits</label>
                <div className="flex items-center border border-[#E7E5E4] rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setBookingNights(Math.max(1, bookingNights - 1))}
                    className="px-3 py-2 bg-[#FAF7F2] text-sm font-bold"
                  >-</button>
                  <span className="flex-1 text-center font-bold text-sm">{bookingNights}</span>
                  <button 
                    onClick={() => setBookingNights(bookingNights + 1)}
                    className="px-3 py-2 bg-[#FAF7F2] text-sm font-bold"
                  >+</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#78716C] block mb-1">Voyageurs</label>
                <div className="flex items-center border border-[#E7E5E4] rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setBookingGuests(Math.max(1, bookingGuests - 1))}
                    className="px-3 py-2 bg-[#FAF7F2] text-sm font-bold"
                  >-</button>
                  <span className="flex-1 text-center font-bold text-sm">{bookingGuests}</span>
                  <button 
                    onClick={() => setBookingGuests(Math.min(selectedListing.maxGuests, bookingGuests + 1))}
                    className="px-3 py-2 bg-[#FAF7F2] text-sm font-bold"
                  >+</button>
                </div>
              </div>
            </div>

            <div className="bg-[#CCFBF1]/40 p-4 rounded-xl border border-[#CCFBF1] space-y-1">
              <div className="flex justify-between text-sm">
                <span>Total séjour :</span>
                <span className="font-bold text-[#C2410C]">{(selectedListing.priceXof * bookingNights).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-xs text-[#065F46] font-medium">
                <span>Contribution solidaire ({selectedListing.ecoImpactPercent}%) :</span>
                <span>{((selectedListing.priceXof * bookingNights) * selectedListing.ecoImpactPercent / 100).toLocaleString()} F incluse</span>
              </div>
            </div>

            <button 
              onClick={handleConfirmBooking}
              className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-3.5 rounded-xl font-bold transition shadow-lg"
            >
              Confirmer la réservation Teranga
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#E7E5E4] py-8 text-center text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 MyStay Voyager Sénégal • Tourisme Solidaire & Teranga</p>
          <p className="text-[#0D9488] font-semibold">🇸🇳 Fait avec fierté pour valoriser les 14 régions du Sénégal</p>
        </div>
      </footer>
    </div>
  );
}
