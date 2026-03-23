import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CreateBattleScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    city: '',
    location: '',
    date: '',
    description: ''
  });

  const handleCreate = () => {
    // Aqui seria feita a chamada à API (Supabase) para criar o evento
    // Após criar, redireciona o organizador para o painel de gestão do evento
    router.push('../organizer/dashboard');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>CRIAR <Text style={styles.textNeon}>BATALHA</Text></Text>
          <Text style={styles.subtitle}>Registe o seu evento no mapa.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>NOME DA BATALHA</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Batalha da Matriz" 
            placeholderTextColor="#666"
            value={form.name}
            onChangeText={(text) => setForm({...form, name: text})}
          />

          <Text style={styles.label}>CIDADE</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: São Paulo, SP" 
            placeholderTextColor="#666"
            value={form.city}
            onChangeText={(text) => setForm({...form, city: text})}
          />

          <Text style={styles.label}>LOCAL EXATO</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Praça do Relógio, Centro" 
            placeholderTextColor="#666"
            value={form.location}
            onChangeText={(text) => setForm({...form, location: text})}
          />

          <Text style={styles.label}>DATA E HORA</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Sexta-feira, 20:00" 
            placeholderTextColor="#666"
            value={form.date}
            onChangeText={(text) => setForm({...form, date: text})}
          />

          <Text style={styles.label}>DESCRIÇÃO</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Regras, premiação, informações adicionais..." 
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={form.description}
            onChangeText={(text) => setForm({...form, description: text})}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreate}>
            <Text style={styles.buttonPrimaryText}>PUBLICAR BATALHA</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 20 },
  header: { marginTop: 50, marginBottom: 30 },
  backButton: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  textNeon: { color: '#39FF14' },
  subtitle: { color: '#888', fontSize: 14, marginTop: 5 },
  
  form: { paddingBottom: 20 },
  label: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8, marginTop: 15 },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 15,
    height: 60,
    color: '#FFF',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  
  buttonPrimary: {
    backgroundColor: '#39FF14',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#39FF14',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonPrimaryText: { color: '#000', fontSize: 16, fontWeight: '900' },
});