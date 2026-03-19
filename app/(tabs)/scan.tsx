import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7;

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Se a permissão ainda está carregando
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Se o usuário não deu permissão para a câmera
  if (!permission.granted) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="camera-outline" size={64} color="#39FF14" />
        <Text style={styles.permissionText}>Precisamos de acesso à sua câmera para ler os QR Codes das batalhas.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>LIBERAR CÂMERA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Função que roda quando um QR Code é lido
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    // Aqui no app real, você enviaria o "data" para a API do Supabase validar o check-in
    Alert.alert(
      "Passaporte Carimbado! 🔥",
      "Você acabou de receber o Carimbo de Público da Batalha da Matriz!",
      [{ text: "VER MEU PERFIL", onPress: () => router.push('/(tabs)/profile') }]
    );
  };

  const handleGpsCheckin = () => {
    Alert.alert("Buscando GPS...", "Validando sua localização com a praça do evento.");
  };

  return (
    <View style={styles.container}>
      {/* Câmera em Tela Cheia */}
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* Overlay escuro ao redor do scanner */}
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.title}>LER <Text style={styles.textNeon}>QR CODE</Text></Text>
            <Text style={styles.subtitle}>Aponte para o código do evento</Text>
          </View>

          {/* Mira do Scanner */}
          <View style={styles.scannerContainer}>
            <View style={styles.scannerBox}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              
              {scanned && (
                <TouchableOpacity style={styles.scanAgainBtn} onPress={() => setScanned(false)}>
                  <Text style={styles.scanAgainText}>LER NOVAMENTE</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Opção Alternativa de GPS */}
          <View style={styles.footer}>
            <Text style={styles.orText}>OU</Text>
            <TouchableOpacity style={styles.gpsButton} onPress={handleGpsCheckin}>
              <Ionicons name="location-outline" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.gpsButtonText}>CHECK-IN POR LOCALIZAÇÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  containerCenter: { flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center', padding: 20 },
  
  permissionText: { color: '#FFF', fontSize: 16, textAlign: 'center', marginTop: 20, marginBottom: 30 },
  permissionButton: { backgroundColor: '#39FF14', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12 },
  permissionButtonText: { color: '#000', fontWeight: '900', fontSize: 16 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'space-between' },
  
  header: { alignItems: 'center', marginTop: 80 },
  title: { fontSize: 24, fontWeight: '900', color: '#FFF', fontStyle: 'italic', letterSpacing: 1 },
  textNeon: { color: '#39FF14' },
  subtitle: { color: '#888', fontSize: 14, marginTop: 5 },

  scannerContainer: { alignItems: 'center', justifyContent: 'center' },
  scannerBox: { width: SCANNER_SIZE, height: SCANNER_SIZE, backgroundColor: 'transparent', position: 'relative', alignItems: 'center', justifyContent: 'center' },
  
  // Cantos do scanner estilo "Mira"
  corner: { position: 'absolute', width: 40, height: 40, borderColor: '#39FF14' },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },

  scanAgainBtn: { backgroundColor: '#1A1A1A', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, borderColor: '#39FF14' },
  scanAgainText: { color: '#39FF14', fontWeight: 'bold' },

  footer: { padding: 40, alignItems: 'center', paddingBottom: 60 },
  orText: { color: '#888', fontWeight: 'bold', marginBottom: 20 },
  gpsButton: { flexDirection: 'row', backgroundColor: '#39FF14', width: '100%', paddingVertical: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  gpsButtonText: { color: '#000', fontSize: 14, fontWeight: '900' },
});