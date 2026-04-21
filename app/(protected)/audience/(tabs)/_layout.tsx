import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const NEON_GREEN = '#39FF14';
const DARK_BG = '#0D0D0D';
const TEXT_MUTED = '#666666';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: DARK_BG,
          borderTopColor: '#222',
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: NEON_GREEN,
        tabBarInactiveTintColor: TEXT_MUTED,
        tabBarShowLabel: false, 
      }}
    >
      {/* 1. Feed */}
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
          ),
        }}
      />
      
      {/* 3. Scan (Câmera Central) */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "camera" : "camera-outline"} size={32} color={color} />
          ),
        }}
      />
      
      {/* 4. Mapa */}
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "map" : "map-outline"} size={28} color={color} />
          ),
        }}
      />

      {/* 5. Perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={28} color={color} />
          ),
        }}
      />
        {/* 6. Assinante PRO (A Estrela) */}
        <Tabs.Screen
          name="pro"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "star" : "star-outline"} size={28} color={color} />
            ),
          }}
        />

      {/* Telas escondidas do menu inferior, mas que continuam existindo */}
      <Tabs.Screen name="ranking" options={{ href: null }} />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}