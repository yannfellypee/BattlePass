import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

// Verifique se o caminho para o seu AuthContext está correto no projeto
import { AuthProvider } from "../src/context/AuthContext";

export { ErrorBoundary } from "expo-router";

// Configurações de navegação do BattlePass
export const unstable_settings = {
  // Apontamos para o caminho exato do ficheiro dentro da pasta auth
  initialRouteName: "auth/login", 
};

// Mantém o Splash Screen visível até as fontes e recursos carregarem
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'default', 
        }}
      >
        
        {/* Rota para a pasta auth (contém login e registo) */}
        <Stack.Screen name="auth" />

        {/* Grupo de ecrãs protegidos (Feed, Passaporte, etc.) */}
        <Stack.Screen name="(protected)" />

        {/* Ecrãs organizados por abas */}
        <Stack.Screen name="(tabs)" />
        
        {/* Rota dinâmica para detalhes de cada batalha */}
        <Stack.Screen name="battle/[id]" />

      </Stack>
    </ThemeProvider>
  );
}