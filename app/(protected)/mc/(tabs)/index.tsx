import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  BackHandler, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Alert 
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../../src/context/AuthContext';

export default function McDashboard() {
  const { user, signOut } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const [bestRhymes] = useState([
    { id: '1', title: 'Flow Pesado', likes: '450', hasVideo: true },
    { id: '2', title: 'Punchline King', likes: '300', hasVideo: false },
    { id: '3', title: 'Batalha do Tanque', likes: '1.1k', hasVideo: true },
    { id: '4', title: 'Resposta Rápida', likes: '150', hasVideo: false },
    { id: '5', title: 'Improviso Puro', likes: '1.8k', hasVideo: true },
  ]);

  const [rivals] = useState([
    { id: '1', name: 'MC Flash', wins: '12', losses: '10' },
    { id: '2', name: 'Rato de Roda', wins: '5', losses: '8' },
  ]);

  const confirmDelete = () => {
    setMenuVisible(false);
    Alert.alert(
      "⚠ Ação Irreversível",
      "Deseja deletar sua conta permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "DELETAR", style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.topNav}>
        <Text style={styles.navLogo}>STREET<Text style={{color: '#39FF14'}}>PASS</Text></Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu-outline" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* PERFIL */}
        <View style={styles.profileHeader}>
          <View style={styles.profileRow}>
            <View style={styles.imageContainer}>
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="mic-outline" size={40} color="#39FF14" />
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statBox}><Text style={styles.statNumber}>158</Text><Text style={styles.statLabel}>Batalhas</Text></View>
              <View style={styles.statBox}><Text style={styles.statNumber}>1.2k</Text><Text style={styles.statLabel}>Seguidores</Text></View>
              <View style={styles.statBox}><Text style={styles.statNumber}>450</Text><Text style={styles.statLabel}>Seguindo</Text></View>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.displayName}>{user?.name || "Mano MC"}</Text>
            {/* INTRODUÇÃO ATUALIZADA */}
            <Text style={styles.bioText}>
              ✨ Em busca de um sonho...{"\n"}🎤 Freestyleiro de Macaé | Roda do Tanque
            </Text>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MELHORES RIMAS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Minhas 5 melhores rimas</Text>
            {/* NOVO ÍCONE DE EDIÇÃO */}
            <TouchableOpacity onPress={() => Alert.alert("Editar Rimas", "Selecione seus melhores momentos.")}>
              <Ionicons name="options-outline" size={18} color="#39FF14" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            horizontal
            data={bestRhymes}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.rhymeCard}>
                <View style={styles.videoThumbnail}>
                  {item.hasVideo ? (
                    <TouchableOpacity><Ionicons name="play-circle" size={40} color="#39FF14" /></TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.addVideoArea}>
                      <Ionicons name="videocam-outline" size={20} color="#333" />
                      <Text style={{color: '#333', fontSize: 9, fontWeight: 'bold'}}>Add Video</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.rhymeInfo}>
                  <Text style={styles.rhymeTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.rhymeStat}><Ionicons name="eye" size={10} color="#39FF14" /> {item.likes}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* RIVAIS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rivais Declarados</Text>
            {/* NOVO ÍCONE DE EDIÇÃO RIVAIS */}
            <TouchableOpacity onPress={() => Alert.alert("Placar de Rivais", "Atualize suas vitórias.")}>
              <Ionicons name="options-outline" size={20} color="#39FF14" />
            </TouchableOpacity>
          </View>
          <View style={styles.rivalsRow}>
            {rivals.map((rival) => (
              <View key={rival.id} style={styles.rivalCard}>
                <View style={styles.rivalAvatar}><Ionicons name="person" size={20} color="#39FF14" /></View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.rivalName}>{rival.name}</Text>
                  <Text style={styles.rivalScore}>{rival.wins}W - {rival.losses}L</Text>
                </View>
                <View style={styles.vsBadge}><Text style={styles.vsText}>VS</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* PRÓXIMAS BATALHAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Batalhas</Text>
          <View style={styles.battleCard}>
            <View style={{flex: 1}}>
              <Text style={styles.battleName}>Batalha do Tanque</Text>
              <Text style={styles.battleDate}>Hoje, às 19:30</Text>
            </View>
            <TouchableOpacity style={styles.checkInBtn}>
              <Ionicons name="location" size={14} color="#000" style={{marginRight: 4}} />
              <Text style={styles.checkInText}>Check-in</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* MENU MODAL */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuDrawer}>
            <View style={styles.drawerIndicator} />
            <TouchableOpacity style={styles.menuOption} onPress={() => { setMenuVisible(false); signOut(); }}>
              <Ionicons name="log-out-outline" size={24} color="#FFF" />
              <Text style={styles.menuOptionText}>Sair da Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={confirmDelete}>
              <Ionicons name="trash-outline" size={24} color="#FF3B30" />
              <Text style={[styles.menuOptionText, {color: '#FF3B30'}]}>Deletar Conta</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 10 },
  navLogo: { color: '#FFF', fontSize: 20, fontWeight: '900', fontStyle: 'italic' },
  scrollContent: { paddingBottom: 120 },
  profileHeader: { padding: 20 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  imageContainer: { position: 'relative' },
  profileImagePlaceholder: { width: 85, height: 85, borderRadius: 45, backgroundColor: '#1A1A1A', borderWidth: 2, borderColor: '#39FF14', justifyContent: 'center', alignItems: 'center' },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginLeft: 10 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 11 },
  bioContainer: { marginTop: 15 },
  displayName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  bioText: { color: '#BBB', fontSize: 13, marginTop: 4, lineHeight: 18 },
  editBtn: { backgroundColor: '#1A1A1A', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 15, borderWidth: 1, borderColor: '#333' },
  editBtnText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  section: { marginTop: 30, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#FFF', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  rhymeCard: { width: 150, backgroundColor: '#1A1A1A', borderRadius: 12, marginRight: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#222' },
  videoThumbnail: { width: '100%', height: 100, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  addVideoArea: { alignItems: 'center' },
  rhymeInfo: { padding: 10 },
  rhymeTitle: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  rhymeStat: { color: '#39FF14', fontSize: 10, marginTop: 5, fontWeight: 'bold' },
  rivalsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  rivalCard: { flex: 0.48, backgroundColor: '#1A1A1A', padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', position: 'relative' },
  rivalAvatar: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#39FF14' },
  rivalName: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  rivalScore: { color: '#888', fontSize: 10 },
  vsBadge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#39FF14', paddingHorizontal: 6, borderRadius: 4 },
  vsText: { color: '#000', fontSize: 8, fontWeight: '900' },
  battleCard: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#39FF14' },
  battleName: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  battleDate: { color: '#888', fontSize: 12, marginTop: 2 },
  checkInBtn: { backgroundColor: '#39FF14', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6, flexDirection: 'row', alignItems: 'center' },
  checkInText: { color: '#000', fontSize: 11, fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  menuDrawer: { backgroundColor: '#1A1A1A', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, paddingBottom: 40 },
  drawerIndicator: { width: 40, height: 5, backgroundColor: '#333', borderRadius: 5, alignSelf: 'center', marginBottom: 20 },
  menuOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  menuOptionText: { color: '#FFF', fontSize: 16, marginLeft: 15, fontWeight: '600' }
});