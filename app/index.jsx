import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { AuthContext } from '../src/context/AuthContext';

// Importe o componente de Onboarding. 
// Certifique-se de que o arquivo onboarding.tsx exporta "default function..."
import OnboardingScreen from './onboarding'; 

export default function Index() {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  // 1. Hook de carregamento inicial
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  // 2. Se já estiver logado, o Redirect resolve a navegação sem conflito de Hooks
  if (isAuthenticated && user) {
    const target = user.type === 'mc' 
      ? '/mc' 
      : user.type === 'organizer' 
      ? '/organizer' 
      : '/audience';
      
    return <Redirect href={target} />;
  }

  // 3. Se não estiver logado, renderiza o componente de Onboarding
  return <OnboardingScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});