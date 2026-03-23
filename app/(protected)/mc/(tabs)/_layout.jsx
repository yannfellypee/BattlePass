import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function McTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#0D0D0D', 
          borderTopColor: '#1A1A1A', 
          height: 65, 
          paddingBottom: 10 
        },
        tabBarActiveTintColor: '#39FF14',
        tabBarInactiveTintColor: '#555',
        tabBarShowLabel: false,
      }}
    >
      {/* 1. ABA HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={26} color={color} />
          ),
        }}
      />

      {/* 2. ABA MUNDO / STREETPASS */}
      <Tabs.Screen
        name="streetPass"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "earth" : "earth-outline"} size={28} color={color} />
          ),
        }}
      />

      {/* 3. ABA PESQUISA */}
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={26} color={color} />
          ),
        }}
      />

      {/* 4. ABA PLANOS */}
      <Tabs.Screen
        name="planos"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "card" : "card-outline"} size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}