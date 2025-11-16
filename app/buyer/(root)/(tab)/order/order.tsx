import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { supabase } from "../../../../utils/supabase";

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const { parsedPrice } = useLocalSearchParams()

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cartItems");
        if (savedCart) setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    loadCart();
  }, []);

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return "₦" + num.toLocaleString();
  };

  const handleDelete = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
    Alert.alert("🗑️ Removed", "Item removed from your cart.");
  };

  const unpaidItems = cartItems.filter(item => !item.paid);
  const subtotal = unpaidItems.reduce((t, i) => t + (i.totalPrice || 0), 0);
  const deliveryFee = unpaidItems.length > 0 ? 500 : 0;

  const finalTotal = subtotal + deliveryFee;

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>

      {/* Product Image */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      ) : (
        <View style={styles.noImageBox}>
          <Text>No Image</Text>
        </View>
      )}

      <View style={styles.productDetails}>

        {/* Paid Badge */}
        {item.paid && (
          <View style={styles.paidBadge}>
            <Ionicons name="checkmark-circle" size={18} color="#28A745" />
            <Text style={styles.paidText}>Paid</Text>
          </View>
        )}

        {/* Name */}
        <Text style={styles.productName}>{item.name}</Text>

        {/* Qty */}
        <Text style={styles.qtyText}>Qty: {item.qty}</Text>

        {/* Base Price */}
        <Text style={styles.basePrice}>Base Price: {formatCurrency(item.totalPrice / item.qty)}</Text>

        {item.category === "food" && item.extras?.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.extraHeader}>Extras:</Text>

            {item.extras.map((extra, index) => (
              <View key={index} style={styles.extraRow}>
                <Text style={styles.extraName}>• {extra.name}</Text>
                <Text style={styles.extraPrice}>{formatCurrency(extra.price)}</Text>
              </View>
            ))}

            <Text style={styles.extraTotal}>
              Extras Total: {formatCurrency(item.extrasTotal)}
            </Text>
          </View>
        )}

        {/* Final Total */}
        <Text style={styles.finalTotal}>
          Total: {formatCurrency(item.totalPrice)}
        </Text>
      </View>

      {/* Delete button */}
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#FF4C4C" />
      </TouchableOpacity>

    </View>
  );

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    for (const item of cartItems) {
      const { error } = await supabase
        .from("orders")
        .insert({
          buyer_id: item.userId,      // buyer id
          vendor_id: item.vendorId || user.id,
          product_id: item.id,
          name: item.name,
          qty: item.qty,
          extras: item.extras || [],
          extras_total: item.extrasTotal || 0,
          total_price: item.totalPrice,
          image: item.image,
          paid: true
        });

      if (error) console.log("Insert error:", error);
    }

    Alert.alert("Success", "Order placed successfully!");
    router.push("/buyer/src/checkout/checkout");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/buyer/homePage/home")}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Empty State */}
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

      {/* Summary */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>{formatCurrency(finalTotal)}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.paymentButton} onPress={handleCheckout}>
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
    marginLeft: 140,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },
  qtyText: {
    fontSize: 14,
    marginTop: 4,
    color: "#333",
  },
  basePrice: {
    fontSize: 14,
    marginTop: 4,
    color: "#444",
  },

  paidBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F9EE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 5,
  },
  paidText: {
    marginLeft: 4,
    color: "#28A745",
    fontWeight: "700",
  },

  extraHeader: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 10,
  },
  extraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  extraName: {
    fontSize: 14,
    color: "#444",
  },
  extraPrice: {
    fontSize: 14,
    fontWeight: "600",
  },
  extraTotal: {
    fontWeight: "700",
    marginTop: 5,
    color: "#000",
  },
  finalTotal: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6A00",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 17,
    fontWeight: "700",
  },
  summaryValue: {
    fontSize: 17,
    fontWeight: "700",
  },

  paymentButton: {
    backgroundColor: "#FF8800",
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
