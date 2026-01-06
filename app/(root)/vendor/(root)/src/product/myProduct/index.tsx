import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteItem, getAllItem } from "../../../../../../api/varse";
import styles from "./_style";

const formatCurrency = (amount, currency = "NGN") => {
  if (isNaN(amount)) return "₦0";
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return currency === "NGN" ? `₦${formatted}` : formatted;
};

const AddProduct = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllItem();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Automatically refetch whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const confirmDelete = (id, name) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem(id); // delete from Supabase
              setProducts((prev) => prev.filter((item) => item.id !== id)); // update UI
            } catch (error) {
              Alert.alert("Error", "Failed to delete the product. Try again.");
            }
          },
        },
      ]
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>My Products</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search product..."
            placeholderTextColor="#999"
          />
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FF8800"
            style={{ marginTop: 50 }}
          />
        ) : products.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No products yet
          </Text>
        ) : (
          products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image
                source={{
                  uri: item.image_url || "https://via.placeholder.com/150",
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.price}>
                  {formatCurrency(item.price, "NGN")}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="create-outline" size={18} color="#FF8800" />
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => confirmDelete(item.id, item.name)}
                  >
                    <Ionicons name="trash-outline" size={18} color="red" />
                    <Text style={[styles.actionText, { color: "red" }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.stock}>
                {item.stockQuantity ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.navigate("/vendor/src/product/addProduct")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddProduct;