import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput style={styles.input} placeholder="Pesquisar MCs ou Rodas..." placeholderTextColor="#888" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20, paddingTop: 60 },
  searchBar: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 10, padding: 15, alignItems: 'center' },
  input: { color: '#FFF', marginLeft: 10, flex: 1 }
});