import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. DEFINIÇÃO DE TIPOS (INTERFACES)
interface Conquista {
  id: string;
  nome: 'Visitante' | 'Batalhei' | 'Campeão';
  status: 'locked' | 'unlocked';
  data?: string;
  icone: keyof typeof Ionicons.glyphMap;
}

interface RodaRima {
  id: string;
  nome: string;
  cor: string;
  conquistas: Conquista[];
}

const { width } = Dimensions.get('window');

export default function StreetPassPassport() {
  const [progress] = useState(15);

  // 2. DADOS MOCKADOS (Simulando o que viria do seu banco de dados)
  const rodas: RodaRima[] = [
    {
      id: '1',
      nome: 'Batalha do Tanque',
      cor: '#1A3A3A', // Estilo Caminho Novo
      conquistas: [
        { id: 'v1', nome: 'Visitante', status: 'unlocked', data: '21.02.2026', icone: 'eye-outline' },
        { id: 'b1', nome: 'Batalhei', status: 'unlocked', data: '21.02.2026', icone: 'mic-outline' },
        { id: 'c1', nome: 'Campeão', status: 'locked', icone: 'trophy-outline' },
      ]
    },
    {
      id: '2',
      nome: 'Roda de Macaé',
      cor: '#1A2A3A', // Estilo Caminho dos Diamantes
      conquistas: [
        { id: 'v2', nome: 'Visitante', status: 'unlocked', data: '02.03.2026', icone: 'eye-outline' },
        { id: 'b2', nome: 'Batalhei', status: 'locked', icone: 'mic-outline' },
        { id: 'c2', nome: 'Campeão', status: 'locked', icone: 'trophy-outline' },
      ]
    },
    {
      id: '3',
      nome: 'Batalha da Aldeia',
      cor: '#3A2A1A', // Estilo Caminho Velho
      conquistas: [
        { id: 'v3', nome: 'Visitante', status: 'locked', icone: 'eye-outline' },
        { id: 'b3', nome: 'Batalhei', status: 'locked', icone: 'mic-outline' },
        { id: 'c3', nome: 'Campeão', status: 'locked', icone: 'trophy-outline' },
      ]
    }
  ];

  // 3. RENDERIZAÇÃO DO CARIMBO INDIVIDUAL
  const renderSelo = (item: Conquista) => {
    const isLocked = item.status === 'locked';
    
    return (
      <View style={styles.seloWrapper}>
        <View style={[styles.seloOuter, isLocked && styles.seloLocked]}>
          <View style={styles.seloInner}>
            <Ionicons 
              name={isLocked ? "lock-closed" : item.icone} 
              size={26} 
              color={isLocked ? "#444" : "#39FF14"} 
            />
          </View>
          
          {!isLocked && (
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark" size={10} color="#000" />
            </View>
          )}
        </View>
        
        <Text style={[styles.seloLabel, isLocked && {color: '#555'}]}>{item.nome}</Text>
        {!isLocked && <Text style={styles.seloData}>{item.data}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER DE PROGRESSO (ESTILO ESTRADA REAL) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MARCOS</Text>
        <Text style={styles.headerSubtitle}>Pontos essenciais para sua experiência</Text>
        
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>CERTIFICADO STREET PASS</Text>
            <Text style={styles.progressValue}>{progress}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {rodas.map((roda) => (
          <View key={roda.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{roda.nome}</Text>
              <Ionicons name="chevron-forward" size={18} color="#666" />
            </View>

            <View style={[styles.card, { backgroundColor: roda.cor }]}>
              <View style={styles.selosContainer}>
                {roda.conquistas.map((conquista) => (
                  <React.Fragment key={conquista.id}>
                    {renderSelo(conquista)}
                  </React.Fragment>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* BOTÃO FLUTUANTE DE CARIMBAR */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => Alert.alert("Validação", "Aponte para o QR Code oficial da Roda para carimbar seu passaporte.")}
      >
        <Ionicons name="qr-code-outline" size={24} color="#000" />
        <Text style={styles.fabText}>CARIMBAR NO LOCAL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', paddingTop: 60 },
  
  // Header
  header: { paddingHorizontal: 20, marginBottom: 25 },
  headerTitle: { color: '#FFF', fontSize: 34, fontWeight: 'bold' },
  headerSubtitle: { color: '#FFB800', fontSize: 20, fontWeight: '500', marginTop: 4 },
  
  // Progress Bar
  progressSection: { marginTop: 25 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#39FF14', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  progressValue: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  progressBarBg: { height: 4, backgroundColor: '#222', borderRadius: 2 },
  progressBarFill: { height: '100%', backgroundColor: '#39FF14', borderRadius: 2 },

  // Rodas/Cards
  section: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginBottom: 10 },
  sectionTitle: { color: '#FFF', fontSize: 22, fontWeight: '600' },
  
  card: {
    marginHorizontal: 15,
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 10,
    // Sombra para profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  selosContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  
  // Estilo do Selo/Carimbo
  seloWrapper: { alignItems: 'center', width: width / 3.8 },
  seloOuter: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#39FF14',
    marginBottom: 8,
    position: 'relative'
  },
  seloLocked: {
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  seloInner: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#39FF14',
    borderRadius: 10,
    padding: 2,
    borderWidth: 2,
    borderColor: '#0D0D0D'
  },
  seloLabel: { color: '#FFF', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  seloData: { color: '#888', fontSize: 9, marginTop: 3 },

  // Botão Flutuante (FAB)
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#39FF14',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 35,
    shadowColor: '#39FF14',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  fabText: { color: '#000', fontWeight: '900', marginLeft: 12, fontSize: 14 }
});