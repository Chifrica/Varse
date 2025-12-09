import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import supabase from "../../../../../utils/supabase";
import styles from "./style";

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const handleBackArrow = () => router.back();

  // 🧠 Fetch the latest product from Supabase
  const fetchLatestProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("productsUpload")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching product:", "There's an error in fetching products.");
        Alert.alert("Error", "Unable to fetch latest product.");
      } else {
        setProduct(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      Alert.alert("Error", "Something went wrong while fetching product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProduct();
  }, []);

  // 🌀 Loading UI
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#FF8800" />
        <Text style={{ marginTop: 10, color: "#555" }}>Fetching latest product...</Text>
      </SafeAreaView>
    );
  }

  // ❗ No product found
  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Ionicons name="cube-outline" size={60} color="#ccc" />
        <Text style={{ marginTop: 15, fontSize: 16, color: "#555" }}>
          No product found. Please add one.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/vendor/(root)/src/product/addProduct")}
          style={{
            marginTop: 20,
            backgroundColor: "#FF8800",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Add Product
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const formatCurrency = (amount, currency = "NGN") => {
  if (isNaN(amount)) return "₦0";
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return currency === "NGN" ? `₦${formatted}` : formatted;
};

  // ✅ Display latest product details
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Summary</Text>
        </View>

        {/* Product Image Section */}
        <View style={styles.imageCard}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.image_url || "https://via.placeholder.com/300" }}
              style={styles.productImage}
              resizeMode="cover"
            />

            {/* Optional Top-right icons */}
            <View style={styles.topRightIcons}>
              <Ionicons name="create-outline" size={20} color="#FF8800" style={styles.icon} />
              <Ionicons name="camera-outline" size={20} color="#FF8800" style={styles.icon} />
            </View>
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsCard}>
          <View style={styles.productHeader}>
            <View>
              <Text style={styles.productName}>{product.productName}</Text>
              <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
            </View>
            <Text style={styles.inStock}>
              {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Category */}
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{product.category || "N/A"}</Text>
          </View>

          {/* Product ID (optional) */}
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Product ID</Text>
            <Text style={styles.value}>#{product.id}</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {product.description || "No description provided."}
          </Text>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="stats-chart-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reviewButton}>
            <Ionicons name="chatbubbles-outline" size={20} color="#FF8800" />
            <Text style={styles.reviewButtonText}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
