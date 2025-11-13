import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cartItems");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadCartItems();
  }, []);

  const formatCurrency = (amount) => {
    if (!amount) return "₦0";
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₦${formatted}`;
  };

  const handleDelete = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
    Alert.alert("🗑️ Removed", "Item removed from your cart.");
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
      ) : (
        <View style={styles.noImageBox}>
          <Text>No Image</Text>
        </View>
      )}

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>{formatCurrency(item.totalPrice)}</Text>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#FF4C4C" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/buyer/homePage/home")}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginLeft: 140,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  noImageBox: {
    width: 80,
    height: 80,
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#FF6A00",
    fontWeight: "700",
  },
});
