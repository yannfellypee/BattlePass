import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

interface HeaderProps {
  title: string;
}

export function HeaderInternal({ title }: HeaderProps) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Salve, {user?.name}!</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#FF3333" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  welcome: { color: '#888', fontSize: 12 },
  title: { color: '#FFF', fontSize: 18, fontWeight: '900', fontStyle: 'italic' },
  logoutButton: { alignItems: 'center' },
  logoutText: { color: '#FF3333', fontSize: 10, fontWeight: 'bold' }
});