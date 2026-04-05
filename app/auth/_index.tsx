import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';
import { AuthContext } from '../../src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
  const { perfil, loading, user } = useContext(AuthContext);

  // Essencial: Se o app está "pensando", mostre o loading
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  // Se já temos usuário e perfil carregado, tira ele do Cadastro/Login
  if (user && perfil) {
    if (perfil.nivel_acesso === 2) return <Redirect href="/mc" />;
    if (perfil.nivel_acesso === 3) return <Redirect href="/organizer" />;
    return <Redirect href="/audience" />;
  }

  // Se não tem ninguém, mostra as telas de Login/Cadastro
  return <Stack screenOptions={{ headerShown: false }} />;
}