import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF8800",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "900",
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarStyle: {
        //   backgroundColor: "#fff",
        //   borderTopWidth: 0,
        //   elevation: 8,
        //   shadowColor: "#000",
        //   shadowOpacity: 0.08,
        //   shadowRadius: 4,
        //   height: 65,
        //   paddingBottom: Platform.OS === "ios" ? 10 : 6,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
        },
        sceneStyle: {
          backgroundColor: "#fff", 
          paddingBottom: 0, 
          marginTop: 0,
          marginBottom: 50,
        },
      }}
    >
      <Tabs.Screen
        name="homePage/home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="order/order"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="message/message"
        options={{
          title: "Message",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="comments" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu/menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bars" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
