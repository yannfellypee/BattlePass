import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// ==========================================
// 🧠 SESSÃO DO USUÁRIO (Simulação)
// Agora tudo é decidido EXCLUSIVAMENTE pelo papel escolhido no chooseRole!
// ==========================================
const SESSAO_ATUAL = {
  nome: 'Yann',
  role: 'jurado', // ⬅️ TESTE AQUI: 'audiencia', 'mc', 'poeta', 'organizador', 'jurado'
};

// ==========================================
// DADOS MOCKADOS
// ==========================================
const PROXIMAS_BATALHAS = [
  { id: '1', nome: 'Batalha da Matriz', local: 'Praça Central', data: 'Hoje, 20h', status: 'Inscrições Abertas' },
  { id: '2', nome: 'Slam Resistência', local: 'Mirante', data: 'Sábado, 19h', status: 'Buscando Jurados' },
];

const ULTIMOS_RESULTADOS = [
  { id: '3', nome: 'Batalha do Tanque', vencedor: 'MC Kaos', data: 'Sexta passada' },
];

const RANKING = [
  { id: '1', nome: 'MC Kaos', vitorias: 14, tag: 'Lenda' },
  { id: '2', nome: 'Poeta Jhon', vitorias: 10, tag: 'Slammer' },
];

export default function HomeFeedScreen() {
  const router = useRouter();

  // Variável inteligente para agrupar quem rima/recita
  const isArtista = SESSAO_ATUAL.role === 'mc' || SESSAO_ATUAL.role === 'poeta';

  return (
    <View style={styles.container}>
      {/* HEADER UNIVERSAL */}
      <View style={styles.header}>
        <Text style={styles.title}>STREET <Text style={styles.textNeon}>PASS</Text></Text>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ========================================== */}
        {/* 🚀 LENTE 1: O JURADO */}
        {/* ========================================== */}
        {SESSAO_ATUAL.role === 'jurado' && (
          <View style={styles.juradoPanel}>
            <View style={styles.juradoHeader}>
              <Ionicons name="star" size={20} color="#000" />
              <Text style={styles.juradoTitle}>MESA DO JÚRI</Text>
            </View>
            <Text style={styles.juradoText}>Você está escalado para a Batalha da Matriz. Acesse o painel para votar nos rounds de hoje.</Text>
            <TouchableOpacity style={styles.btnJurado}>
              <Text style={styles.btnJuradoText}>ABRIR PAINEL DE NOTAS</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ========================================== */}
        {/* 🚀 LENTE 2: O ORGANIZADOR */}
        {/* ========================================== */}
        {SESSAO_ATUAL.role === 'organizador' && (
          <View style={styles.organizadorPanel}>
            <View style={styles.orgHeader}>
              <Text style={styles.panelTag}>MEU EVENTO</Text>
              <TouchableOpacity><Ionicons name="settings-outline" size={20} color="#888" /></TouchableOpacity>
            </View>
            <Text style={styles.orgEventName}>Batalha da Matriz</Text>
            
            <View style={styles.orgStats}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>16</Text>
                <Text style={styles.statLabel}>MCs Inscritos</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>3/3</Text>
                <Text style={styles.statLabel}>Jurados</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>142</Text>
                <Text style={styles.statLabel}>Confirmados</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.btnOrg}>
              <Text style={styles.btnOrgText}>GERENCIAR CHAVEAMENTO</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ========================================== */}
        {/* 🌍 FEED UNIVERSAL (Descoberta) */}
        {/* ========================================== */}

        <Text style={styles.sectionTitle}>ROLANDO NA CENA</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {PROXIMAS_BATALHAS.map((batalha) => (
            <TouchableOpacity key={batalha.id} style={styles.cardEvento}>
              <View style={styles.tagNeon}><Text style={styles.tagText}>{batalha.status}</Text></View>
              <Text style={styles.cardTitle}>{batalha.nome}</Text>
              <Text style={styles.cardInfo}><Ionicons name="location" size={12} /> {batalha.local}</Text>
              <Text style={styles.cardInfo}><Ionicons name="time" size={12} /> {batalha.data}</Text>
              
              {/* === LENTES DE AÇÃO DO CARD === */}
              
              {/* Artista (MC/Poeta): Inscrever-se na batalha */}
              {isArtista && batalha.status === 'Inscrições Abertas' && (
                 <TouchableOpacity style={styles.btnCardCompetidor}>
                   <Text style={styles.btnCardCompetidorText}>INSCREVER-SE NA CHAVE</Text>
                 </TouchableOpacity>
              )}

              {/* Audiência: Dar o RSVP (Vou colar) */}
              {SESSAO_ATUAL.role === 'audiencia' && (
                 <TouchableOpacity style={styles.btnCardAudiencia}>
                   <Text style={styles.btnCardAudienciaText}>VOU COLAR</Text>
                 </TouchableOpacity>
              )}

              {/* Candidatura a Jurado (Qualquer um que não seja o organizador pode tentar a vaga, incluindo a audiência e artistas) */}
              {batalha.status === 'Buscando Jurados' && SESSAO_ATUAL.role !== 'organizador' && (
                 <TouchableOpacity style={styles.btnCardCandidato}>
                   <Text style={styles.btnCardCandidatoText}>CANDIDATAR A JURADO</Text>
                 </TouchableOpacity>
              )}

            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RESULTADOS E RANKING */}
        <Text style={styles.sectionTitle}>ÚLTIMOS CAMPEÕES</Text>
        {ULTIMOS_RESULTADOS.map((resultado) => (
          <View key={resultado.id} style={styles.cardResultado}>
            <View>
              <Text style={styles.cardTitle}>{resultado.nome}</Text>
              <Text style={styles.cardInfo}>{resultado.data}</Text>
            </View>
            <View style={styles.badgeVencedor}>
              <Ionicons name="trophy" size={14} color="#000" />
              <Text style={styles.vencedorText}>{resultado.vencedor}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>RANKING DA CIDADE</Text>
        <View style={styles.rankingContainer}>
          {RANKING.map((atleta, index) => (
            <View key={atleta.id} style={styles.rankingRow}>
              <Text style={styles.rankingPos}>{index + 1}</Text>
              <View style={{flex: 1}}>
                <Text style={styles.atletaNome}>{atleta.nome}</Text>
                <Text style={styles.atletaTag}>{atleta.tag}</Text>
              </View>
              <Text style={styles.atletaVitorias}>{atleta.vitorias} vitórias</Text>
            </View>
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50, borderBottomWidth: 1, borderColor: '#222' },
  title: { fontSize: 22, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  textNeon: { color: '#39FF14' },
  scrollContent: { padding: 20 },
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15, marginTop: 10 },

  // --- PAINEL: MESA DO JÚRI ---
  juradoPanel: { backgroundColor: '#39FF14', borderRadius: 12, padding: 15, marginBottom: 20 },
  juradoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  juradoTitle: { color: '#000', fontSize: 16, fontWeight: '900', marginLeft: 8 },
  juradoText: { color: '#222', fontSize: 13, marginBottom: 15 },
  btnJurado: { backgroundColor: '#000', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnJuradoText: { color: '#39FF14', fontWeight: 'bold' },

  // --- PAINEL: ORGANIZADOR ---
  organizadorPanel: { backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#333', borderRadius: 12, padding: 15, marginBottom: 20 },
  orgHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  panelTag: { color: '#39FF14', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  orgEventName: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  orgStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#0D0D0D', padding: 10, borderRadius: 8 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 10, marginTop: 2 },
  btnOrg: { backgroundColor: '#333', paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#555' },
  btnOrgText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  // --- CARDS DO FEED ---
  horizontalScroll: { marginBottom: 20 },
  cardEvento: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 15, marginRight: 15, width: 260, borderWidth: 1, borderColor: '#222' },
  tagNeon: { backgroundColor: '#39FF1420', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 10, borderWidth: 1, borderColor: '#39FF14' },
  tagText: { color: '#39FF14', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardInfo: { color: '#888', fontSize: 13, marginBottom: 4 },
  
  btnCardCompetidor: { marginTop: 15, backgroundColor: '#39FF14', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  btnCardCompetidorText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  btnCardAudiencia: { marginTop: 15, borderWidth: 1, borderColor: '#333', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  btnCardAudienciaText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  btnCardCandidato: { marginTop: 10, backgroundColor: '#333', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnCardCandidatoText: { color: '#FFF', fontWeight: 'bold', fontSize: 11 },

  cardResultado: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 15, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  badgeVencedor: { backgroundColor: '#39FF14', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  vencedorText: { color: '#000', fontWeight: 'bold', fontSize: 12, marginLeft: 5 },

  rankingContainer: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#222' },
  rankingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  rankingPos: { color: '#39FF14', fontSize: 20, fontWeight: '900', width: 30 },
  atletaNome: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  atletaTag: { color: '#888', fontSize: 12 },
  atletaVitorias: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
});