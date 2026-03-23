import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';
import { AuthContext } from '../../src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  // REGRA DE OURO: Se já está logado, não deixa ver Login/Register
  if (isAuthenticated) {
    // Redireciona para a pasta correta baseada no cargo
    if (user?.type === 'mc') return <Redirect href="/mc" />;
    if (user?.type === 'organizer') return <Redirect href="/organizer" />;
    return <Redirect href="/audience" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}