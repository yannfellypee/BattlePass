import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

// Caminho para o seu AuthContext (Mantenha o seu caminho original)
import { AuthContext } from '../src/context/AuthContext';

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

  // 2. Redirecionamento na NOVA ARQUITETURA (Perfil Universal)
  if (user && perfil) {
    // Independentemente se é Público, MC ou Organizador,
    // o "esqueleto" é o mesmo. O app se molda lá dentro.
    return <Redirect href="/(tabs)/feed" />;
  }

  // 3. Se não estiver logado, vai para a entrada do app.
  // Nota: Se você tiver uma rota de onboarding, pode trocar para href="/onboarding"
  return <Redirect href="/auth/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});