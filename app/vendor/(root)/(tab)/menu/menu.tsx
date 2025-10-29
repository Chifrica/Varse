import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const Menu = () => {
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  const [slideAnim] = useState(new Animated.Value(width)); // Start off-screen to the right

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide in to visible position
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleProfile = () => {
    router.navigate("/vendor/src/profile/myProfile")
  }

  const handleContact = () => {
    router.navigate("/vendor/(root)/src/contact/contactUs")
  }

  const handleSetting = () => {
    router.navigate("/vendor/(root)/src/setting/settings")
  }

  const menuItems = [
    { icon: "cart-outline", label: "My Orders"  },
    { icon: "person-outline", label: "Profile", onPress: handleProfile },
    { icon: "location-outline", label: "Address" },
    { icon: "card-outline", label: "Payment" },
    { icon: "call-outline", label: "Conact", onPress: handleContact },
    { icon: "help-circle-outline", label: "Help & FAQ" },
    { icon: "settings-outline", label: "Settings", onPress: handleSetting },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Animated Right-Side Modal */}
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* User Info */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Mohammed Jafar</Text>
            <Text style={styles.profileEmail}>chikaonwunali20122@gmail.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={[
                styles.menuItem,
                pressedItem === item.label && styles.menuItemActive,
              ]}
              onPressIn={() => setPressedItem(item.label)}
              onPressOut={() => setPressedItem(null)}
              onPress={() => {
                if (item.onPress) item.onPress()
              }}
            >
              <Ionicons name={item.icon as any} size={22} color="#FF8800" style={{backgroundColor: "#fff", padding: 10, borderRadius: 50}}/>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.menuItem,
            styles.logoutButton,
            pressedItem === "Logout" && styles.menuItemActive,
          ]}
          onPressIn={() => setPressedItem("Logout")}
          onPressOut={() => setPressedItem(null)}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF8800" style={{backgroundColor: "#fff", padding: 10, borderRadius: 50}}/>
          <Text style={[styles.menuText, { color: "#fff" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modal: {
    position: "absolute",
    top: 0,
    right: 0, 
    height: "100%",
    width: width * 0.85, 
    backgroundColor: "#FF8800",
    borderTopLeftRadius: 50,
    padding: 20,
    justifyContent: "flex-start",
    elevation: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    marginBottom: 40,
    gap: 15,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  profileEmail: {
    fontSize: 14,
    color: "#fff",
  },
  menuList: {
    flexGrow: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemActive: {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 12,
    color: "#fff",
    fontWeight: "600",
  },
  logoutButton: {
    position: "absolute",
    bottom: 40,
    width: "90%",
    alignSelf: "center",
  },
});
