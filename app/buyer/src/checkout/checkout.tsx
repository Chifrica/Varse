import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Checkout = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState("");

    // Load cart items
    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem("cartItems");
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            } catch (error) {
                console.log("Error loading cart:", error);
            }
        };

        loadCart();
    }, []);

    // Helpers
    const formatCurrency = (amount) => {
        if (!amount) return "₦0";
        const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `₦${formatted}`;
    };

    // Calculations
    const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const deliveryFee = 500;
    const discount = 0; // Add real logic later
    const finalTotal = subtotal + deliveryFee - discount;

    const handleProceed = () => {
        router.push(
            {
                pathname: "/buyer/src/checkout/cardTransfer",
                params: {finalTotal}
            }
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
            </View>

            {/* Delivery Address */}
            <View style={{ marginBottom: 25 }}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>

                <View style={styles.addressBox}>
                    <Ionicons name="location-outline" size={22} color={"#555"} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.addressText}>
                            12, Ahmadu Bello Way, Kaduna
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Order Summary */}
            <View style={{ marginBottom: 25 }}>
                <Text style={styles.sectionTitle}>Order Summary</Text>

                {cartItems.length === 0 ? (
                    <Text style={{ marginTop: 10 }}>No items found in cart.</Text>
                ) : (
                    cartItems.map((item) => (
                        <View key={item.id} style={styles.orderItem}>
                            <Text style={styles.orderItemName}>{item.name}</Text>
                            <Text style={styles.orderItemPrice}>
                                {formatCurrency(item.totalPrice)}
                            </Text>
                        </View>
                    ))
                )}

                {/* Line Divider */}
                <View style={styles.divider} />

                {/* Price Summary */}
                <View style={{ marginTop: 10 }}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>
                            {formatCurrency(subtotal)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Text style={styles.summaryValue}>
                            {formatCurrency(deliveryFee)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Discount</Text>
                        <Text style={styles.summaryValue}>
                            {formatCurrency(discount)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { fontWeight: "700" }]}>
                            Total
                        </Text>
                        <Text style={[styles.summaryValue, { fontWeight: "700" }]}>
                            {formatCurrency(finalTotal)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Promo Code */}
            <View style={{ marginBottom: 25 }}>
                <Text style={styles.sectionTitle}>Enter Promo Code (Optional)</Text>

                <View style={styles.promoContainer}>
                    <TextInput
                        style={styles.promoInput}
                        placeholder="Enter code"
                        value={promoCode}
                        onChangeText={setPromoCode}
                    />
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleProceed}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 140,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },

    addressBox: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        alignItems: "center",
    },

    addressText: {
        color: "#444",
        fontSize: 15,
    },

    changeText: {
        color: "#FF8800",
        fontWeight: "600",
        marginTop: 4,
    },

    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
    },

    orderItemName: {
        fontSize: 16,
        color: "#444",
    },

    orderItemPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },

    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginTop: 12,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    summaryLabel: {
        fontSize: 16,
    },

    summaryValue: {
        fontSize: 16,
        fontWeight: "600",
    },

    promoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    promoInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 45,
    },

    applyButton: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: "#FF8800",
        borderRadius: 10,
        marginLeft: 10,
    },

    applyButtonText: {
        color: "#fff",
        fontWeight: "700",
    },

    continueButton: {
        backgroundColor: "#FF8800",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    continueButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
