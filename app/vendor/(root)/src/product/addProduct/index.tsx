import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

        <TouchableOpacity 
        style={{ borderWidth: 1, borderColor: "#FF8800", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 }} 
        onPress={handleBackArrow}>
          <Text style={{ color: "#FF8800", fontSize: 20, fontWeight: "600" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

