import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Ícone/Logo temporário */}
        <View style={styles.logoContainer}>
          <Ionicons name="mic" size={80} color="#39FF14" />
        </View>

        <Text style={styles.title}>
          Street<Text style={styles.textNeon}>PASS</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          O passaporte definitivo das batalhas de rima. Colecione carimbos, suba no ranking e apoie a cultura hip-hop.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.buttonPrimary}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.buttonPrimaryText}>COMEÇAR AGORA</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonSecondary}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.buttonSecondaryText}>JÁ TENHO UMA CONTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#39FF14',
    marginBottom: 40,
    shadowColor: '#39FF14',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 15,
  },
  textNeon: {
    color: '#39FF14',
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  footer: {
    paddingBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#39FF14',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonPrimaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
  },
  buttonSecondary: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonSecondaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});