package com.example.viewmodel

import androidx.lifecycle.ViewModel
import com.example.R
import com.example.data.SenegalData
import com.example.model.AuthMode
import com.example.model.Booking
import com.example.model.BookingStatus
import com.example.model.ChatMessage
import com.example.model.EcoCommitment
import com.example.model.Host
import com.example.model.Listing
import com.example.model.RegionInfo
import com.example.model.User
import com.example.model.UserRole
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.UUID

enum class NavigationTab(val title: String) {
    EXPLORE("Découvrir"),
    REGIONS("Régions"),
    TRIPS("Mes Séjours"),
    KOUMBA("Guide Koumba"),
    HOST("Espace Hôte")
}

data class UiState(
    val currentTab: NavigationTab = NavigationTab.EXPLORE,
    val searchQuery: String = "",
    val selectedRegion: String? = null,
    val selectedCategory: String? = null,
    val showEcoOnly: Boolean = false,
    val selectedListing: Listing? = null,
    val favorites: Set<String> = setOf("listing_saloum", "listing_goree"),
    val bookings: List<Booking> = SenegalData.sampleBookings,
    val chatMessages: List<ChatMessage> = SenegalData.initialChatMessages,
    val isBookingModalOpen: Boolean = false,
    val bookingNights: Int = 3,
    val bookingGuests: Int = 2,
    val bookingSuccessNotice: String? = null,
    
    // Auth State
    val currentUser: User? = SenegalData.sampleUsers[0], // Default logged-in as Amadou Diallo
    val isAuthModalOpen: Boolean = false,
    val authMode: AuthMode = AuthMode.LOGIN,
    val authErrorMessage: String? = null,
    
    // Host Add Listing Modal State
    val isAddListingModalOpen: Boolean = false,
    
    // Video preview dialog state
    val activeVideoUrl: String? = null,
    val activeVideoTitle: String? = null,

    // Web Platform display mode (Enabled by default as requested to test product immediately)
    val isWebDisplayMode: Boolean = true
)

class MyStayViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    private val _listings = MutableStateFlow<List<Listing>>(SenegalData.listings)
    val listings: StateFlow<List<Listing>> = _listings.asStateFlow()

    val regions: List<RegionInfo> = SenegalData.regions

    val categories: List<String> = listOf(
        "Tous",
        "Éco-lodge",
        "Maison d'hôte",
        "Campement villageois",
        "Villa Lagune & Mer",
        "Tente Nomade"
    )

    // All 14 official regions of Senegal for the dropdown selector
    val all14Regions: List<String> = listOf("Toutes les régions") + SenegalData.all14SenegalRegions

    val quickRegionFilterNames: List<String> = listOf(
        "Toutes les régions",
        "Fatick",
        "Dakar",
        "Ziguinchor",
        "Thiès",
        "Saint-Louis",
        "Louga",
        "Kédougou"
    )

    fun onTabSelected(tab: NavigationTab) {
        _uiState.value = _uiState.value.copy(currentTab = tab)
    }

    fun onSearchQueryChange(query: String) {
        _uiState.value = _uiState.value.copy(searchQuery = query)
    }

    fun onCategorySelected(category: String?) {
        val cat = if (category == "Tous") null else category
        _uiState.value = _uiState.value.copy(selectedCategory = cat)
    }

    fun onRegionSelected(region: String?) {
        val reg = if (region == "Toutes les régions" || region == "Toutes") null else region
        _uiState.value = _uiState.value.copy(selectedRegion = reg)
    }

    fun toggleEcoOnly() {
        _uiState.value = _uiState.value.copy(showEcoOnly = !_uiState.value.showEcoOnly)
    }

    fun toggleFavorite(listingId: String) {
        val currentFavs = _uiState.value.favorites.toMutableSet()
        if (currentFavs.contains(listingId)) {
            currentFavs.remove(listingId)
        } else {
            currentFavs.add(listingId)
        }
        _uiState.value = _uiState.value.copy(favorites = currentFavs)
    }

    fun selectListing(listing: Listing?) {
        _uiState.value = _uiState.value.copy(selectedListing = listing)
    }

    fun toggleWebDisplayMode() {
        _uiState.value = _uiState.value.copy(isWebDisplayMode = !_uiState.value.isWebDisplayMode)
    }

    // Video viewer modal
    fun openVideoViewer(url: String, title: String) {
        _uiState.value = _uiState.value.copy(
            activeVideoUrl = url,
            activeVideoTitle = title
        )
    }

    fun closeVideoViewer() {
        _uiState.value = _uiState.value.copy(
            activeVideoUrl = null,
            activeVideoTitle = null
        )
    }

    // Booking modal
    fun openBookingModal(listing: Listing) {
        _uiState.value = _uiState.value.copy(
            selectedListing = listing,
            isBookingModalOpen = true,
            bookingNights = 3,
            bookingGuests = 2
        )
    }

    fun closeBookingModal() {
        _uiState.value = _uiState.value.copy(isBookingModalOpen = false)
    }

    fun updateBookingNights(nights: Int) {
        if (nights in 1..30) {
            _uiState.value = _uiState.value.copy(bookingNights = nights)
        }
    }

    fun updateBookingGuests(guests: Int) {
        val max = _uiState.value.selectedListing?.maxGuests ?: 4
        if (guests in 1..max) {
            _uiState.value = _uiState.value.copy(bookingGuests = guests)
        }
    }

    fun confirmBooking() {
        val listing = _uiState.value.selectedListing ?: return
        val nights = _uiState.value.bookingNights
        val guests = _uiState.value.bookingGuests
        val totalPrice = listing.priceXofPerNight * nights
        val ecoContrib = (totalPrice * (listing.ecoImpactPercent.toDouble() / 100.0)).toInt()

        val sdf = SimpleDateFormat("dd MMM yyyy", Locale.FRENCH)
        val today = Date()
        val checkIn = sdf.format(Date(today.time + 1000L * 60 * 60 * 24 * 7))
        val checkOut = sdf.format(Date(today.time + 1000L * 60 * 60 * 24 * (7 + nights)))

        val newBooking = Booking(
            id = "bk_" + UUID.randomUUID().toString().take(8),
            listingId = listing.id,
            listingTitle = listing.title,
            listingLocation = listing.location,
            checkInDate = checkIn,
            checkOutDate = checkOut,
            nights = nights,
            guestsCount = guests,
            priceXofTotal = totalPrice,
            status = BookingStatus.CONFIRMED,
            bookingReference = "TERANGA-" + (1000..9999).random(),
            imageDrawableRes = listing.imageDrawableRes,
            customImageUri = listing.customImageUri,
            ecoContributionXof = ecoContrib
        )

        _uiState.value = _uiState.value.copy(
            bookings = listOf(newBooking) + _uiState.value.bookings,
            isBookingModalOpen = false,
            selectedListing = null,
            currentTab = NavigationTab.TRIPS,
            bookingSuccessNotice = "Séjour réservé avec succès ! Merci de soutenir la communauté locale."
        )
    }

    fun dismissSuccessNotice() {
        _uiState.value = _uiState.value.copy(bookingSuccessNotice = null)
    }

    // --- Authentication methods ---
    fun openAuthModal(mode: AuthMode = AuthMode.LOGIN) {
        _uiState.value = _uiState.value.copy(
            isAuthModalOpen = true,
            authMode = mode,
            authErrorMessage = null
        )
    }

    fun closeAuthModal() {
        _uiState.value = _uiState.value.copy(isAuthModalOpen = false, authErrorMessage = null)
    }

    fun toggleAuthMode() {
        val nextMode = if (_uiState.value.authMode == AuthMode.LOGIN) AuthMode.REGISTER else AuthMode.LOGIN
        _uiState.value = _uiState.value.copy(authMode = nextMode, authErrorMessage = null)
    }

    fun login(email: String, password: String): Boolean {
        if (email.isBlank() || password.isBlank()) {
            _uiState.value = _uiState.value.copy(authErrorMessage = "Veuillez renseigner votre email et mot de passe.")
            return false
        }

        // Check if sample user or create user session
        val matchedUser = SenegalData.sampleUsers.find { it.email.equals(email.trim(), ignoreCase = true) }
            ?: User(
                id = "u_" + UUID.randomUUID().toString().take(6),
                name = email.substringBefore("@").replace(".", " ").capitalizeWords(),
                email = email.trim(),
                role = if ("hote" in email.lowercase() || "host" in email.lowercase()) UserRole.HOST else UserRole.TRAVELER,
                avatarInitials = email.take(2).uppercase(),
                region = "Dakar"
            )

        _uiState.value = _uiState.value.copy(
            currentUser = matchedUser,
            isAuthModalOpen = false,
            authErrorMessage = null,
            bookingSuccessNotice = "Bienvenue ${matchedUser.name} ! Dalal Ak Jamm."
        )
        return true
    }

    fun register(name: String, email: String, password: String, phone: String, role: UserRole, region: String): Boolean {
        if (name.isBlank() || email.isBlank() || password.isBlank()) {
            _uiState.value = _uiState.value.copy(authErrorMessage = "Veuillez renseigner tous les champs obligatoires.")
            return false
        }

        val initials = name.split(" ")
            .filter { it.isNotBlank() }
            .map { it.first().uppercaseChar() }
            .take(2)
            .joinToString("")
            .ifEmpty { "SN" }

        val newUser = User(
            id = "u_" + UUID.randomUUID().toString().take(6),
            name = name.trim(),
            email = email.trim(),
            phone = phone.trim(),
            role = role,
            avatarInitials = initials,
            region = region
        )

        _uiState.value = _uiState.value.copy(
            currentUser = newUser,
            isAuthModalOpen = false,
            authErrorMessage = null,
            bookingSuccessNotice = "Compte créé avec succès ! Bienvenue dans la famille Teranga."
        )
        return true
    }

    fun logout() {
        _uiState.value = _uiState.value.copy(
            currentUser = null,
            bookingSuccessNotice = "Vous avez été déconnecté."
        )
    }

    fun switchUserRole(role: UserRole) {
        val user = _uiState.value.currentUser ?: return
        _uiState.value = _uiState.value.copy(currentUser = user.copy(role = role))
    }

    // --- Host Add Listing methods ---
    fun openAddListingModal() {
        _uiState.value = _uiState.value.copy(isAddListingModalOpen = true)
    }

    fun closeAddListingModal() {
        _uiState.value = _uiState.value.copy(isAddListingModalOpen = false)
    }

    fun addNewListing(
        title: String,
        subtitle: String,
        region: String,
        location: String,
        category: String,
        priceXof: Int,
        description: String,
        culturalStory: String,
        amenities: List<String>,
        customImageUri: String?,
        selectedDrawableRes: Int,
        videoUrl: String?,
        ecoCommitments: List<EcoCommitment>,
        localSpecialties: List<String>
    ) {
        val currentHost = _uiState.value.currentUser?.let { user ->
            Host(
                id = "host_" + user.id,
                name = user.name,
                role = "Hôte Partenaire Teranga • " + user.region,
                avatarInitials = user.avatarInitials,
                rating = 5.0,
                reviewsCount = 1,
                bio = "Hôte passionné par l'accueil authentique et l'écotourisme au Sénégal."
            )
        } ?: SenegalData.hosts[0]

        val newListing = Listing(
            id = "custom_listing_" + UUID.randomUUID().toString().take(8),
            title = title,
            subtitle = subtitle,
            region = region,
            location = location,
            priceXofPerNight = priceXof,
            rating = 5.0,
            reviewsCount = 1,
            category = category,
            imageDrawableRes = selectedDrawableRes,
            customImageUri = customImageUri,
            videoUrl = videoUrl?.ifBlank { null },
            description = description,
            culturalStory = culturalStory,
            amenities = amenities,
            host = currentHost,
            ecoCommitments = ecoCommitments.ifEmpty {
                listOf(
                    EcoCommitment("Engagement Teranga", "Soutien direct aux familles et artisans du village"),
                    EcoCommitment("Respect Environnemental", "Gestion écologique des déchets et des ressources")
                )
            },
            ecoImpactPercent = 10,
            maxGuests = 4,
            bedrooms = 2,
            bathrooms = 1,
            isFeatured = true,
            localSpecialties = localSpecialties
        )

        _listings.value = listOf(newListing) + _listings.value

        _uiState.value = _uiState.value.copy(
            isAddListingModalOpen = false,
            currentTab = NavigationTab.EXPLORE,
            bookingSuccessNotice = "Votre séjour '${newListing.title}' a été publié avec succès !"
        )
    }

    // --- Chat logic ---
    fun sendUserMessage(text: String) {
        if (text.isBlank()) return
        val userMsg = ChatMessage(
            id = "user_" + System.currentTimeMillis(),
            text = text,
            isFromUser = true,
            timestamp = "Maintenant"
        )
        val updatedList = _uiState.value.chatMessages + userMsg
        _uiState.value = _uiState.value.copy(chatMessages = updatedList)

        val lower = text.lowercase(Locale.ROOT)
        val replyText = when {
            "wolof" in lower || "langue" in lower || "saluer" in lower || "parler" in lower -> {
                SenegalData.koumbaResponses["wolof"]!!
            }
            "manger" in lower || "plat" in lower || "cuisine" in lower || "thieb" in lower || "yassa" in lower || "nourriture" in lower -> {
                SenegalData.koumbaResponses["manger"]!!
            }
            "saison" in lower || "quand" in lower || "meteo" in lower || "climat" in lower || "pluie" in lower || "temps" in lower -> {
                SenegalData.koumbaResponses["saison"]!!
            }
            "teranga" in lower || "culture" in lower || "coutume" in lower || "hospitalit" in lower -> {
                SenegalData.koumbaResponses["teranga"]!!
            }
            "itineraire" in lower || "jour" in lower || "programme" in lower || "conseil" in lower -> {
                SenegalData.koumbaResponses["itineraire"]!!
            }
            else -> {
                "Jërëjëf pour votre question ! Pour explorer le Sénégal en toute authenticité, je vous conseille de privilégier les éco-lodges villageois et les rencontres avec les habitants. N'hésitez pas à demander conseil à votre hôte Teranga sur place pour vivre une expérience inoubliable !"
            }
        }

        val botMsg = ChatMessage(
            id = "koumba_" + System.currentTimeMillis(),
            text = replyText,
            isFromUser = false,
            timestamp = "À l'instant",
            quickReplies = listOf("Itinéraire 7 jours", "Expressions wolof", "Plats incontournables")
        )

        _uiState.value = _uiState.value.copy(chatMessages = updatedList + botMsg)
    }

    fun getFilteredListings(): List<Listing> {
        val state = _uiState.value
        return _listings.value.filter { listing ->
            val matchesSearch = state.searchQuery.isBlank() ||
                    listing.title.contains(state.searchQuery, ignoreCase = true) ||
                    listing.location.contains(state.searchQuery, ignoreCase = true) ||
                    listing.region.contains(state.searchQuery, ignoreCase = true)

            val matchesRegion = state.selectedRegion == null ||
                    listing.region.equals(state.selectedRegion, ignoreCase = true) ||
                    listing.location.contains(state.selectedRegion, ignoreCase = true)

            val matchesCategory = state.selectedCategory == null ||
                    listing.category.equals(state.selectedCategory, ignoreCase = true)

            val matchesEco = !state.showEcoOnly || listing.ecoImpactPercent >= 10

            matchesSearch && matchesRegion && matchesCategory && matchesEco
        }
    }

    private fun String.capitalizeWords(): String =
        split(" ").joinToString(" ") { word -> word.replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.ROOT) else it.toString() } }
}
