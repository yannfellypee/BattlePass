import React, { useContext } from 'react';
import { Redirect, Stack, useSegments } from 'expo-router';
import { ActivityIndicator, View, StyleSheet, Modal, Text } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProtectedLayout() {
  const { isAuthenticated, user, isLoading, isLoggingOut } = useContext(AuthContext);
  
  // CORREÇÃO DO ERRO TS(2345): Forçamos o tipo para string[]
  const segments = useSegments() as string[];

  // 1. LOADING DE ENTRADA
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  // 2. PROTEÇÃO DE ACESSO
  if (!isAuthenticated && !isLoggingOut) {
    return <Redirect href="/auth/login" />;
  }

  // 3. VERIFICAÇÃO DE PERMISSÃO (Silenciosa)
  const userRole = user?.type;
  if (segments.includes('mc') && userRole !== 'mc') return <Redirect href="/(tabs)" />;
  if (segments.includes('organizer') && userRole !== 'organizer') return <Redirect href="/(tabs)" />;

  return (
    <View style={styles.container}>
      
      {/* OVERLAY DE LOGOUT (5 segundos de despedida) */}
      <Modal visible={isLoggingOut} transparent animationType="fade">
        <View style={styles.logoutOverlay}>
          <Ionicons name="mic-off" size={80} color="#39FF14" />
          <Text style={styles.logoutTitle}>Saindo da Roda...</Text>
          <Text style={styles.logoutSubtitle}>Espero te ver de novo em breve! 🎤</Text>
          <ActivityIndicator size="large" color="#39FF14" style={{ marginTop: 30 }} />
        </View>
      </Modal>

      {/* STACK: Gerencia as Tabs e as Telas Internas com segurança */}
      <Stack 
        screenOptions={{ 
          headerShown: false, 
          gestureEnabled: false, // Trava o "swipe" de voltar no iOS
          contentStyle: { backgroundColor: '#0D0D0D' } 
        }} 
      >
        {/* Registra o grupo de abas como a tela principal da área protegida */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  logoutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.98)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  logoutTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  logoutSubtitle: {
    color: '#39FF14',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600'
  }
});