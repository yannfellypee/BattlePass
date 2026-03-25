import React, { useContext, useEffect } from 'react';
import { Stack, useSegments, useRouter } from 'expo-router'; // Trocamos Redirect por useRouter
import { ActivityIndicator, View, StyleSheet, Modal, Text } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProtectedLayout() {
  // Ajustado para usar 'loading' e 'user' que seu contexto fornece
  const { user, loading: isLoading, isLoggingOut } = useContext(AuthContext);
  const segments = useSegments() as string[];
  const router = useRouter();

  // 1. PROTEÇÃO DE ROTA VIA EFFECT (Mais estável que o componente Redirect)
  useEffect(() => {
    if (isLoading || isLoggingOut) return;

    // Se não há usuário, manda para o login
    if (!user) {
      router.replace('/auth/login');
      return;
    }

    // Alinhando com o 'role' que salvamos no metadata
    const userRole = user?.user_metadata?.role;

    // Verifica permissão de pasta
    if (segments.includes('mc') && userRole !== 'mc') {
      router.replace('/audience'); // Fallback se o MC tentar entrar onde não deve
    }
    if (segments.includes('organizer') && userRole !== 'organizer') {
      router.replace('/audience');
    }
  }, [user, isLoading, segments, isLoggingOut]);

  // 2. TELA DE CARREGAMENTO
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  // Se não tem usuário, não renderiza nada (o useEffect vai redirecionar)
  if (!user && !isLoggingOut) return null;

  return (
    <View style={styles.container}>
      
      {/* OVERLAY DE LOGOUT */}
      <Modal visible={isLoggingOut} transparent animationType="fade">
        <View style={styles.logoutOverlay}>
          <Ionicons name="mic-off" size={80} color="#39FF14" />
          <Text style={styles.logoutTitle}>Saindo da Roda...</Text>
          <Text style={styles.logoutSubtitle}>Espero te ver de novo em breve! 🎤</Text>
          <ActivityIndicator size="large" color="#39FF14" style={{ marginTop: 30 }} />
        </View>
      </Modal>

      <Stack 
        screenOptions={{ 
          headerShown: false, 
          gestureEnabled: false, 
          contentStyle: { backgroundColor: '#0D0D0D' } 
        }} 
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}

// Mantenha seus styles como estão...
const styles = StyleSheet.create({
  loadingContainer: { flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  logoutOverlay: { flex: 1, backgroundColor: 'rgba(13, 13, 13, 0.98)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoutTitle: { color: '#FFF', fontSize: 26, fontWeight: '900', marginTop: 20, fontStyle: 'italic', textAlign: 'center' },
  logoutSubtitle: { color: '#39FF14', fontSize: 16, textAlign: 'center', marginTop: 10, fontWeight: '600' }
});