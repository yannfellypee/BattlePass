import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function McScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Ionicons name="mic" size={80} color="#39FF14" />

      <Text style={styles.title}>Bem-vindo, MC 🎤</Text>

      <Text style={styles.name}>{user?.name}</Text>

      <Text style={styles.subtitle}>
        Hora de rimar, batalhar e subir no ranking.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
  name: {
    color: '#39FF14',
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});