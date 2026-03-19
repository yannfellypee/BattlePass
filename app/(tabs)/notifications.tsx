import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dados simulados de notificações
const NOTIFICATIONS = [
  { id: '1', type: 'ranking', title: 'Você subiu no Ranking!', desc: 'Você alcançou a posição #14 na sua cidade.', time: 'Há 2 horas', read: false },
  { id: '2', type: 'battle', title: 'Batalha da Matriz hoje', desc: 'A batalha começa em 3 horas. Não se esqueça do seu check-in.', time: 'Há 5 horas', read: false },
  { id: '3', type: 'stamp', title: 'Novo Carimbo Recebido', desc: 'Carimbo de Público adicionado ao seu passaporte.', time: 'Ontem', read: true },
  { id: '4', type: 'result', title: 'Resultado: Batalha da Aldeia', desc: 'MC Kant levou o título desta edição. Veja o chaveamento completo.', time: 'Há 2 dias', read: true },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case 'ranking': return 'trending-up';
      case 'battle': return 'mic';
      case 'stamp': return 'qr-code';
      case 'result': return 'trophy';
      default: return 'notifications';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SUAS <Text style={styles.textNeon}>NOTIFICAÇÕES</Text></Text>
        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={24} color="#39FF14" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {NOTIFICATIONS.map((notif) => (
          <TouchableOpacity key={notif.id} style={[styles.notificationCard, !notif.read && styles.notificationUnread]}>
            <View style={styles.iconContainer}>
              <Ionicons name={getIcon(notif.type) as any} size={24} color={notif.read ? '#888' : '#39FF14'} />
            </View>
            <View style={styles.notifContent}>
              <Text style={[styles.notifTitle, !notif.read && styles.textWhite]}>{notif.title}</Text>
              <Text style={styles.notifDesc} numberOfLines={2}>{notif.desc}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            {!notif.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
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

  notificationCard: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#222', alignItems: 'flex-start' },
  notificationUnread: { borderColor: '#39FF1430', backgroundColor: '#151515' },
  
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  
  notifContent: { flex: 1 },
  notifTitle: { color: '#CCC', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  textWhite: { color: '#FFF' },
  notifDesc: { color: '#888', fontSize: 12, lineHeight: 18 },
  notifTime: { color: '#666', fontSize: 10, marginTop: 8 },

  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#39FF14', marginTop: 5 },
});