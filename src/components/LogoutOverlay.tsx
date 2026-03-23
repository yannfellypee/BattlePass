import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function LogoutOverlay({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Ionicons name="hand-left-outline" size={60} color="#39FF14" />
        
        <Text style={styles.title}>Saindo da Roda...</Text>
        
        <Text style={styles.subtitle}>
          Espero te ver de novo em breve! 🎤
        </Text>

        <ActivityIndicator size="large" color="#39FF14" style={{ marginTop: 30 }} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.95)', // Fundo escuro levemente transparente
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 20,
    fontStyle: 'italic'
  },
  subtitle: {
    color: '#39FF14',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600'
  }
});