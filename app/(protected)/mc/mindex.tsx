import React, { useContext } from 'react';
import { View, Text, StyleSheet, BackHandler, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../src/context/AuthContext';
import { HeaderInternal } from '../../../src/components/HeaderInternal';

export default function McDashboard() {
  const { user } = useContext(AuthContext);

  // Bloqueio do botão voltar
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  // Dados fictícios para as rimas (Carrossel)
  const bestRhymes = [
    { id: '1', title: 'Flow Pesado', views: '1.2k', likes: '450', shares: '89' },
    { id: '2', title: 'Punchline King', views: '800', likes: '300', shares: '40' },
    { id: '3', title: 'Batalha do Tanque', views: '2.5k', likes: '1.1k', shares: '200' },
    { id: '4', title: 'Resposta Rápida', views: '600', likes: '150', shares: '15' },
    { id: '5', title: 'Improviso Puro', views: '3k', likes: '1.8k', shares: '500' },
  ];

  return (
    <View style={styles.container}>
      <HeaderInternal title="PERFIL" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ESTRUTURA ESTILO INSTAGRAM */}
        <View style={styles.profileHeader}>
          <View style={styles.profileRow}>
            <View style={styles.imageContainer}>
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={40} color="#333" />
              </View>
              <TouchableOpacity style={styles.editImageBtn}>
                <Ionicons name="add" size={16} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>158</Text>
                <Text style={styles.statLabel}>Batalhas</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>1.2k</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>450</Text>
                <Text style={styles.statLabel}>Seguindo</Text>
              </View>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.displayName}>{user?.name || "Mano MC"}</Text>
            <Text style={styles.bioText}>🎤 Freestyleiro de Macaé | Invencível no improviso{"\n"}🔥 Representando a Roda Cultural</Text>
            
            <TouchableOpacity style={styles.editProfileBtn}>
              <Text style={styles.editProfileBtnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CARROSSEL: MINHAS 5 MELHORES RIMAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minhas 5 melhores rimas</Text>
          <FlatList
            horizontal
            data={bestRhymes}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.rhymeCard}>
                <View style={styles.rhymeHeader}>
                  <Text style={styles.rhymeTitle}>{item.title}</Text>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={18} color="#39FF14" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.rhymeStatsRow}>
                  <View style={styles.miniStat}><Ionicons name="eye-outline" size={12} color="#888" /><Text style={styles.miniStatText}>{item.views}</Text></View>
                  <View style={styles.miniStat}><Ionicons name="heart-outline" size={12} color="#888" /><Text style={styles.miniStatText}>{item.likes}</Text></View>
                  <View style={styles.miniStat}><Ionicons name="share-social-outline" size={12} color="#888" /><Text style={styles.miniStatText}>{item.shares}</Text></View>
                </View>

                <TouchableOpacity style={styles.rhymeActionBtn}>
                  <Text style={styles.rhymeActionText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* MANTENDO AS AÇÕES RÁPIDAS E PRÓXIMAS BATALHAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Batalhas</Text>
          <View style={styles.battleCard}>
            <View style={styles.battleInfo}>
              <Text style={styles.battleName}>Batalha do Tanque</Text>
              <Text style={styles.battleDate}>Hoje, às 19:30</Text>
            </View>
            <TouchableOpacity style={styles.entryButton}><Text style={styles.entryButtonText}>Inscrição</Text></TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContent: { paddingBottom: 40 },
  
  // Perfil Estilo Instagram
  profileHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  imageContainer: { position: 'relative' },
  profileImagePlaceholder: { width: 85, height: 85, borderRadius: 45, backgroundColor: '#1A1A1A', borderColor: '#39FF14', borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  editImageBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#39FF14', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#0D0D0D' },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginLeft: 15 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12 },
  bioContainer: { marginTop: 15 },
  displayName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  bioText: { color: '#CCC', fontSize: 13, marginTop: 4, lineHeight: 18 },
  editProfileBtn: { backgroundColor: '#1A1A1A', borderRadius: 6, paddingVertical: 8, alignItems: 'center', marginTop: 15, borderWidth: 1, borderColor: '#333' },
  editProfileBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  // Seções e Carrossel
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  rhymeCard: { backgroundColor: '#1A1A1A', width: 160, padding: 15, borderRadius: 15, marginRight: 15, borderWidth: 1, borderColor: '#333' },
  rhymeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  rhymeTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, flex: 1 },
  rhymeStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  miniStat: { flexDirection: 'row', alignItems: 'center' },
  miniStatText: { color: '#888', fontSize: 10, marginLeft: 3 },
  rhymeActionBtn: { borderTopWidth: 1, borderTopColor: '#333', paddingTop: 10, alignItems: 'center' },
  rhymeActionText: { color: '#39FF14', fontSize: 11, fontWeight: 'bold' },

  // Cards de Batalha (Manteve)
  battleCard: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#39FF14' },
  battleInfo: { flex: 1 },
  battleName: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  battleDate: { color: '#888', fontSize: 12 },
  entryButton: { backgroundColor: '#39FF14', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  entryButtonText: { color: '#000', fontSize: 11, fontWeight: 'bold' },
});