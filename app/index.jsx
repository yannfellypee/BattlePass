import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

// Caminho para o seu AuthContext
import { AuthContext } from '../src/context/AuthContext';

// Sua tela de boas-vindas
import OnboardingScreen from './onboarding'; 

export default function Index() {
  const { user, perfil, loading } = useContext(AuthContext);

  // 1. Enquanto verifica a sessão no banco de dados
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  // 2. Redirecionamento após o Login
  if (user && perfil) {
    // Definimos o destino inicial como o Perfil (conforme seu pedido)
    let target = "/audience/index"; 

    if (perfil.nivel_acesso === 2) {
      target = "/mc/index"; 
    } else if (perfil.nivel_acesso === 3) {
      target = "/organizer/index";
    }
      
    return <Redirect href={target} />;
  }

  // 3. Se não estiver logado, vai para o Onboarding
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