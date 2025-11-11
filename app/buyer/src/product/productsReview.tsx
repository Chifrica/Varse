import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductsReview = () => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Get product data passed from Home
  const {
    name,
    image,
    description,
    price,
    vendorName,
    category,
    location,
  } = useLocalSearchParams();

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Format price nicely
  const formatCurrency = (amount) => {
    if (!amount) return "₦0";
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₦${formatted}`;
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center mb-4 justify-between">
        <Text className="text-lg font-bold">Product Review</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-500">← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Product image */}
      <View className="items-center mb-4">
        {
        //   <Image
        //     source={{ uri: image }}
        //     className="w-64 h-64 rounded-2xl"
        //     resizeMode="cover"
        //   />
         (
          <View className="w-64 h-64 bg-gray-200 rounded-2xl justify-center items-center">
            <Text>No Image</Text>
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold">{name || "Unnamed Product"}</Text>
          <View className="flex-row space-x-3">
            <Text>🤍</Text>
            <Text>🔗</Text>
          </View>
        </View>
      </View>

      {/* Quantity Selector */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold">Quantity</Text>
        <View className="flex-row items-center space-x-3">
          <Pressable
            onPress={decreaseQty}
            className="bg-gray-200 px-3 py-1 rounded-md"
          >
            <Text className="text-lg font-bold">-</Text>
          </Pressable>
          <Text className="text-lg">{qty}</Text>
          <Pressable
            onPress={increaseQty}
            className="bg-gray-200 px-3 py-1 rounded-md"
          >
            <Text className="text-lg font-bold">+</Text>
          </Pressable>
        </View>
      </View>

      {/* Description */}
      <Text className="text-gray-600 mb-2 font-semibold">Description</Text>
      <Text className="text-gray-700 mb-4">
        {description || "No description provided."}
      </Text>

      {/* Price */}
      <Text className="text-xl font-bold mb-2">
        {formatCurrency(price)}
      </Text>

      {/* Vendor Name */}
      <Text className="text-gray-600 mb-1">Vendor: {vendorName || "Unknown"}</Text>
      <Text className="text-gray-600 mb-6">
        Location: {location || "Not specified"}
      </Text>

      {/* Customize Button */}
      <Pressable className="bg-yellow-100 py-3 rounded-xl mb-4">
        <Text className="text-center text-yellow-800 font-semibold">
          Customize Your {category || "Product"}
        </Text>
      </Pressable>

      {/* Add to Cart */}
      <TouchableOpacity className="bg-green-600 py-4 rounded-2xl">
        <Text className="text-center text-white text-lg font-semibold">
          Add to Cart
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductsReview;
