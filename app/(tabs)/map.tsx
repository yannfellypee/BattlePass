import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados simulados de batalhas para o mapa
const BATTLES_LOCATIONS = [
  { id: '1', name: 'Batalha da Matriz', date: 'Hoje, 20h', latitude: -23.5505, longitude: -46.6333, type: 'live' },
  { id: '2', name: 'Batalha da Aldeia', date: 'Amanhã, 19h', latitude: -23.5062, longitude: -46.8753, type: 'upcoming' },
];

export default function MapScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filters = ['Todas', 'Hoje', 'Populares', 'Perto de Mim'];

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa e Filtros Flutuante */}
      <View style={styles.headerOverlay}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" />
          <Text style={styles.searchText}>Procurar batalhas na cidade...</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter} 
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Mapa Interativo */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        userInterfaceStyle="dark"
      >
        {BATTLES_LOCATIONS.map((battle) => (
          <Marker
            key={battle.id}
            coordinate={{ latitude: battle.latitude, longitude: battle.longitude }}
            // Correção da rota dinâmica para o TypeScript parar de reclamar:
            onPress={() => router.push({ pathname: '/battle/[id]', params: { id: battle.id } })}
          >
            <View style={styles.markerContainer}>
              <View style={[styles.markerPin, battle.type === 'live' ? styles.markerLive : styles.markerUpcoming]}>
                <Ionicons name="mic" size={16} color="#000" />
              </View>
              <View style={styles.markerLabel}>
                <Text style={styles.markerLabelText}>{battle.name}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Botão de Centralizar (GPS) */}
      <TouchableOpacity style={styles.gpsButton}>
        <Ionicons name="locate" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  
  headerOverlay: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1AE6', paddingHorizontal: 15, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#333' },
  searchText: { color: '#888', marginLeft: 10, fontSize: 16 },
  
  filtersContainer: { marginTop: 15 },
  filterChip: { backgroundColor: '#1A1A1AE6', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  filterChipActive: { backgroundColor: '#39FF14', borderColor: '#39FF14' },
  filterText: { color: '#888', fontWeight: 'bold' },
  filterTextActive: { color: '#000' },

  markerContainer: { alignItems: 'center' },
  markerPin: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#000', shadowColor: '#39FF14', shadowOpacity: 0.8, shadowRadius: 10 },
  markerLive: { backgroundColor: '#39FF14' }, // Verde Neon para batalhas a acontecer
  markerUpcoming: { backgroundColor: '#FFF' }, // Branco para futuras
  markerLabel: { backgroundColor: '#1A1A1A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4, borderWidth: 1, borderColor: '#333' },
  markerLabelText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

  gpsButton: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#39FF14', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5 },
});