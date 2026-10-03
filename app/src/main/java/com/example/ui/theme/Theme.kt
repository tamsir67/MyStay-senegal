package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val LightColorScheme = lightColorScheme(
    primary = TerangaTerracotta,
    onPrimary = TerangaCardBg,
    primaryContainer = TerangaGoldLight,
    onPrimaryContainer = TerangaRust,
    secondary = TerangaGreen,
    onSecondary = TerangaCardBg,
    secondaryContainer = TerangaGreenLight,
    onSecondaryContainer = TerangaForest,
    tertiary = TerangaGold,
    onTertiary = TerangaTextPrimary,
    background = TerangaWarmBg,
    onBackground = TerangaTextPrimary,
    surface = TerangaCardBg,
    onSurface = TerangaTextPrimary,
    surfaceVariant = TerangaCardSubtle,
    onSurfaceVariant = TerangaTextSecondary,
    outline = TerangaBorder
)

private val DarkColorScheme = darkColorScheme(
    primary = TerangaGold,
    onPrimary = TerangaNightBg,
    primaryContainer = TerangaTerracotta,
    onPrimaryContainer = TerangaGoldLight,
    secondary = TerangaGreen,
    onSecondary = TerangaNightBg,
    secondaryContainer = TerangaForest,
    onSecondaryContainer = TerangaGreenLight,
    tertiary = TerangaClay,
    onTertiary = TerangaNightTextPrimary,
    background = TerangaNightBg,
    onBackground = TerangaNightTextPrimary,
    surface = TerangaNightSurface,
    onSurface = TerangaNightTextPrimary,
    surfaceVariant = TerangaNightCard,
    onSurfaceVariant = TerangaNightTextSecondary,
    outline = TerangaNightBorder
)

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // Keep Senegalese identity consistent
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
