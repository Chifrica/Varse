import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { createItem } from "../../../../../api/varse";
import { supabase } from "../../../../../utils/supabase";
import { styles } from "./style";

const AddProduct = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  // 🧩 Form states
  const [form, setForm] = useState({
    productName: "",
    price: "",
    stockQuantity: "",
    description: "",
    weight: "",
    color: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleBackArrow = () => router.back();

  // 🖼 Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow access to your gallery to upload images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ☁️ Upload image to Supabase bucket
  // helper inside your component/file
const getMimeTypeFromUri = (uri) => {
  const ext = uri.split('.').pop()?.toLowerCase() || '';
  const map = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  };
  return map[ext] || 'application/octet-stream';
};

const uploadImageToSupabase = async (imageUri) => {
  if (!imageUri) return null;

  try {
    // 1) fetch file as arrayBuffer (works in RN / Expo)
    const response = await fetch(imageUri);
    if (!response.ok) throw new Error('Failed to fetch image for upload');

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // 2) build filename and path
    const originalName = imageUri.split('/').pop();
    const filename = `${Date.now()}_${originalName}`;
    const filePath = `product-images/${filename}`;

    // 3) content type
    const contentType = getMimeTypeFromUri(imageUri);

    // 4) upload to supabase storage (bucket name must exist)
    const { error: uploadError } = await supabase.storage
      .from('product-images')        // <- ensure this bucket exists (and is PUBLIC if you want getPublicUrl to work)
      .upload(filePath, uint8Array, {
        contentType,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 5) get public url
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('Error uploading image:', err);
    throw err;
  }
};


  // ✅ Save product to Supabase table
  const handleSaveProduct = async () => {
  if (!form.productName || !form.price || !form.stockQuantity || !selectedCategory) {
    Alert.alert("Missing Fields", "Please fill in all required fields.");
    return;
  }

  try {
    setLoading(true);

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToSupabase(image);
    }

    await createItem({
      productName: form.productName.trim(),
      description: form.description.trim(),
      category: selectedCategory,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity, 10),
      weight: form.weight.trim(),
      color: form.color.trim(),
      image_url: imageUrl || "https://via.placeholder.com/150",
    });

    Alert.alert("Success", "Product uploaded successfully!");
    router.navigate("/vendor/(root)/src/product/productSummary");
  } catch (error) {
    console.error("Error uploading product:", error);
    Alert.alert("Error", error.message || String(error));
  } finally {
    setLoading(false);
  }
};

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
        <TouchableOpacity style={styles.uploadSection} onPress={pickImage}>
          {!image && (
            <View style={styles.uploadIconContainer}>
            <Ionicons name="images-outline" size={45} color="#FF8800" />
          </View>
          )}
          <Text style={styles.uploadTitle}>Upload Image</Text>
          <Text style={styles.uploadSubtitle}>Tap to upload product image</Text>
          {image && (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150, borderRadius: 8 }}
              />
              <Text style={{ color: "#555", fontSize: 13, marginTop: 5 }}>
                ✅ Image selected
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Product Details Card */}
        <View style={styles.card}>
          {/* Product Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Product Name"
              placeholderTextColor="#999"
              value={form.productName}
              onChangeText={(text) => handleChange("productName", text)}
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
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
                value={form.price}
                onChangeText={(text) => handleChange("price", text)}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Stock Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Stock Quantity"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={form.stockQuantity}
                onChangeText={(text) => handleChange("stockQuantity", text)}
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
              value={form.description}
              onChangeText={(text) => handleChange("description", text)}
            />
          </View>

          {/* Weight / Size */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight / Size / Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Weight / Size / Quantity"
              placeholderTextColor="#999"
              value={form.weight}
              onChangeText={(text) => handleChange("weight", text)}
            />
          </View>

          {/* Colors */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Color Options (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter colors available"
              placeholderTextColor="#999"
              value={form.color}
              onChangeText={(text) => handleChange("color", text)}
            />
          </View>
        </View>

        {/* Save Product Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#FF8800",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handleSaveProduct}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
              Save Product
            </Text>
          )}
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#FF8800",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={handleBackArrow}
        >
          <Text style={{ color: "#FF8800", fontSize: 20, fontWeight: "600" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;
