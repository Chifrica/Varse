import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

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
            source={require("../../../../../../assets/icons/logo.png")}
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

