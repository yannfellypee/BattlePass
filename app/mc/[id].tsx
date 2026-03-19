import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Dados simulados baseados no ID recebido na rota
const MC_PUBLIC_DATA = {
  id: '1',
  artisticName: 'MC Kaos',
  rankingPos: 1,
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Kaos',
  stats: {
    battles: 53,
    wins: 14,
    winRate: '26%',
  },
  history: [
    { id: '1', battleName: 'Batalha da Matriz', result: 'Vitória', opponent: 'MC Jhon', date: 'Ontem' },
    { id: '2', battleName: 'Batalha da Aldeia', result: 'Derrota', opponent: 'MC Kant', date: 'Semana passada' },
    { id: '3', battleName: 'Batalha do Museu', result: 'Vitória', opponent: 'MC Zen', date: 'Mês passado' },
  ]
};

export default function PublicMCProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID passado na URL

  return (
    <View style={styles.container}>
      {/* Cabeçalho de Navegação */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERFIL DO <Text style={styles.textNeon}>MC</Text></Text>
        <View style={{ width: 28 }} /> {/* Espaçador para centralizar o título */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Info Pública do MC */}
        <View style={styles.profileInfo}>
          <Image source={{ uri: MC_PUBLIC_DATA.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{MC_PUBLIC_DATA.artisticName}</Text>
          <View style={styles.rankingBadge}>
            <Ionicons name="trophy" size={14} color="#000" style={{ marginRight: 5 }} />
            <Text style={styles.rankingText}>Top {MC_PUBLIC_DATA.rankingPos} Nacional</Text>
          </View>
        </View>

        {/* Estatísticas de Combate */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{MC_PUBLIC_DATA.stats.battles}</Text>
            <Text style={styles.statLabel}>Participações</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{MC_PUBLIC_DATA.stats.wins}</Text>
            <Text style={styles.statLabel}>Vitórias</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#39FF14' }]}>{MC_PUBLIC_DATA.stats.winRate}</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>

        {/* Histórico de Batalhas */}
        <Text style={styles.sectionTitle}>HISTÓRICO RECENTE</Text>
        <View style={styles.historyContainer}>
          {MC_PUBLIC_DATA.history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyDetails}>
                <Text style={styles.battleName}>{item.battleName}</Text>
                <Text style={styles.opponentText}>vs {item.opponent} • {item.date}</Text>
              </View>
              <View style={[
                styles.resultBadge, 
                item.result === 'Vitória' ? styles.resultWin : styles.resultLoss
              ]}>
                <Text style={[
                  styles.resultText, 
                  item.result === 'Vitória' ? styles.textBlack : styles.textWhite
                ]}>
                  {item.result.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Espaço no fundo */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, backgroundColor: '#121212' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },
  scrollContent: { padding: 20 },

  profileInfo: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#39FF14', marginBottom: 15 },
  name: { fontSize: 28, fontWeight: '900', color: '#FFF', marginBottom: 10, textTransform: 'uppercase' },
  rankingBadge: { flexDirection: 'row', backgroundColor: '#39FF14', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  rankingText: { color: '#000', fontSize: 14, fontWeight: 'bold' },

  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1A1A', padding: 20, borderRadius: 12, marginBottom: 30, borderWidth: 1, borderColor: '#222' },
  statBox: { alignItems: 'center', flex: 1 },
  divider: { width: 1, backgroundColor: '#333', marginHorizontal: 10 },
  statValue: { fontSize: 22, fontWeight: '900', color: '#FFF' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 5 },

  sectionTitle: { color: '#888', fontSize: 14, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15 },
  
  historyContainer: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#222' },
  historyCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#222' },
  historyDetails: { flex: 1 },
  battleName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  opponentText: { color: '#888', fontSize: 12 },
  resultBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  resultWin: { backgroundColor: '#39FF14', borderColor: '#39FF14' },
  resultLoss: { backgroundColor: 'transparent', borderColor: '#444' },
  resultText: { fontSize: 10, fontWeight: 'bold' },
  textBlack: { color: '#000' },
  textWhite: { color: '#888' },
});