package com.example

import com.example.model.UserRole
import com.example.viewmodel.MyStayViewModel
import com.example.viewmodel.NavigationTab
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class MyStayViewModelTest {

    private lateinit var viewModel: MyStayViewModel

    @Before
    fun setUp() {
        viewModel = MyStayViewModel()
    }

    @Test
    fun testInitialState() {
        val state = viewModel.uiState.value
        assertEquals(NavigationTab.EXPLORE, state.currentTab)
        assertTrue(viewModel.listings.value.isNotEmpty())
        assertTrue(viewModel.regions.isNotEmpty())
        assertEquals(15, viewModel.all14Regions.size) // "Toutes les régions" + 14 regions
    }

    @Test
    fun testFilteringBy14Regions() {
        viewModel.onRegionSelected("Fatick")
        val filtered = viewModel.getFilteredListings()
        assertTrue(filtered.isNotEmpty())
        assertTrue(filtered.all { it.region == "Fatick" || it.location.contains("Fatick") })

        viewModel.onRegionSelected("Dakar")
        val dakarFiltered = viewModel.getFilteredListings()
        assertTrue(dakarFiltered.isNotEmpty())
        assertTrue(dakarFiltered.all { it.region == "Dakar" || it.location.contains("Dakar") })
    }

    @Test
    fun testFilteringByCategory() {
        viewModel.onCategorySelected("Maison d'hôte")
        val filtered = viewModel.getFilteredListings()
        assertTrue(filtered.isNotEmpty())
        assertTrue(filtered.all { it.category == "Maison d'hôte" })
    }

    @Test
    fun testToggleFavorite() {
        val listingId = "listing_casamance"
        assertFalse(viewModel.uiState.value.favorites.contains(listingId))
        viewModel.toggleFavorite(listingId)
        assertTrue(viewModel.uiState.value.favorites.contains(listingId))
        viewModel.toggleFavorite(listingId)
        assertFalse(viewModel.uiState.value.favorites.contains(listingId))
    }

    @Test
    fun testBookingFlow() {
        val initialBookingCount = viewModel.uiState.value.bookings.size
        val listing = viewModel.listings.value.first()
        viewModel.openBookingModal(listing)
        assertTrue(viewModel.uiState.value.isBookingModalOpen)

        viewModel.updateBookingNights(4)
        assertEquals(4, viewModel.uiState.value.bookingNights)

        viewModel.confirmBooking()
        assertEquals(initialBookingCount + 1, viewModel.uiState.value.bookings.size)
        assertEquals(NavigationTab.TRIPS, viewModel.uiState.value.currentTab)
        assertFalse(viewModel.uiState.value.isBookingModalOpen)
    }

    @Test
    fun testAuthLoginAndRegister() {
        // Test Register
        val registerSuccess = viewModel.register(
            name = "Khadija Ba",
            email = "khadija.ba@teranga.sn",
            password = "secretpassword",
            phone = "+221 77 999 88 77",
            role = UserRole.HOST,
            region = "Saint-Louis"
        )
        assertTrue(registerSuccess)
        assertNotNull(viewModel.uiState.value.currentUser)
        assertEquals("Khadija Ba", viewModel.uiState.value.currentUser?.name)
        assertEquals(UserRole.HOST, viewModel.uiState.value.currentUser?.role)

        // Test Logout
        viewModel.logout()
        assertNull(viewModel.uiState.value.currentUser)

        // Test Login
        val loginSuccess = viewModel.login("amadou.diallo@teranga.sn", "pass123")
        assertTrue(loginSuccess)
        assertNotNull(viewModel.uiState.value.currentUser)
        assertEquals("Amadou Diallo", viewModel.uiState.value.currentUser?.name)
    }

    @Test
    fun testHostAddNewListingWithVideo() {
        val initialCount = viewModel.listings.value.size
        viewModel.addNewListing(
            title = "Campement Fluvial de Matam",
            subtitle = "Bungalows sur la rive du fleuve Sénégal",
            region = "Matam",
            location = "Matam, Fouta Toro",
            category = "Campement villageois",
            priceXof = 32000,
            description = "Un cadre paisible et enchanteur.",
            culturalStory = "Accueil chaleureux en pays Haalpulaar.",
            amenities = listOf("Pirogue", "Énergie solaire"),
            customImageUri = null,
            selectedDrawableRes = R.drawable.img_lodge_saloum,
            videoUrl = "https://www.youtube.com/watch?v=matam_teranga",
            ecoCommitments = emptyList(),
            localSpecialties = listOf("Thiéboudienne rouge")
        )

        assertEquals(initialCount + 1, viewModel.listings.value.size)
        val added = viewModel.listings.value.first()
        assertEquals("Campement Fluvial de Matam", added.title)
        assertEquals("Matam", added.region)
        assertEquals("https://www.youtube.com/watch?v=matam_teranga", added.videoUrl)
    }

    @Test
    fun testKoumbaChat() {
        val initialMsgCount = viewModel.uiState.value.chatMessages.size
        viewModel.sendUserMessage("Comment dire bonjour en wolof ?")
        assertEquals(initialMsgCount + 2, viewModel.uiState.value.chatMessages.size)
        val lastMsg = viewModel.uiState.value.chatMessages.last()
        assertFalse(lastMsg.isFromUser)
        assertTrue(lastMsg.text.contains("Salaamaalekum") || lastMsg.text.contains("Nanga def"))
    }

    @Test
    fun testToggleWebDisplayMode() {
        assertTrue(viewModel.uiState.value.isWebDisplayMode)
        viewModel.toggleWebDisplayMode()
        assertFalse(viewModel.uiState.value.isWebDisplayMode)
        viewModel.toggleWebDisplayMode()
        assertTrue(viewModel.uiState.value.isWebDisplayMode)
    }
}
