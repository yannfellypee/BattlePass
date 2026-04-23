import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Diz ao Expo que a tela principal dessa pasta é o login */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}