import React, { useContext } from 'react'; // Adicionado useContext
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Importe o seu contexto de autenticação
import { AuthContext } from '../../../../src/context/AuthContext';

const USER_DATA = {
  username: 'yannfellype_',
  name: 'Yann Fellype',
  artisticName: 'MC Kaos',
  role: 'MC', 
  level: 'Lenda da Batalha',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Kaos',
  social: { followers: '10.5k', following: 342 },
  stats: { battles: 53, wins: 14, streak: 4 },
  stamps: [
    { id: '1', name: 'Campeão', event: 'Batalha da Matriz', date: 'Ontem', icon: 'trophy', color: '#FFD700' },
    { id: '2', name: 'Presença', event: 'Batalha da Aldeia', date: 'Semana passada', icon: 'checkmark-circle', color: '#39FF14' },
    { id: '3', name: 'MC', event: 'Batalha do Tanque', date: 'Mês passado', icon: 'mic', color: '#FFF' },
    { id: '4', name: 'Presença', event: 'Batalha do Mirante', date: 'Há 2 meses', icon: 'checkmark-circle', color: '#39FF14' },
  ],
  myEvents: [
    { id: '1', name: 'Batalha da Matriz - Edição Especial', date: 'Sexta, 20h', status: 'Agendado' }
  ]
};

export default function ProfileScreen() {
  const router = useRouter();
  
  // Pegamos a função de deslogar do contexto
  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja encerrar sua sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: signOut }
      ]
    );
  };

  const handleMoreInfo = () => {
    Alert.alert("Performance do MC", "Títulos:\n🏆 Campeão Estadual 2023\n🏆 Bi-campeão Batalha da Matriz\n\nMelhor sequência: 12 vitórias");
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho Topo (Nome do Usuário) */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerUsername}>{USER_DATA.username}</Text>
          <Ionicons name="shield-checkmark" size={16} color="#39FF14" style={{ marginLeft: 6 }} />
        </View>

        {/* Botão de Logout adicionado ao lado do Menu */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('../settings')}>
            <Ionicons name="menu" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>
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
            <Text style={styles.artisticName}>{USER_DATA.artisticName || USER_DATA.name}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{USER_DATA.role.toUpperCase()}</Text>
            </View>
          </View>
          
          <Text style={styles.bioText}>Representando a cultura hip-hop. Fazendo rima de improviso nas ruas de Maceió. 🎤🔥</Text>
          <TouchableOpacity style={styles.linkButton}>
            <Ionicons name="link-outline" size={16} color="#E0F7FA" />
            <Text style={styles.bioLink}> instagram.com/yannfellype_</Text>
          </TouchableOpacity>
        </View>

        {/* Botões de Ação Principais (Editar/Compartilhar) */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Compartilhar perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* RENDERIZAÇÃO CONDICIONAL */}
        {USER_DATA.role === 'Organizer' ? (
          <View style={styles.organizerSection}>
            <TouchableOpacity 
              style={styles.createBattleButton} 
              activeOpacity={0.8}
              onPress={() => router.push('/organizer/create')}
            >
              <Ionicons name="add-circle" size={24} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.createBattleText}>CRIAR NOVA BATALHA</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>MEUS EVENTOS</Text>
            {USER_DATA.myEvents.map(ev => (
              <TouchableOpacity key={ev.id} style={styles.eventCard} onPress={() => router.push('/organizer/dashboard')}>
                <View>
                  <Text style={styles.eventName}>{ev.name}</Text>
                  <Text style={styles.eventDate}>{ev.date}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.mcSection}>
            {USER_DATA.role === 'MC' && (
              <View style={styles.mcStatsCard}>
                <View style={styles.mcLevelRow}>
                  <Ionicons name="star" size={16} color="#39FF14" />
                  <Text style={styles.mcLevelText}>{USER_DATA.level.toUpperCase()}</Text>
                  <TouchableOpacity style={styles.moreInfoButton} onPress={handleMoreInfo}>
                    <Text style={styles.moreInfoText}>Mais informações</Text>
                    <Ionicons name="information-circle" size={14} color="#39FF14" style={{ marginLeft: 4 }} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.mcStatsGrid}>
                  <View style={styles.mcStatBox}>
                    <Text style={styles.mcStatNumber}>{USER_DATA.stats.battles}</Text>
                    <Text style={styles.mcStatLabel}>Batalhas</Text>
                  </View>
                  <View style={styles.mcStatBox}>
                    <Text style={styles.mcStatNumber}>{USER_DATA.stats.wins}</Text>
                    <Text style={styles.mcStatLabel}>Vitórias</Text>
                  </View>
                  <View style={styles.mcStatBox}>
                    <Text style={styles.mcStatNumber}>{USER_DATA.stats.streak} 🔥</Text>
                    <Text style={styles.mcStatLabel}>Sequência</Text>
                  </View>
                </View>
              </View>
            )}

            <Text style={styles.sectionTitle}>MEU BATTLEPASS</Text>
            <View style={styles.stampsGrid}>
              {USER_DATA.stamps.map((stamp) => (
                <View key={stamp.id} style={styles.stampCard}>
                  <Ionicons name={stamp.icon as any} size={36} color={stamp.color} />
                  <Text style={styles.stampName}>{stamp.name}</Text>
                  <Text style={styles.stampEvent} numberOfLines={1}>{stamp.event}</Text>
                </View>
              ))}
              <View style={styles.emptyStampCard}><Ionicons name="lock-closed" size={20} color="#333" /></View>
              <View style={styles.emptyStampCard}><Ionicons name="lock-closed" size={20} color="#333" /></View>
            </View>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

// ... Estilos mantidos exatamente como estavam ...
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
  artisticName: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  roleBadge: { backgroundColor: '#1A1A1A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginLeft: 10, borderWidth: 1, borderColor: '#39FF14' },
  roleText: { color: '#39FF14', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  bioText: { color: '#CCC', fontSize: 14, lineHeight: 20 },
  linkButton: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  bioLink: { color: '#E0F7FA', fontSize: 14, fontWeight: 'bold' },
  actionButtonsRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' },
  actionButton: { flex: 1, backgroundColor: '#1A1A1A', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#333' },
  actionButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#222', marginVertical: 25 },
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, paddingHorizontal: 20, marginBottom: 15 },
  organizerSection: { paddingHorizontal: 20 },
  createBattleButton: { flexDirection: 'row', backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 30, shadowColor: '#39FF14', shadowOpacity: 0.3, shadowRadius: 10 },
  createBattleText: { color: '#000', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  eventCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1A1A1A', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#333', marginBottom: 10 },
  eventName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  eventDate: { color: '#39FF14', fontSize: 12 },
  mcSection: {},
  mcStatsCard: { backgroundColor: '#1A1A1A', marginHorizontal: 20, borderRadius: 16, padding: 15, marginBottom: 30, borderWidth: 1, borderColor: '#333' },
  mcLevelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  mcLevelText: { color: '#39FF14', fontSize: 12, fontWeight: '900', marginLeft: 6, flex: 1, letterSpacing: 1 },
  moreInfoButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  moreInfoText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  mcStatsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  mcStatBox: { alignItems: 'center', flex: 1 },
  mcStatNumber: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  mcStatLabel: { color: '#888', fontSize: 12, marginTop: 4 },
  stampsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
  stampCard: { width: '31%', backgroundColor: '#1A1A1A', padding: 15, borderRadius: 16, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  stampName: { color: '#FFF', fontSize: 11, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  stampEvent: { color: '#888', fontSize: 9, textAlign: 'center', marginTop: 4 },
  emptyStampCard: { width: '31%', height: 100, backgroundColor: 'transparent', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#222', borderStyle: 'dashed' },
});