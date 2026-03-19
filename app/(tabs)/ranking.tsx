import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados simulados do Ranking
const MOCK_RANKING = [
  { id: '1', rank: 1, name: 'MC Kaos', city: 'São Paulo', wins: 42, avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Kaos', isTrend: false },
  { id: '2', rank: 2, name: 'MC Jhon', city: 'Rio de Janeiro', wins: 38, avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Jhon', isTrend: true },
  { id: '3', rank: 3, name: 'MC Zen', city: 'Belo Horizonte', wins: 35, avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Zen', isTrend: false },
  { id: '4', rank: 4, name: 'MC Lua', city: 'Curitiba', wins: 29, avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Lua', isTrend: true },
  { id: '5', rank: 5, name: 'MC Piloto', city: 'Porto Alegre', wins: 22, avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Piloto', isTrend: false },
];

export default function RankingScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Nacional');

  const filters = ['Nacional', 'Por Cidade', 'Revelação', 'Mais Vitórias'];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>RANKING <Text style={styles.textNeon}>OFICIAL</Text></Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Filtros de Categoria */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter} 
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        
        {/* Pódio / Top 3 Destacado (Opcional, mas dá um visual incrível) */}
        <View style={styles.podiumContainer}>
          <Text style={styles.sectionTitle}>TOP 50 {activeFilter.toUpperCase()}</Text>
        </View>

        {/* Lista do Ranking */}
        <View style={styles.rankingList}>
          {MOCK_RANKING.map((mc, index) => {
            const isTop3 = index < 3;
            return (
              <TouchableOpacity 
                key={mc.id} 
                style={[styles.mcCard, isTop3 && styles.mcCardTop]}
                onPress={() => router.push(`/mc/${mc.id}`)}
              >
                {/* Posição */}
                <View style={styles.rankBadge}>
                  <Text style={[styles.rankNumber, isTop3 && styles.rankNumberTop]}>{mc.rank}º</Text>
                </View>

                {/* Avatar e Info */}
                <Image source={{ uri: mc.avatar }} style={[styles.avatar, isTop3 && styles.avatarTop]} />
                <View style={styles.mcInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.mcName}>{mc.name}</Text>
                    {mc.isTrend && <Ionicons name="trending-up" size={16} color="#39FF14" style={{ marginLeft: 5 }} />}
                  </View>
                  <Text style={styles.mcCity}>{mc.city}</Text>
                </View>

                {/* Vitórias / Pontuação */}
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreNumber}>{mc.wins}</Text>
                  <Text style={styles.scoreLabel}>VITÓRIAS</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: '#0D0D0D' },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  textNeon: { color: '#39FF14' },

  filtersWrapper: { borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 15 },
  filtersScroll: { paddingHorizontal: 20 },
  filterChip: { backgroundColor: '#1A1A1A', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: '#333' },
  filterChipActive: { backgroundColor: '#39FF14', borderColor: '#39FF14' },
  filterText: { color: '#888', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },
  filterTextActive: { color: '#000' },

  listContent: { padding: 20 },
  podiumContainer: { marginBottom: 15 },
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },

  rankingList: { backgroundColor: '#1A1A1A', borderRadius: 16, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  
  mcCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  mcCardTop: { backgroundColor: '#121212' }, // Fundo levemente diferente para o top 3
  
  rankBadge: { width: 40, alignItems: 'center', marginRight: 10 },
  rankNumber: { color: '#888', fontSize: 18, fontWeight: 'bold' },
  rankNumberTop: { color: '#39FF14', fontSize: 24, fontWeight: '900', fontStyle: 'italic' },

  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#333', marginRight: 15 },
  avatarTop: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#39FF14' },

  mcInfo: { flex: 1, justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  mcName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  mcCity: { color: '#888', fontSize: 12, marginTop: 2 },

  scoreBox: { alignItems: 'flex-end', justifyContent: 'center' },
  scoreNumber: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  scoreLabel: { color: '#39FF14', fontSize: 8, fontWeight: 'bold', letterSpacing: 1, marginTop: 2 },
});