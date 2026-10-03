package com.example.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Login
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.model.AuthMode
import com.example.model.UserRole
import com.example.ui.components.ListingCard
import com.example.ui.theme.TerangaClay
import com.example.ui.theme.TerangaForest
import com.example.ui.theme.TerangaGold
import com.example.ui.theme.TerangaGoldLight
import com.example.ui.theme.TerangaGreen
import com.example.ui.theme.TerangaGreenLight
import com.example.ui.theme.TerangaSand
import com.example.ui.theme.TerangaTerracotta
import com.example.viewmodel.MyStayViewModel

@Composable
fun HomeScreen(
    viewModel: MyStayViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val filteredListings = viewModel.getFilteredListings()
    var isRegionDropdownOpen by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("home_screen_list"),
        contentPadding = PaddingValues(bottom = 90.dp)
    ) {
        // Hero Header with Brand, User account status & Search Banner
        item {
            HeroHeaderSection(
                searchQuery = uiState.searchQuery,
                onSearchChange = viewModel::onSearchQueryChange,
                currentUser = uiState.currentUser,
                onOpenAuth = { viewModel.openAuthModal(AuthMode.LOGIN) },
                onLogout = viewModel::logout
            )
        }

        // 14 REGIONS DROPDOWN SELECTOR (EXPLICIT USER REQUEST)
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 10.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.LocationOn,
                            contentDescription = null,
                            tint = TerangaClay,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Région du séjour (14 régions)",
                            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold)
                        )
                    }

                    if (uiState.selectedRegion != null) {
                        Text(
                            text = "Réinitialiser",
                            modifier = Modifier
                                .clickable { viewModel.onRegionSelected(null) }
                                .padding(4.dp),
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = TerangaTerracotta,
                                fontWeight = FontWeight.Bold
                            )
                        )
                    }
                }

                Spacer(modifier = Modifier.height(6.dp))

                // Interactive Dropdown Button
                Box(modifier = Modifier.fillMaxWidth()) {
                    OutlinedButton(
                        onClick = { isRegionDropdownOpen = true },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("home_region_dropdown_button"),
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.outlinedButtonColors(
                            containerColor = MaterialTheme.colorScheme.surface
                        )
                    ) {
                        Text(
                            text = uiState.selectedRegion ?: "Toutes les 14 régions du Sénégal",
                            modifier = Modifier.weight(1f),
                            textAlign = TextAlign.Start,
                            style = MaterialTheme.typography.bodyMedium.copy(
                                fontWeight = if (uiState.selectedRegion != null) FontWeight.Bold else FontWeight.Medium,
                                color = if (uiState.selectedRegion != null) TerangaTerracotta else MaterialTheme.colorScheme.onSurface
                            )
                        )
                        Icon(
                            imageVector = Icons.Default.ArrowDropDown,
                            contentDescription = "Dérouler les régions",
                            tint = TerangaClay
                        )
                    }

                    DropdownMenu(
                        expanded = isRegionDropdownOpen,
                        onDismissRequest = { isRegionDropdownOpen = false },
                        modifier = Modifier.fillMaxWidth(0.9f)
                    ) {
                        viewModel.all14Regions.forEach { regionName ->
                            DropdownMenuItem(
                                text = {
                                    Text(
                                        text = regionName,
                                        fontWeight = if (uiState.selectedRegion == regionName || (regionName == "Toutes les régions" && uiState.selectedRegion == null))
                                            FontWeight.Bold else FontWeight.Normal,
                                        color = if (uiState.selectedRegion == regionName || (regionName == "Toutes les régions" && uiState.selectedRegion == null))
                                            TerangaTerracotta else MaterialTheme.colorScheme.onSurface
                                    )
                                },
                                onClick = {
                                    viewModel.onRegionSelected(regionName)
                                    isRegionDropdownOpen = false
                                }
                            )
                        }
                    }
                }
            }
        }

        // Quick Region Filter Chips (Horizontal)
        item {
            Column(modifier = Modifier.padding(top = 4.dp)) {
                LazyRow(
                    contentPadding = PaddingValues(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(viewModel.quickRegionFilterNames) { regName ->
                        val isSelected = (regName == "Toutes les régions" && uiState.selectedRegion == null) ||
                                (regName == uiState.selectedRegion)

                        FilterChip(
                            selected = isSelected,
                            onClick = { viewModel.onRegionSelected(regName) },
                            label = { Text(regName) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = TerangaTerracotta,
                                selectedLabelColor = Color.White
                            ),
                            shape = RoundedCornerShape(12.dp)
                        )
                    }
                }
            }
        }

        // Category Filter Chips & Eco Toggle
        item {
            Column(modifier = Modifier.padding(top = 8.dp)) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp, vertical = 6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Types d'hébergements",
                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold)
                    )

                    // Eco-friendly toggle chip
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .clickable { viewModel.toggleEcoOnly() }
                            .testTag("eco_toggle_button"),
                        color = if (uiState.showEcoOnly) TerangaGreen else MaterialTheme.colorScheme.surfaceVariant
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Eco,
                                contentDescription = null,
                                tint = if (uiState.showEcoOnly) Color.White else TerangaForest,
                                modifier = Modifier.size(14.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "Fort Impact",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = if (uiState.showEcoOnly) Color.White else TerangaForest
                                )
                            )
                        }
                    }
                }

                LazyRow(
                    contentPadding = PaddingValues(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(viewModel.categories) { catName ->
                        val isSelected = (catName == "Tous" && uiState.selectedCategory == null) ||
                                (catName == uiState.selectedCategory)

                        FilterChip(
                            selected = isSelected,
                            onClick = { viewModel.onCategorySelected(catName) },
                            label = { Text(catName) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = TerangaClay,
                                selectedLabelColor = Color.White
                            ),
                            shape = RoundedCornerShape(12.dp)
                        )
                    }
                }
            }
        }

        // Host quick action if logged in as Host
        if (uiState.currentUser?.role == UserRole.HOST) {
            item {
                Surface(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    shape = RoundedCornerShape(16.dp),
                    color = TerangaGreenLight
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "Vous êtes connecté comme Hôte",
                                style = MaterialTheme.typography.labelLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = TerangaForest
                                )
                            )
                            Text(
                                text = "Publiez vos séjours avec photos et vidéos",
                                style = MaterialTheme.typography.bodySmall,
                                color = TerangaForest
                            )
                        }
                        Button(
                            onClick = viewModel::openAddListingModal,
                            colors = ButtonDefaults.buttonColors(containerColor = TerangaGreen),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Ajouter", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold))
                        }
                    }
                }
            }
        }

        // List Header with count
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(start = 20.dp, end = 20.dp, top = 14.dp, bottom = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = if (uiState.selectedRegion != null)
                        "Séjours à ${uiState.selectedRegion}"
                    else
                        "Séjours Teranga disponibles",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onBackground
                )

                Text(
                    text = "${filteredListings.size} hébergement${if (filteredListings.size > 1) "s" else ""}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // Empty state if no listing match
        if (filteredListings.isEmpty()) {
            item {
                Surface(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp),
                    shape = RoundedCornerShape(16.dp),
                    color = MaterialTheme.colorScheme.surfaceVariant
                ) {
                    Column(
                        modifier = Modifier.padding(28.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Icon(
                            imageVector = Icons.Default.Spa,
                            contentDescription = null,
                            tint = TerangaTerracotta,
                            modifier = Modifier.size(48.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = "Aucun séjour ne correspond à vos filtres",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Essayez de sélectionner une autre région ou réinitialisez les critères.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        OutlinedButton(
                            onClick = {
                                viewModel.onRegionSelected(null)
                                viewModel.onCategorySelected(null)
                            },
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Voir tous les séjours")
                        }
                    }
                }
            }
        } else {
            // Listings Items
            items(filteredListings, key = { it.id }) { listing ->
                Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                    ListingCard(
                        listing = listing,
                        isFavorite = uiState.favorites.contains(listing.id),
                        onFavoriteToggle = { viewModel.toggleFavorite(listing.id) },
                        onClick = { viewModel.selectListing(listing) }
                    )
                }
            }
        }
    }
}

@Composable
private fun HeroHeaderSection(
    searchQuery: String,
    onSearchChange: (String) -> Unit,
    currentUser: com.example.model.User?,
    onOpenAuth: () -> Unit,
    onLogout: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(290.dp)
    ) {
        // Senegal Hero Image
        Image(
            painter = painterResource(id = R.drawable.img_senegal_hero),
            contentDescription = "Sénégal Pirogues & Océan",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )

        // Gradient scrim for contrast
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color.Black.copy(alpha = 0.5f),
                            Color.Black.copy(alpha = 0.8f)
                        )
                    )
                )
        )

        // Content over Hero
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // App Branding & User Profile Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(TerangaGold),
                        contentAlignment = Alignment.Center
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.img_app_icon),
                            contentDescription = null,
                            modifier = Modifier
                                .size(34.dp)
                                .clip(CircleShape),
                            contentScale = ContentScale.Crop
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "MyStay Sénégal",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.ExtraBold,
                                color = Color.White
                            )
                        )
                        Text(
                            text = "Voyages Authentiques & Teranga",
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = TerangaGoldLight
                            )
                        )
                    }
                }

                // Auth Profile Button / Indicator
                if (currentUser != null) {
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = Color.Black.copy(alpha = 0.55f),
                        modifier = Modifier.clickable { onLogout() }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(20.dp)
                                    .clip(CircleShape)
                                    .background(TerangaGold),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = currentUser.avatarInitials,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.Black
                                )
                            }
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = currentUser.name.split(" ").firstOrNull() ?: "",
                                color = Color.White,
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold)
                            )
                        }
                    }
                } else {
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = TerangaTerracotta,
                        modifier = Modifier.clickable { onOpenAuth() }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Login,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(14.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "Connexion",
                                color = Color.White,
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold)
                            )
                        }
                    }
                }
            }

            // Headline & Welcome
            Column {
                Text(
                    text = "Dalal Ak Jamm !",
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.ExtraBold,
                        color = TerangaGold
                    )
                )
                Text(
                    text = "Trouvez votre éco-lodge dans les 14 régions du Sénégal.",
                    style = MaterialTheme.typography.bodyMedium.copy(
                        color = Color.White.copy(alpha = 0.95f)
                    )
                )

                Spacer(modifier = Modifier.height(14.dp))

                // Search Bar Input
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = onSearchChange,
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("search_input_field"),
                    placeholder = {
                        Text(
                            text = "Rechercher par village, bolong, île...",
                            color = Color.LightGray,
                            fontSize = 14.sp
                        )
                    },
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.Search,
                            contentDescription = "Recherche",
                            tint = TerangaGold
                        )
                    },
                    trailingIcon = {
                        if (searchQuery.isNotEmpty()) {
                            IconButton(onClick = { onSearchChange("") }) {
                                Icon(
                                    imageVector = Icons.Default.Clear,
                                    contentDescription = "Effacer",
                                    tint = Color.White
                                )
                            }
                        }
                    },
                    singleLine = true,
                    shape = RoundedCornerShape(16.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedContainerColor = Color.Black.copy(alpha = 0.6f),
                        unfocusedContainerColor = Color.Black.copy(alpha = 0.5f),
                        focusedBorderColor = TerangaGold,
                        unfocusedBorderColor = Color.White.copy(alpha = 0.4f),
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White
                    )
                )
            }
        }
    }
}
