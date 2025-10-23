import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddProduct = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleBackArrow = () => {
    router.back();
  };

  const handleProductSummary = () => {
    router.navigate("/vendor/(root)/src/product/productSummary");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Products</Text>
        </View>

        {/* Upload Image Section */}
        <View style={styles.uploadSection}>
          <View style={styles.uploadIconContainer}>
            <Ionicons name="images-outline" size={45} color="#FF8800" />
          </View>
          <Text style={styles.uploadTitle}>Upload Image</Text>
          <Text style={styles.uploadSubtitle}>
            Tap to upload product image
          </Text>
        </View>

        {/* Product Details Card */}
        <View style={styles.card}>
          {/* Product Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Product Name"
              placeholderTextColor="#999"
            />
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Electronics" value="electronics" />
                <Picker.Item label="Accessories" value="accessories" />
                <Picker.Item label="Home Appliances" value="home" />
                <Picker.Item label="Fashion" value="fashion" />
              </Picker>
            </View>
          </View>

          {/* Price & Stock */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Price"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Stock Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Stock Quantity"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter Short Description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Weight/Size/Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight / Size / Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Weight / Size / Quantity"
              placeholderTextColor="#999"
            />
          </View>

          {/* Color Options */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Color Options (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter colors available"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity style={{ backgroundColor: "#FF8800", padding: 12, borderRadius: 8, alignItems: "center" }} onPress={handleProductSummary}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
            Save Product
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#FF8800", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 }} onPress={() => {}}>
          <Text style={{ color: "#FF8800", fontSize: 20, fontWeight: "600" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ScrollView>
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginLeft: 100,
  },

  // Upload Section
  uploadSection: {
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 25,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
  },

  uploadIconContainer: {
    backgroundColor: "#FFD580",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  uploadSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  // Product Card
  card: {
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
  },

  textArea: {
    height: 100,
  },

  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
