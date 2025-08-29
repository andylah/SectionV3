import { MD3LightTheme as DefaultTheme } from 'react-native-paper'

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ActiveTint: '#FFFFFF',          // putih biar kontras dengan bg aktif
        InactiveTint: '#E0E0E0',        // abu terang
        ActiveBackground: '#4A148C',    // ungu gelap elegan
        InactiveBackground: '#7B1FA2',  // ungu lebih terang
        HeaderTint: '#FFFFFF',    // teks & ikon putih → kontras jelas
        HeaderTitleStyle: {
            fontWeight: 'bold',          // biar judul lebih profesional
        },
    },
}



