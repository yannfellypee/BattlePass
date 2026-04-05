import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados fake para ilustrar a tela
const RECENT_BATTLES = [
  { id: '1', name: 'Batalha da Matriz', city: 'São Paulo', winner: 'MC Kaos', date: 'Ontem' },
  { id: '2', name: 'Batalha do Tanque', city: 'Rio de Janeiro', winner: 'MC Xamã', date: 'Sexta' },
];

const UPCOMING_BATTLES = [
  { id: '3', name: 'Batalha da Aldeia', city: 'Barueri', date: 'Hoje, 20h', type: 'Especial' },
  { id: '4', name: 'Batalha do Museu', city: 'Brasília', date: 'Amanhã, 19h', type: 'Regional' },
];

const TOP_MCS = [
  { id: '1', name: 'MC Kaos', wins: 14, tag: 'Lenda' },
  { id: '2', name: 'MC Jhon', wins: 10, tag: 'Respeitado' },
];

export default function HomeFeedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Customizado */}
      <View style={styles.header}>
        <Text style={styles.title}>BATTLE <Text style={styles.textNeon}>PASS</Text></Text>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Próximas Batalhas */}
        <Text style={styles.sectionTitle}>ROLANDO EM BREVE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {UPCOMING_BATTLES.map((battle) => (
            <TouchableOpacity key={battle.id} style={styles.cardHighlight}>
              <View style={styles.tagNeon}><Text style={styles.tagText}>{battle.type}</Text></View>
              <Text style={styles.cardTitle}>{battle.name}</Text>
              <Text style={styles.cardSubtitle}><Ionicons name="location" size={12} color="#888" /> {battle.city}</Text>
              <Text style={styles.cardDate}><Ionicons name="time" size={12} color="#39FF14" /> {battle.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Batalhas Recentes */}
        <Text style={styles.sectionTitle}>ÚLTIMOS CONFRONTOS</Text>
        {RECENT_BATTLES.map((battle) => (
          <TouchableOpacity key={battle.id} style={styles.cardDefault}>
            <View>
              <Text style={styles.cardTitle}>{battle.name}</Text>
              <Text style={styles.cardSubtitle}>{battle.city} • {battle.date}</Text>
            </View>
            <View style={styles.winnerBadge}>
              <Ionicons name="trophy" size={14} color="#000" />
              <Text style={styles.winnerText}>{battle.winner}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Ranking Destaque */}
        <Text style={styles.sectionTitle}>RANKING DESTAQUE</Text>
        <View style={styles.rankingContainer}>
          {TOP_MCS.map((mc, index) => (
            <View key={mc.id} style={styles.rankingRow}>
              <Text style={styles.rankingPosition}>{index + 1}</Text>
              <View style={styles.mcInfo}>
                <Text style={styles.mcName}>{mc.name}</Text>
                <Text style={styles.mcTag}>{mc.tag}</Text>
              </View>
              <Text style={styles.mcWins}>{mc.wins} vitórias</Text>
            </View>
          ))}
        </View>
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
  },
  textNeon: {
    color: '#39FF14', 
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 15,
    marginTop: 10,
  },
  horizontalScroll: {
    marginBottom: 25,
  },
  cardHighlight: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 220,
    borderWidth: 1,
    borderColor: '#39FF14',
    shadowColor: '#39FF14',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tagNeon: {
    backgroundColor: '#39FF14',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  tagText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
  cardDate: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardDefault: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  winnerBadge: {
    backgroundColor: '#39FF14',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  winnerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
  rankingContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rankingPosition: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: '900',
    width: 30,
  },
  mcInfo: {
    flex: 1,
  },
  mcName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mcTag: {
    color: '#888',
    fontSize: 12,
  },
  mcWins: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});