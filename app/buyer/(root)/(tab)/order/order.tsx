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

  /** ----------------------
   *  CART CALCULATIONS
   * ---------------------- */
  const subtotal = cartItems.reduce((totalPrice, item) => totalPrice + (item.totalPrice || 0), 0);
  const deliveryFee = 500;
  const discount = 0; // You can change this later
  const finalTotal = subtotal + deliveryFee - discount;

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

      <View style={{ marginTop: 20 }}>
        <View style={styles.summaryRow}>
          <Text>Subtotal</Text>
          <Text>{formatCurrency(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Delivery Fee</Text>
          <Text>{formatCurrency(deliveryFee)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Discount</Text>
          <Text>{formatCurrency(discount)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={{ fontWeight: "700" }}>Total</Text>
          <Text style={{ fontWeight: "700" }}>{formatCurrency(finalTotal)}</Text>
        </View>
      </View>

      {/* PROCEED BUTTON */}
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => Alert.alert("Proceeding", "Redirecting to payment...")}
      >
        <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
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

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  paymentButton: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
