import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// ==========================================
// 🧠 DADOS DO USUÁRIO (Base Limpa)
// ==========================================
const USER_DATA = {
  username: 'yannfellype_',
  name: 'Yann Fellype',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Kaos',
  social: { followers: '10.5k', following: 342 },
  stamps: [
    { id: '1', name: 'Jurado', event: 'Batalha do Mirante', date: 'Mês passado', icon: 'star', color: '#FFF' },
    { id: '2', name: 'Campeão', event: 'Slam Resistência', date: 'Semana passada', icon: 'trophy', color: '#FFD700' },
    { id: '3', name: 'Presença', event: 'Batalha da Matriz', date: 'Há 2 meses', icon: 'checkmark-circle', color: '#39FF14' },
  ],
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ========================================== */}
      {/* CABEÇALHO */}
      {/* ========================================== */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerUsername}>{USER_DATA.username}</Text>
        </View>
        
        {/* 🚀 A ROTA FOI LIGADA AQUI: router.push('/settings') */}
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="menu" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Linha da Foto e Seguidores */}
        <View style={styles.profileRow}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
            <View style={styles.addIconBadge}>
              <Ionicons name="add" size={16} color="#000" />
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{USER_DATA.social.followers}</Text>
              <Text style={styles.statLabel}>seguidores</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{USER_DATA.social.following}</Text>
              <Text style={styles.statLabel}>seguindo</Text>
            </View>
          </View>
        </View>

        {/* Informações Bio */}
        <View style={styles.bioContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{USER_DATA.name}</Text>
          </View>
          
          <Text style={styles.bioText}>Representando a cultura hip-hop. Fazendo rima de improviso nas ruas. 🎤🔥</Text>
        </View>

        {/* Botões de Ação Principais */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* ========================================== */}
        {/* ÁREA UNIVERSAL: O PASSAPORTE */}
        {/* ========================================== */}
        <View style={styles.baseSection}>
          <Text style={styles.sectionTitle}>MEU PASSAPORTE</Text>
          <View style={styles.stampsGrid}>
            {USER_DATA.stamps.map((stamp) => (
              <View key={stamp.id} style={styles.stampCard}>
                <Ionicons name={stamp.icon as any} size={36} color={stamp.color} />
                <Text style={styles.stampName}>{stamp.name}</Text>
                <Text style={styles.stampEvent} numberOfLines={1}>{stamp.event}</Text>
              </View>
            ))}
            
            {/* Slots Vazios */}
            <View style={styles.emptyStampCard}><Ionicons name="lock-closed" size={20} color="#333" /></View>
            <View style={styles.emptyStampCard}><Ionicons name="lock-closed" size={20} color="#333" /></View>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerUsername: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  
  profileRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  avatarContainer: { position: 'relative', marginRight: 30 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: '#333' },
  addIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#39FF14', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#0D0D0D' },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  statLabel: { fontSize: 12, color: '#CCC', marginTop: 2 },

  bioContainer: { paddingHorizontal: 20, marginTop: 15 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  nameText: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  bioText: { color: '#CCC', fontSize: 14, lineHeight: 20 },

  actionButtonsRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' },
  actionButton: { flex: 1, backgroundColor: '#1A1A1A', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#333' },
  actionButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },

  divider: { height: 1, backgroundColor: '#222', marginVertical: 25 },
  
  baseSection: { paddingHorizontal: 0 },
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, paddingHorizontal: 20, marginBottom: 15 },

  stampsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
  stampCard: { width: '31%', backgroundColor: '#1A1A1A', padding: 15, borderRadius: 16, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  stampName: { color: '#FFF', fontSize: 11, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  stampEvent: { color: '#888', fontSize: 9, textAlign: 'center', marginTop: 4 },
  emptyStampCard: { width: '31%', height: 100, backgroundColor: 'transparent', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#222', borderStyle: 'dashed' },
});