import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const AppLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FF8800",
                tabBarInactiveTintColor: "#999",
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontWeight: "900",
                    marginBottom: Platform.OS === "ios" ? 0 : 4,
                },
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                sceneStyle: {
                    backgroundColor: "#fff",
                    paddingBottom: 0,
                    marginTop: 0,
                    marginBottom: 50,
                },
            }
            }
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
                name="category/category"
                options={{
                    title: "Categories",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="th-list" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart/cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="shopping-cart" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile/profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default AppLayout;
