import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg'; // Você precisará instalar: npm install react-native-qrcode-svg react-native-svg

export default function MCHome() {
  const { user, signOut } = useContext(AuthContext);

  // Criamos um payload para o QR Code (Ex: ID do usuário e CPF)
  const qrValue = JSON.stringify({
    id: user?.id,
    role: 'mc',
    name: user?.user_metadata?.full_name
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header com Perfil */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Salve, MC</Text>
          <Text style={styles.userName}>{user?.user_metadata?.full_name || 'Rimador'}</Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Ionicons name="log-out-outline" size={28} color="#FF3333" />
        </TouchableOpacity>
      </View>

      {/* QR Code de Identificação (O "Passaporte") */}
      <View style={styles.qrCard}>
        <Text style={styles.qrTitle}>SEU STREET PASS</Text>
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={200}
            backgroundColor="transparent"
            color="#39FF14"
          />
        </View>
        <Text style={styles.qrInstructions}>Apresente este código na organização da batalha.</Text>
      </View>

      {/* Stats Rápidos */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Check-ins</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>05</Text>
          <Text style={styles.statLabel}>Vitórias</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="mic-outline" size={24} color="#000" />
        <Text style={styles.actionButtonText}>VER MINHAS RIMAS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  content: { padding: 25, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  welcome: { color: '#888', fontSize: 16 },
  userName: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  qrCard: { 
    backgroundColor: '#1A1A1A', 
    borderRadius: 20, 
    padding: 20, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20
  },
  qrTitle: { color: '#39FF14', fontWeight: '900', fontSize: 18, marginBottom: 20, letterSpacing: 2 },
  qrContainer: { padding: 15, backgroundColor: '#FFF', borderRadius: 15 },
  qrInstructions: { color: '#666', fontSize: 12, marginTop: 15, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { backgroundColor: '#1A1A1A', width: '48%', padding: 20, borderRadius: 15, alignItems: 'center' },
  statNumber: { color: '#39FF14', fontSize: 28, fontWeight: '900' },
  statLabel: { color: '#888', fontSize: 12, marginTop: 5 },
  actionButton: { 
    backgroundColor: '#39FF14', 
    flexDirection: 'row', 
    padding: 20, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  actionButtonText: { color: '#000', fontWeight: '900', marginLeft: 10, fontSize: 16 }
});