package com.example.ui.screens

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Cabin
import androidx.compose.material.icons.filled.Explore
import androidx.compose.material.icons.filled.Luggage
import androidx.compose.material.icons.filled.Place
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ui.components.AddListingDialog
import com.example.ui.components.AuthDialog
import com.example.ui.components.BookingDialog
import com.example.ui.components.VideoViewerDialog
import com.example.ui.theme.TerangaSand
import com.example.ui.theme.TerangaTerracotta
import com.example.viewmodel.MyStayViewModel
import com.example.viewmodel.NavigationTab

@Composable
fun MainAppScreen(
    viewModel: MyStayViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()

    // Detail Screen if a listing is currently selected
    if (uiState.selectedListing != null) {
        val listing = uiState.selectedListing!!
        ListingDetailScreen(
            listing = listing,
            isFavorite = uiState.favorites.contains(listing.id),
            onFavoriteToggle = { viewModel.toggleFavorite(listing.id) },
            onBack = { viewModel.selectListing(null) },
            onBookClick = { viewModel.openBookingModal(listing) },
            onWatchVideo = viewModel::openVideoViewer
        )

        // Booking Modal Dialog if triggered from detail
        if (uiState.isBookingModalOpen) {
            BookingDialog(
                listing = listing,
                nights = uiState.bookingNights,
                guests = uiState.bookingGuests,
                onNightsChange = viewModel::updateBookingNights,
                onGuestsChange = viewModel::updateBookingGuests,
                onConfirm = viewModel::confirmBooking,
                onDismiss = viewModel::closeBookingModal
            )
        }

        // Video modal if triggered from detail
        if (uiState.activeVideoUrl != null) {
            VideoViewerDialog(
                videoUrl = uiState.activeVideoUrl!!,
                title = uiState.activeVideoTitle ?: listing.title,
                onDismiss = viewModel::closeVideoViewer
            )
        }
        return
    }

    // Main scaffold with bottom navigation bar
    Scaffold(
        modifier = modifier.fillMaxSize(),
        bottomBar = {
            NavigationBar(
                modifier = Modifier
                    .windowInsetsPadding(WindowInsets.navigationBars)
                    .testTag("main_bottom_nav"),
                containerColor = MaterialTheme.colorScheme.surface,
                tonalElevation = 6.dp
            ) {
                val tabs = listOf(
                    Triple(NavigationTab.EXPLORE, Icons.Default.Explore, "Découvrir"),
                    Triple(NavigationTab.REGIONS, Icons.Default.Place, "Régions"),
                    Triple(NavigationTab.TRIPS, Icons.Default.Luggage, "Mes Séjours"),
                    Triple(NavigationTab.KOUMBA, Icons.Default.SupportAgent, "Koumba IA"),
                    Triple(NavigationTab.HOST, Icons.Default.Cabin, "Hôte")
                )

                tabs.forEach { (tab, icon, label) ->
                    val isSelected = uiState.currentTab == tab
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { viewModel.onTabSelected(tab) },
                        icon = {
                            Icon(
                                imageVector = icon,
                                contentDescription = label
                            )
                        },
                        label = {
                            Text(
                                text = label,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = TerangaTerracotta,
                            selectedTextColor = TerangaTerracotta,
                            indicatorColor = TerangaSand,
                            unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
                        ),
                        modifier = Modifier.testTag("nav_tab_${tab.name.lowercase()}")
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            AnimatedContent(
                targetState = uiState.currentTab,
                transitionSpec = { fadeIn() togetherWith fadeOut() },
                label = "tab_transition"
            ) { targetTab ->
                when (targetTab) {
                    NavigationTab.EXPLORE -> HomeScreen(viewModel = viewModel)
                    NavigationTab.REGIONS -> RegionsScreen(viewModel = viewModel)
                    NavigationTab.TRIPS -> TripsScreen(viewModel = viewModel)
                    NavigationTab.KOUMBA -> KoumbaChatScreen(viewModel = viewModel)
                    NavigationTab.HOST -> HostDashboardScreen(viewModel = viewModel)
                }
            }

            // Global Auth Dialog
            if (uiState.isAuthModalOpen) {
                AuthDialog(
                    initialMode = uiState.authMode,
                    errorMessage = uiState.authErrorMessage,
                    onLogin = { email, pass ->
                        viewModel.login(email, pass)
                    },
                    onRegister = { name, email, pass, phone, role, region ->
                        viewModel.register(name, email, pass, phone, role, region)
                    },
                    onDismiss = viewModel::closeAuthModal
                )
            }

            // Global Add Listing Dialog (with Photos, Videos & 14 Regions)
            if (uiState.isAddListingModalOpen) {
                AddListingDialog(
                    onDismiss = viewModel::closeAddListingModal,
                    onAddListing = { title, subtitle, region, location, category, price, desc, story, amenities, customUri, stockDrawable, video, eco, specs ->
                        viewModel.addNewListing(
                            title = title,
                            subtitle = subtitle,
                            region = region,
                            location = location,
                            category = category,
                            priceXof = price,
                            description = desc,
                            culturalStory = story,
                            amenities = amenities,
                            customImageUri = customUri,
                            selectedDrawableRes = stockDrawable,
                            videoUrl = video,
                            ecoCommitments = eco,
                            localSpecialties = specs
                        )
                    }
                )
            }

            // Global Video Viewer Dialog
            if (uiState.activeVideoUrl != null) {
                VideoViewerDialog(
                    videoUrl = uiState.activeVideoUrl!!,
                    title = uiState.activeVideoTitle ?: "Visite Vidéo",
                    onDismiss = viewModel::closeVideoViewer
                )
            }
        }
    }
}
