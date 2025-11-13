import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductsItemAddition = () => {
    const router = useRouter();
    const { image } = useLocalSearchParams();

    const [selectedItems, setSelectedItems] = useState([]);

    const options = [
        {
            title: "Protein",
            items: [
                { name: "Extra Chicken", price: 800 },
                { name: "Fried Fish", price: 800 },
                { name: "Turkey", price: 800 },
            ],
        },
        {
            title: "Extras",
            items: [
                { name: "Fried Plantain", price: 400 },
                { name: "Salad", price: 400 },
                { name: "Water Bottle", price: 400 },
            ],
        },
    ];

    const toggleSelection = (item) => {
        setSelectedItems((prev) => {
            if (prev.includes(item.name)) {
                return prev.filter((i) => i !== item.name);
            } else {
                return [...prev, item.name];
            }
        });
    };

    const totalAmount = options
        .flatMap((opt) => opt.items)
        .filter((item) => selectedItems.includes(item.name))
        .reduce((sum, item) => sum + item.price, 0);

    const handleAddCart = () => {
        router.push("/buyer/src/cart/addCart")
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Customize</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
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

                {/* Customization Section */}
                <View style={styles.customSection}>
                    <View style={styles.customHeader}>
                        <Text style={styles.title}>Customize Your Meal</Text>
                        <Text style={styles.subtitle}>
                            Add more flavor or sides to make it perfect for you
                        </Text>
                    </View>

                    {options.map((section, index) => (
                        <View key={index} style={styles.optionSection}>
                            <Text style={styles.optionTitle}>{section.title}</Text>
                            {section.items.map((item, idx) => (
                                <View key={idx} style={styles.optionRow}>
                                    <CheckBox
                                        value={selectedItems.includes(item.name)}
                                        onValueChange={() => toggleSelection(item)}
                                        color={selectedItems.includes(item.name) ? "#FF6A00" : undefined}
                                    />
                                    <Text style={styles.optionName}>{item.name}</Text>
                                    <Text style={styles.optionPrice}>+₦{item.price}</Text>
                                </View>
                            ))}
                        </View>
                    ))}

                    {/* Total Section */}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₦{totalAmount.toLocaleString()}</Text>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity style={styles.cartButton} onPress={handleAddCart}>
                        <Text style={styles.cartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductsItemAddition;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
        marginLeft: 120,
    },
    imageContainer: {
        alignItems: "center",
    },
    productImage: {
        width: 280,
        height: 280,
        borderRadius: 16,
    },
    noImageBox: {
        width: 280,
        height: 280,
        backgroundColor: "#eee",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    customSection: {
        backgroundColor: "#FDFDFD",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginTop: 20,
        elevation: 3,
    },
    customHeader: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    optionSection: {
        marginTop: 25,
        borderTopWidth: 1,
        borderTopColor: "#EAEAEA",
        paddingTop: 15,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    optionName: {
        flex: 1,
        fontSize: 15,
        color: "#333",
        marginLeft: 10,
    },
    optionPrice: {
        fontSize: 15,
        color: "#555",
        fontWeight: "600",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "#EAEAEA",
        paddingTop: 15,
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: "700",
    },
    totalValue: {
        fontSize: 17,
        fontWeight: "700",
        color: "#FF6A00",
    },
    cartButton: {
        backgroundColor: "#FF6A00",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 25,
    },
    cartButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
