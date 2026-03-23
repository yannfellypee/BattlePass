import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados simulados da gestão do evento
const EVENT_DASHBOARD = {
  name: 'Batalha da Matriz',
  status: 'Em andamento', // ou 'Pendente', 'Finalizada'
  enrolledMCs: 12,
  maxMCs: 16,
  audienceCheckedIn: 84,
};

export default function OrganizerDashboardScreen() {
  const router = useRouter();

  const handleAction = (actionName: string) => {
    Alert.alert("Ação Selecionada", `A abrir o módulo de: ${actionName}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/feed')}>
          <Ionicons name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PAINEL DE <Text style={styles.textNeon}>GESTÃO</Text></Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Resumo do Evento */}
        <View style={styles.eventCard}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{EVENT_DASHBOARD.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.eventName}>{EVENT_DASHBOARD.name}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{EVENT_DASHBOARD.enrolledMCs}/{EVENT_DASHBOARD.maxMCs}</Text>
              <Text style={styles.statLabel}>MCs Inscritos</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{EVENT_DASHBOARD.audienceCheckedIn}</Text>
              <Text style={styles.statLabel}>Público (Check-in)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>AÇÕES DO EVENTO</Text>

        {/* Grelha de Ações */}
        <View style={styles.gridContainer}>
          
          <TouchableOpacity style={styles.actionCard} onPress={() => handleAction('Registar MCs')}>
            <Ionicons name="mic-outline" size={32} color="#FFF" />
            <Text style={styles.actionTitle}>Registar MCs</Text>
            <Text style={styles.actionDesc}>Adicionar à chave</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => handleAction('Validar Público')}>
            <Ionicons name="qr-code-outline" size={32} color="#FFF" />
            <Text style={styles.actionTitle}>Validar Público</Text>
            <Text style={styles.actionDesc}>Ler QR Codes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionCard, styles.actionCardHighlight]} onPress={() => handleAction('Declarar Vencedor')}>
            <Ionicons name="trophy-outline" size={32} color="#000" />
            <Text style={[styles.actionTitle, { color: '#000' }]}>Declarar Vencedor</Text>
            <Text style={[styles.actionDesc, { color: '#333' }]}>Finalizar batalha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => handleAction('Gerar Ranking')}>
            <Ionicons name="list-outline" size={32} color="#FFF" />
            <Text style={styles.actionTitle}>Gerar Ranking</Text>
            <Text style={styles.actionDesc}>Tabela oficial</Text>
          </TouchableOpacity>

        </View>

        {/* Botão de Finalizar */}
        <TouchableOpacity style={styles.dangerButton} onPress={() => Alert.alert('Atenção', 'Deseja encerrar este evento?')}>
          <Text style={styles.dangerButtonText}>ENCERRAR EVENTO</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, backgroundColor: '#121212', borderBottomWidth: 1, borderBottomColor: '#222' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },
  scrollContent: { padding: 20 },

  eventCard: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 20, borderWidth: 1, borderColor: '#333', marginBottom: 30 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#39FF1420', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#39FF14' },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#39FF14', marginRight: 6 },
  statusText: { color: '#39FF14', fontSize: 10, fontWeight: 'bold' },
  eventName: { color: '#FFF', fontSize: 24, fontWeight: '900', marginBottom: 20 },
  
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0D0D0D', padding: 15, borderRadius: 8 },
  statBox: { flex: 1, alignItems: 'center' },
  divider: { width: 1, height: 30, backgroundColor: '#333' },
  statNumber: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12, marginTop: 4 },

  sectionTitle: { color: '#888', fontSize: 14, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15 },
  
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionCard: { width: '48%', backgroundColor: '#1A1A1A', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#333', marginBottom: 15, alignItems: 'center', justifyContent: 'center' },
  actionCardHighlight: { backgroundColor: '#39FF14', borderColor: '#39FF14' },
  actionTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
  actionDesc: { color: '#888', fontSize: 11, marginTop: 4, textAlign: 'center' },

  dangerButton: { marginTop: 20, borderWidth: 1, borderColor: '#FF3333', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
  dangerButtonText: { color: '#FF3333', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
});