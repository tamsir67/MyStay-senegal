package com.example.model

enum class UserRole(val label: String) {
    TRAVELER("Voyageur"),
    HOST("Hôte Teranga")
}

data class User(
    val id: String,
    val name: String,
    val email: String,
    val phone: String = "",
    val role: UserRole = UserRole.TRAVELER,
    val avatarInitials: String = "SN",
    val region: String = "Dakar"
)

enum class AuthMode {
    LOGIN,
    REGISTER
}

data class Host(
    val id: String,
    val name: String,
    val role: String,
    val avatarInitials: String,
    val rating: Double,
    val reviewsCount: Int,
    val isVerified: Boolean = true,
    val responseTime: String = "Moins d'une heure",
    val bio: String
)

data class EcoCommitment(
    val title: String,
    val description: String,
    val iconName: String = "eco"
)

data class Listing(
    val id: String,
    val title: String,
    val subtitle: String,
    val region: String,
    val location: String,
    val priceXofPerNight: Int,
    val rating: Double,
    val reviewsCount: Int,
    val category: String,
    val imageDrawableRes: Int,
    val customImageUri: String? = null,
    val videoUrl: String? = null,
    val description: String,
    val culturalStory: String,
    val amenities: List<String>,
    val host: Host,
    val ecoCommitments: List<EcoCommitment>,
    val ecoImpactPercent: Int = 8,
    val maxGuests: Int = 4,
    val bedrooms: Int = 2,
    val bathrooms: Int = 1,
    val isFeatured: Boolean = false,
    val localSpecialties: List<String> = emptyList()
) {
    val priceEurPerNight: Int
        get() = (priceXofPerNight / 655.957).toInt()
}

data class RegionInfo(
    val id: String,
    val name: String,
    val tagline: String,
    val description: String,
    val imageDrawableRes: Int,
    val bestSeason: String,
    val highlights: List<String>,
    val listingsCount: Int
)

enum class BookingStatus(val label: String) {
    CONFIRMED("Confirmé"),
    PENDING("En attente de l'hôte"),
    COMPLETED("Séjour terminé")
}

data class Booking(
    val id: String,
    val listingId: String,
    val listingTitle: String,
    val listingLocation: String,
    val checkInDate: String,
    val checkOutDate: String,
    val nights: Int,
    val guestsCount: Int,
    val priceXofTotal: Int,
    val status: BookingStatus,
    val bookingReference: String,
    val imageDrawableRes: Int,
    val customImageUri: String? = null,
    val ecoContributionXof: Int
) {
    val priceEurTotal: Int
        get() = (priceXofTotal / 655.957).toInt()
}

data class ChatMessage(
    val id: String,
    val text: String,
    val isFromUser: Boolean,
    val timestamp: String,
    val quickReplies: List<String> = emptyList()
)
