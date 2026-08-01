import { Tabs, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from "react-native";

export default function TabsLayout() {
  const router = useRouter();

  const BotonRegresar = () => (
    <Pressable onPress={() => router.back()} style={{ paddingHorizontal: 12 }}>
      <Ionicons name="chevron-back" size={24} color="#1F2937" />
    </Pressable>
  );

  return (
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Inicio", href:null }} />
        <Tabs.Screen name="alta" options={{ title: "Formulario",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-add" size={20} color={"red"} /> ),
                }} 
         />
        <Tabs.Screen name="consulta" options={{ title: "Listado",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={20} color={"green"} /> ),
                }} 
         />

        <Tabs.Screen
          name="detalle/[id]"
          options={{
            href: null,
            headerShown: true,
            title: "Detalle del usuario",
            headerLeft: BotonRegresar,
          }}
        />
        <Tabs.Screen
          name="actualizar/[id]"
          options={{
            href: null,
            headerShown: true,
            title: "Actualizar Usuario",
            headerLeft: BotonRegresar,
          }}
        />
      </Tabs>
  ); 
}