import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Dados simulados do evento
const BATTLE_DATA = {
  id: '1',
  name: 'Batalha da Matriz',
  city: 'São Bernardo do Campo',
  location: 'Praça da Matriz - Centro',
  date: 'Sexta-feira, 20:00',
  organizer: 'Coletivo Matriz',
  coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
  participants: [
    { id: '1', name: 'MC Kaos', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Kaos' },
    { id: '2', name: 'MC Jhon', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Jhon' },
    { id: '3', name: 'MC Zen', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Zen' },
  ],
  checkins: 142,
  status: 'upcoming', // upcoming, live, finished
};

export default function BattleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Header com Imagem */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: BATTLE_DATA.coverImage }} style={styles.coverImage} />
        <View style={styles.imageOverlay} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
        {/* Info Principal */}
        <View style={styles.mainInfo}>
          <View style={styles.tagNeon}><Text style={styles.tagText}>BATALHA OFICIAL</Text></View>
          <Text style={styles.title}>{BATTLE_DATA.name}</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color="#39FF14" />
            <Text style={styles.infoText}>{BATTLE_DATA.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#39FF14" />
            <Text style={styles.infoText}>{BATTLE_DATA.location} • {BATTLE_DATA.city}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={18} color="#39FF14" />
            <Text style={styles.infoText}>Organizado por <Text style={{fontWeight: 'bold', color: '#FFF'}}>{BATTLE_DATA.organizer}</Text></Text>
          </View>
        </View>

        {/* Estatísticas de Check-in */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="flame" size={24} color="#39FF14" />
            <Text style={styles.statNumber}>{BATTLE_DATA.checkins}</Text>
            <Text style={styles.statLabel}>Check-ins</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Ionicons name="mic" size={24} color="#FFF" />
            <Text style={styles.statNumber}>{BATTLE_DATA.participants.length}/16</Text>
            <Text style={styles.statLabel}>MCs Inscritos</Text>
          </View>
        </View>

        {/* Lista de MCs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHAVEAMENTO (MCs)</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>Ver todos</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mcsScroll}>
          {BATTLE_DATA.participants.map((mc) => (
            <TouchableOpacity key={mc.id} style={styles.mcCard} onPress={() => router.push(`/mc/${mc.id}`)}>
              <Image source={{ uri: mc.avatar }} style={styles.mcAvatar} />
              <Text style={styles.mcName}>{mc.name}</Text>
            </TouchableOpacity>
          ))}
          {/* Slot Vazio para inscrição */}
          <TouchableOpacity style={styles.emptyMcCard}>
            <Ionicons name="add" size={24} color="#888" />
            <Text style={styles.emptyMcText}>Vaga</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ height: 100 }} /> {/* Espaço para os botões fixos */}
      </ScrollView>

      {/* Botões de Ação Fixos no Rodapé */}
      <View style={styles.actionFooter}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push('/(tabs)/scan')}>
          <Ionicons name="qr-code-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.buttonSecondaryText}>CHECK-IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>BATALHAR (MC)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  
  imageContainer: { height: 250, position: 'relative' },
  coverImage: { width: '100%', height: '100%' },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 5, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20 },
  
  scrollArea: { flex: 1 },
  mainInfo: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  tagNeon: { backgroundColor: '#39FF14', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginBottom: 15 },
  tagText: { color: '#000', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', textTransform: 'uppercase', marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoText: { color: '#888', marginLeft: 10, fontSize: 14 },

  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1A1A', margin: 20, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#222' },
  statBox: { alignItems: 'center', flex: 1 },
  divider: { width: 1, backgroundColor: '#333' },
  statNumber: { fontSize: 24, fontWeight: '900', color: '#FFF', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  sectionTitle: { color: '#888', fontSize: 14, fontWeight: 'bold', letterSpacing: 1.5 },
  seeAllText: { color: '#39FF14', fontSize: 12, fontWeight: 'bold' },
  
  mcsScroll: { paddingHorizontal: 20 },
  mcCard: { alignItems: 'center', marginRight: 20 },
  mcAvatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#39FF14', marginBottom: 8 },
  mcName: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  emptyMcCard: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#333', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  emptyMcText: { color: '#666', fontSize: 10, marginTop: 4 },

  actionFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 20, backgroundColor: '#121212', borderTopWidth: 1, borderTopColor: '#222' },
  buttonSecondary: { flex: 1, flexDirection: 'row', backgroundColor: '#1A1A1A', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#333', marginRight: 10 },
  buttonSecondaryText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  buttonPrimary: { flex: 1.5, backgroundColor: '#39FF14', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonPrimaryText: { color: '#000', fontSize: 14, fontWeight: '900' },
});