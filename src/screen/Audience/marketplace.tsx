import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados simulados da loja
const PRODUCTS = [
  { id: '1', name: 'Camiseta Oficial Batalha da Aldeia', price: 'R$ 89,90', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
  { id: '2', name: 'Boné Aba Reta MC Kaos', price: 'R$ 59,90', category: 'Acessórios', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop' },
  { id: '3', name: 'Ingresso VIP - Final Nacional', price: 'R$ 45,00', category: 'Ingressos', image: 'https://images.unsplash.com/photo-1540039155732-680874b8ce4b?q=80&w=500&auto=format&fit=crop' },
  { id: '4', name: 'Moletom Matriz Original', price: 'R$ 149,90', category: 'Vestuário', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop' },
];

export default function MarketplaceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LOJA DA <Text style={styles.textNeon}>CENA</Text></Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Promocional */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>APOIE A CULTURA LOCAL.</Text>
          <Text style={styles.promoSub}>Comprando aqui, você ajuda a manter as batalhas vivas na rua.</Text>
        </View>

        {/* Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Todos', 'Vestuário', 'Ingressos', 'Acessórios'].map((cat, i) => (
            <TouchableOpacity key={cat} style={[styles.categoryChip, i === 0 && styles.categoryChipActive]}>
              <Text style={[styles.categoryText, i === 0 && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grid de Produtos */}
        <View style={styles.productGrid}>
          {PRODUCTS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.tagCategory}><Text style={styles.tagText}>{item.category.toUpperCase()}</Text></View>
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.buyButton}>
                    <Ionicons name="add" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
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

  promoBanner: { backgroundColor: '#39FF14', padding: 20, borderRadius: 12, marginBottom: 20 },
  promoText: { color: '#000', fontSize: 18, fontWeight: '900', fontStyle: 'italic' },
  promoSub: { color: '#1A1A1A', fontSize: 12, fontWeight: 'bold', marginTop: 5 },

  categoryScroll: { marginBottom: 20 },
  categoryChip: { backgroundColor: '#1A1A1A', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  categoryChipActive: { backgroundColor: '#FFF', borderColor: '#FFF' },
  categoryText: { color: '#888', fontWeight: 'bold', fontSize: 12 },
  categoryTextActive: { color: '#000' },

  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '48%', backgroundColor: '#1A1A1A', borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  imageContainer: { height: 150, width: '100%', position: 'relative' },
  productImage: { width: '100%', height: '100%' },
  tagCategory: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  
  productInfo: { padding: 12 },
  productName: { color: '#FFF', fontSize: 12, fontWeight: 'bold', height: 35 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  productPrice: { color: '#39FF14', fontSize: 16, fontWeight: '900' },
  buyButton: { backgroundColor: '#39FF14', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});