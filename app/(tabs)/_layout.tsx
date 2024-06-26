import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="plumbing"
        options={{
          title: "Plumbing",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "water" : "water-outline"}
              color={focused ? "#98FB98" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wiring"
        options={{
          title: "Wiring",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bulb" : "bulb-outline"}
              color={focused ? "#FFFF00" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
