import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

const AppLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FF8800",
                tabBarInactiveTintColor: "#999",
                headerShown: false,
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
