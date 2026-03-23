import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. TIPAGEM
interface RodaLocal {
  id: string;
  nome: string;
  regiao: string;
  imagem: string;
}

export default function SearchWheels() {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('Todos');

  // 2. DADOS SIMULADOS
  const rodas: RodaLocal[] = [
    { id: '1', nome: 'Batalha do Tanque', regiao: 'São Gonçalo', imagem: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=200&auto=format&fit=crop' },
    { id: '2', nome: 'Roda de Macaé', regiao: 'Macaé (Litoral)', imagem: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=200&auto=format&fit=crop' },
    { id: '3', nome: 'Batalha da Aldeia', regiao: 'Barueri (SP)', imagem: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=200&auto=format&fit=crop' },
    { id: '4', nome: 'Roda Cultural de Olaria', regiao: 'Rio de Janeiro', imagem: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop' },
  ];

  const filtros = ['Todos','Rio de Janeiro', 'São Paulo', 'Minas Gerais'];

  return (
    <View style={styles.container}>
      
      {/* HEADER CURVO (Estilo Imagem) */}
      <View style={styles.headerImageBg}>
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Rodas</Text>
          <Text style={styles.headerSubtitle}>Seu proxímo passe...</Text>
        </View>
        {/* Curva branca simulada no final do header */}
        <View style={styles.headerCurve} />
      </View>

      {/* ÁREA DE BUSCA E FILTROS */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Buscar roda ou cidade..." 
            placeholderTextColor="#888"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterScroll}
          contentContainerStyle={{ paddingRight: 40 }}
        >
          {filtros.map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.filterChip, filterActive === item && styles.filterChipActive]}
              onPress={() => setFilterActive(item)}
            >
              <Text style={[styles.filterText, filterActive === item && styles.filterTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA DE RESULTADOS */}
      <FlatList 
        data={rodas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardSub}>{item.regiao}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' }, // Fundo claro como na foto
  
  // Header
  headerImageBg: { 
    height: 240, 
    backgroundColor: '#1A3A3A', // Verde escuro estilo Estrada Real
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  headerOverlay: { paddingHorizontal: 25, paddingTop: 40 },
  headerTitle: { color: '#FFF', fontSize: 34, fontWeight: 'bold' },
  headerSubtitle: { color: '#FFB800', fontSize: 22, fontWeight: '500', marginTop: 8 },
  headerCurve: {
    position: 'absolute',
    bottom: -1,
    width: '120%',
    height: 60,
    backgroundColor: '#F4F7F6',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    alignSelf: 'center'
  },

  // Busca
  searchSection: { marginTop: -20, paddingHorizontal: 20, zIndex: 10 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E2E8E7', 
    borderRadius: 12, 
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D9D8'
  },
  input: { flex: 1, color: '#333', fontSize: 16 },
  
  // Filtros
  filterScroll: { marginTop: 20, marginBottom: 10 },
  filterChip: { 
    backgroundColor: '#DDE5E4', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginRight: 10,
    height: 40
  },
  filterChipActive: { backgroundColor: '#1A3A3A' },
  filterText: { color: '#444', fontWeight: '500' },
  filterTextActive: { color: '#FFF' },

  // Lista
  listContent: { padding: 20, paddingBottom: 100 },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 25,
    backgroundColor: 'transparent'
  },
  cardImage: { 
    width: 110, 
    height: 75, 
    borderRadius: 12, 
    backgroundColor: '#DDD' 
  },
  cardInfo: { marginLeft: 15, flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  cardSub: { fontSize: 14, color: '#555', marginTop: 2 }
});