import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  // ==========================================
  // LÓGICA DE AÇÕES
  // ==========================================
  
  const handleChangeRole = () => {
    // Redireciona para o seletor de classe que o Zod está protegendo
    router.push('../auth/chooseRole');
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair do StreetPass",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: () => {
            console.log("Sessão encerrada!");
            // Joga de volta para o login
            router.replace('../auth/login'); 
          }
        }
      ]
    );
  };

  // Componente de botão reutilizável e SEGURO (usando ternários ao invés de &&)
  const SettingsOption = ({ icon, title, subtitle, onPress, isDanger = false }: any) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrapper, isDanger ? styles.iconWrapperDanger : null]}>
        <Ionicons name={icon} size={20} color={isDanger ? "#FF3333" : "#39FF14"} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={[styles.optionTitle, isDanger ? styles.textDanger : null]}>{title}</Text>
        {/* Aqui estava o erro! O ternário evita que um texto vazio quebre o React Native */}
        {subtitle ? <Text style={styles.optionSubtitle}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color={isDanger ? "#FF3333" : "#444"} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONFIGURAÇÕES</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* BLOCO: CONTA E IDENTIDADE */}
        <Text style={styles.sectionTitle}>SUA IDENTIDADE</Text>
        <View style={styles.sectionGroup}>
          <SettingsOption 
            icon="person-circle-outline" 
            title="Editar Dados Básicos" 
            subtitle="Nome, E-mail e Senha"
            onPress={() => console.log('Editar perfil')} 
          />
          <View style={styles.divider} />
          <SettingsOption 
            icon="swap-horizontal" 
            title="Mudar meu Papel na Cena" 
            subtitle="Mudar para MC, Poeta, Jurado, etc."
            onPress={handleChangeRole} 
          />
        </View>

        {/* BLOCO: PREFERÊNCIAS */}
        <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
        <View style={styles.sectionGroup}>
          <SettingsOption 
            icon="notifications-outline" 
            title="Notificações" 
            onPress={() => console.log('Notificações')} 
          />
          <View style={styles.divider} />
          <SettingsOption 
            icon="color-palette-outline" 
            title="Aparência do App" 
            subtitle="Modo Escuro / Claro"
            onPress={() => console.log('Aparência')} 
          />
        </View>

        {/* BLOCO: SOBRE */}
        <Text style={styles.sectionTitle}>SOBRE O STREETPASS</Text>
        <View style={styles.sectionGroup}>
          <SettingsOption 
            icon="shield-checkmark-outline" 
            title="Termos de Uso e Privacidade" 
            onPress={() => console.log('Termos')} 
          />
          <View style={styles.divider} />
          <SettingsOption 
            icon="help-buoy-outline" 
            title="Central de Ajuda" 
            onPress={() => console.log('Ajuda')} 
          />
        </View>

        {/* ZONA DE PERIGO (LOGOUT) */}
        <Text style={[styles.sectionTitle, styles.dangerTitle]}>ZONA DE PERIGO</Text>
        <View style={[styles.sectionGroup, styles.dangerGroup]}>
          <SettingsOption 
            icon="log-out-outline" 
            title="Sair da Conta" 
            isDanger={true}
            onPress={handleLogout} 
          />
        </View>

        <Text style={styles.versionText}>StreetPass v1.0.0</Text>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, borderBottomWidth: 1, borderColor: '#222' },
  backButton: { padding: 5 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1.5 },
  headerSpacer: { width: 34 }, // Ocupa espaço para o título ficar centralizado
  
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  
  sectionTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 10, marginTop: 15 },
  dangerTitle: { color: '#FF3333', marginTop: 10 },
  
  sectionGroup: { backgroundColor: '#1A1A1A', borderRadius: 16, borderWidth: 1, borderColor: '#222', marginBottom: 20, overflow: 'hidden' },
  dangerGroup: { borderColor: '#FF333330' },
  
  optionCard: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  
  iconWrapper: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#39FF1415', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconWrapperDanger: { backgroundColor: '#FF333315' },
  
  optionTextContainer: { flex: 1 },
  optionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  optionSubtitle: { color: '#888', fontSize: 12, marginTop: 2 },
  
  textDanger: { color: '#FF3333' },
  
  divider: { height: 1, backgroundColor: '#222', marginLeft: 70 }, 
  
  versionText: { color: '#444', textAlign: 'center', fontSize: 12, fontWeight: 'bold', marginTop: 20 },
  bottomSpacer: { height: 40 },
});