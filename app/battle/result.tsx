import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados simulados do resultado
const MATCH_RESULT = {
  battleName: 'Batalha da Matriz',
  city: 'São Paulo',
  date: 'Ontem, 22h',
  mcOne: { name: 'MC Kaos', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Kaos', isWinner: true },
  mcTwo: { name: 'MC Jhon', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Jhon', isWinner: false },
};

export default function BattleResultScreen() {
  const router = useRouter();

  const handleShare = () => {
    Alert.alert("Compartilhar", "Gerando imagem do card para o Instagram Stories...");
    // Aqui entraria o react-native-view-shot + expo-sharing
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RESULTADO <Text style={styles.textNeon}>OFICIAL</Text></Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.cardContainer}>
        {/* O "Flyer" em si que será compartilhado */}
        <View style={styles.shareableCard}>
          <Text style={styles.battleTag}>CULTURA HIP-HOP</Text>
          <Text style={styles.battleName}>{MATCH_RESULT.battleName}</Text>
          <Text style={styles.battleDetails}>{MATCH_RESULT.city} • {MATCH_RESULT.date}</Text>

          <View style={styles.versusContainer}>
            {/* MC 1 (Vencedor neste mock) */}
            <View style={[styles.mcColumn, MATCH_RESULT.mcOne.isWinner && styles.winnerColumn]}>
              {MATCH_RESULT.mcOne.isWinner && (
                <View style={styles.crownBadge}>
                  <Ionicons name="trophy" size={16} color="#000" />
                  <Text style={styles.crownText}>CAMPEÃO</Text>
                </View>
              )}
              <Image source={{ uri: MATCH_RESULT.mcOne.avatar }} style={[styles.avatar, MATCH_RESULT.mcOne.isWinner && styles.avatarWinner]} />
              <Text style={styles.mcName}>{MATCH_RESULT.mcOne.name}</Text>
            </View>

            <View style={styles.vsBadge}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            {/* MC 2 */}
            <View style={[styles.mcColumn, MATCH_RESULT.mcTwo.isWinner && styles.winnerColumn]}>
              {MATCH_RESULT.mcTwo.isWinner && (
                <View style={styles.crownBadge}>
                  <Ionicons name="trophy" size={16} color="#000" />
                  <Text style={styles.crownText}>CAMPEÃO</Text>
                </View>
              )}
              <Image source={{ uri: MATCH_RESULT.mcTwo.avatar }} style={[styles.avatar, MATCH_RESULT.mcTwo.isWinner && styles.avatarWinner]} />
              <Text style={styles.mcName}>{MATCH_RESULT.mcTwo.name}</Text>
            </View>
          </View>

          <View style={styles.footerLogo}>
            <Text style={styles.logoText}>PASSAPORTE DA <Text style={styles.textNeon}>RIMA</Text></Text>
          </View>
        </View>
      </View>

      <View style={styles.actionFooter}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="#000" style={{ marginRight: 10 }} />
          <Text style={styles.shareButtonText}>COMPARTILHAR RESULTADO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  closeButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },

  cardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  shareableCard: { width: '100%', backgroundColor: '#1A1A1A', borderRadius: 20, padding: 30, borderWidth: 2, borderColor: '#333', alignItems: 'center', shadowColor: '#39FF14', shadowOpacity: 0.2, shadowRadius: 20 },
  
  battleTag: { color: '#39FF14', fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 },
  battleName: { color: '#FFF', fontSize: 28, fontWeight: '900', textTransform: 'uppercase', textAlign: 'center' },
  battleDetails: { color: '#888', fontSize: 12, marginTop: 5, marginBottom: 40 },

  versusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginBottom: 40 },
  mcColumn: { alignItems: 'center', width: '45%' },
  winnerColumn: { transform: [{ scale: 1.1 }] },
  
  crownBadge: { flexDirection: 'row', backgroundColor: '#39FF14', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignItems: 'center', marginBottom: -10, zIndex: 10, borderWidth: 2, borderColor: '#1A1A1A' },
  crownText: { color: '#000', fontSize: 10, fontWeight: '900', marginLeft: 4 },
  
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: '#333', marginBottom: 10, backgroundColor: '#000' },
  avatarWinner: { borderColor: '#39FF14', borderWidth: 4 },
  mcName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  vsBadge: { position: 'absolute', backgroundColor: '#000', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#333', zIndex: 5 },
  vsText: { color: '#888', fontSize: 14, fontWeight: '900', fontStyle: 'italic' },

  footerLogo: { borderTopWidth: 1, borderTopColor: '#333', paddingTop: 20, width: '100%', alignItems: 'center' },
  logoText: { color: '#666', fontSize: 12, fontWeight: '900', fontStyle: 'italic' },

  actionFooter: { padding: 20, paddingBottom: 40 },
  shareButton: { flexDirection: 'row', backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  shareButtonText: { color: '#000', fontSize: 16, fontWeight: '900' },
});