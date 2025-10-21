import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddProduct = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.back();
  };

  const handleAddProduct = () => {
    router.navigate("/vendor/(root)/src/product/addProduct"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>My Products</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search product..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <Image
            source={require("../../../../../assets/icons/logo.png")}
            style={styles.productImage}
          />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>Oraimo Earphones</Text>
            <Text style={styles.price}>$29.99</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="create-outline" size={18} color="#FF8800" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={18} color="red" />
                <Text style={[styles.actionText, { color: "red" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.stock}>In Stock</Text>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddProduct}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    alignSelf: "center",
    marginLeft: 100,
  },

  // Search bar
  searchContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  // Product Card
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
    marginBottom: 16,
    margin: 1
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FF8800",
    marginVertical: 4,
  },

  // Edit & Delete actions
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 14,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },

  // Stock status
  stock: {
    fontSize: 14,
    fontWeight: "700",
    color: "green",
    marginLeft: 10,
  },

  // Floating Action Button
  fab: {
    position: "absolute",
    bottom: "20%",
    right: 25,
    backgroundColor: "#FF8800", // light orange
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});