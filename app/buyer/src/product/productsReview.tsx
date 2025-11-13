import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductsReview = () => {
    const router = useRouter();
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);

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

    const formatCurrency = (amount) => {
        if (!amount) return "₦0";
        const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `₦${formatted}`;
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }

    const handleCustomize = () => {
        const foodCategories = ["food", "meal", "meals", "foods"];

        if (!category || !foodCategories.includes(typeof category === "string" ? category.toLowerCase() : "")) {
            alert("❌ You can’t customize this item. Only food items can be customized.");
            return;
        }

        router.push({
            pathname: "/buyer/src/product/productsItemAddition",
            params: { image: Array.isArray(image) ? image[0] : image },
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product</Text>
            </View>

            {/* Product Image */}
            <View style={styles.imageContainer}>
                {image ? (
                    <Image
                        source={{ uri: Array.isArray(image) ? image[0] : image }}
                        style={styles.productImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.noImageBox}>
                        <Text>No Image</Text>
                    </View>
                )}
            </View>

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.nameRow}>
                    <Text style={styles.productName}>{name || "Unnamed Product"}</Text>
                    <View style={styles.iconRow}>
                        <Ionicons name="share-social-outline" size={24} style={{ color: "#FF8800" }} />
                        <Ionicons name="heart-outline" size={24} style={{ color: "#FF8800" }} />
                    </View>
                </View>
            </View>

            {/* Quantity Selector */}
            <View style={styles.qtyContainer}>
                <Text style={styles.qtyLabel}>Quantity</Text>
                <View style={styles.qtyButtons}>
                    <Pressable onPress={decreaseQty} style={styles.qtyButton}>
                        <Text style={styles.qtySign}>-</Text>
                    </Pressable>
                    <Text style={styles.qtyText}>{qty}</Text>
                    <Pressable onPress={increaseQty} style={styles.qtyButton}>
                        <Text style={styles.qtySign}>+</Text>
                    </Pressable>
                </View>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
                {description || "No description provided."}
            </Text>

            {/* Price */}
            <Text style={styles.price}>{formatCurrency(price)}</Text>

            {/* Vendor Info */}
            <Text style={styles.vendorText}>
                Vendor: {vendorName || "Unknown"}
            </Text>
            <Text style={styles.vendorText}>
                Location: {location || "Not specified"}
            </Text>

            {/* Customize Button */}
            <TouchableOpacity style={styles.customizeButton} onPress={handleCustomize}>
                <Text style={styles.customizeText}>
                    Customize Your {category || "Product"}
                </Text>
            </TouchableOpacity>

            {/* Add to Cart Button */}
            <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ProductsReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
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
        marginLeft: 140
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    productImage: {
        width: 260,
        height: 260,
        borderRadius: 16,
    },
    noImageBox: {
        width: 260,
        height: 260,
        backgroundColor: "#eee",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    detailsContainer: {
        marginBottom: 20,
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
    },
    iconRow: {
        flexDirection: "row",
        gap: 10,
    },
    qtyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    qtyLabel: {
        fontSize: 18,
        fontWeight: "600",
    },
    qtyButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    qtyButton: {
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    qtySign: {
        fontSize: 20,
        fontWeight: "bold",
    },
    qtyText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
        marginBottom: 6,
    },
    description: {
        fontSize: 15,
        color: "#444",
        marginBottom: 20,
        lineHeight: 22,
    },
    price: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },
    vendorText: {
        fontSize: 15,
        color: "#666",
        marginBottom: 4,
    },
    customizeButton: {
        // backgroundColor: "#FFF4CC",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    customizeText: {
        color: "#A06E00",
        fontWeight: "600",
        fontSize: 16,
        marginTop: 15,
        marginBottom: 15
    },
    cartButton: {
        backgroundColor: "#FF6A00",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    cartButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
