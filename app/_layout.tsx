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

// IMPORTANTE: Verifique se o caminho do seu AuthContext está correto
import { AuthProvider } from "../src/context/AuthContext";

export { ErrorBoundary } from "expo-router";

// Configurações iniciais
export const unstable_settings = {
  // Se o usuário não estiver logado, ele será jogado para o (auth) pelo AuthLayout
  initialRouteName: "(auth)", 
};

// Impede que o Splash suma antes da hora
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
          // Garante que todas as transições sejam padrão (da direita para esquerda)
          animation: 'default', 
        }}
      >
        
        {/* Grupo de Autenticação (Onboarding/Login/Register) */}
        <Stack.Screen name="(auth)" />

        {/* Grupo Protegido (Audience, MC, Organizer) */}
        <Stack.Screen name="(protected)" />

        {/* REMOVIDO: <Stack.Screen name="modal" ... />
           Agora, qualquer tela nova que você criar entrará no fluxo normal,
           ocupando 100% da visão do usuário.
        */}
      </Stack>
    </ThemeProvider>
  );
}