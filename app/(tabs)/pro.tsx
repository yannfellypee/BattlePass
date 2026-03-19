import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProSubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'mc' | 'org'>('mc');

  const handleSubscribe = () => {
    Alert.alert("Redirecionando", "Abrindo gateway de pagamento (Stripe/MercadoPago)...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BATTLEPASS <Text style={styles.textNeon}>PRO</Text></Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, selectedPlan === 'mc' && styles.toggleActive]}
            onPress={() => setSelectedPlan('mc')}
          >
            <Text style={[styles.toggleText, selectedPlan === 'mc' && styles.toggleTextActive]}>MC PRO</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, selectedPlan === 'org' && styles.toggleActive]}
            onPress={() => setSelectedPlan('org')}
          >
            <Text style={[styles.toggleText, selectedPlan === 'org' && styles.toggleTextActive]}>ORGANIZADOR</Text>
          </TouchableOpacity>
        </View>

        {selectedPlan === 'mc' ? (
          <View style={styles.planCard}>
            <View style={styles.badgeNeon}><Text style={styles.badgeText}>PARA ATLETAS DA RIMA</Text></View>
            <Text style={styles.priceText}>R$ 9,90 <Text style={styles.monthText}>/mês</Text></Text>
            
            <View style={styles.featuresList}>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Selo de Perfil Verificado/Destacado</Text></View>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Estatísticas avançadas (Win Rate detalhado)</Text></View>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Histórico completo de batalhas e oponentes</Text></View>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Análise de desempenho por cidade</Text></View>
            </View>
          </View>
        ) : (
          <View style={styles.planCard}>
            <View style={styles.badgeNeon}><Text style={styles.badgeText}>PARA PRODUTORES</Text></View>
            <Text style={styles.priceText}>R$ 29,00 <Text style={styles.monthText}>/mês</Text></Text>
            
            <View style={styles.featuresList}>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Painel avançado de gestão da batalha</Text></View>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Chaveamento e ranking automáticos</Text></View>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Página oficial da batalha destacada no mapa</Text></View>
              <View style={styles.featureRow}><Ionicons name="checkmark-circle" size={20} color="#39FF14" /><Text style={styles.featureText}>Suporte para patrocínios in-app</Text></View>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>ASSINAR AGORA</Text>
        </TouchableOpacity>
        
        <Text style={styles.cancelText}>Cancele a qualquer momento. Sem fidelidade.</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, backgroundColor: '#121212' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },
  scrollContent: { padding: 20 },

  toggleContainer: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 5, marginBottom: 30, borderWidth: 1, borderColor: '#333' },
  toggleButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  toggleActive: { backgroundColor: '#39FF14' },
  toggleText: { color: '#888', fontWeight: 'bold', fontSize: 14 },
  toggleTextActive: { color: '#000', fontWeight: '900' },

  planCard: { backgroundColor: '#1A1A1A', borderRadius: 16, padding: 30, borderWidth: 2, borderColor: '#39FF14', shadowColor: '#39FF14', shadowOpacity: 0.1, shadowRadius: 20, marginBottom: 30 },
  badgeNeon: { alignSelf: 'flex-start', backgroundColor: '#39FF1420', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#39FF14', marginBottom: 20 },
  badgeText: { color: '#39FF14', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  priceText: { color: '#FFF', fontSize: 40, fontWeight: '900', marginBottom: 25 },
  monthText: { color: '#888', fontSize: 16, fontWeight: 'normal' },

  featuresList: { marginTop: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  featureText: { color: '#CCC', fontSize: 14, marginLeft: 12, flex: 1 },

  subscribeButton: { backgroundColor: '#39FF14', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
  subscribeButtonText: { color: '#000', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  cancelText: { color: '#666', fontSize: 12, textAlign: 'center', marginTop: 15 },
});