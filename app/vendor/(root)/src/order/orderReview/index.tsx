import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./_style";

const Index = () => {
    const router = useRouter();
    const { order } = useLocalSearchParams<{order?:string}>();
    const orderData = order ? JSON.parse(order) : null;

    const handleBackArrow = () => {
        router.back();
    };

    const formatCurrency = (amount, currency = "NGN") => {
        if (isNaN(amount)) return "₦0";
        const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return currency === "NGN" ? `₦ ${formatted}` : formatted;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Order Details</Text>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>

                    <Text style={styles.text}>
                        <Text style={styles.bold}>Order ID:</Text> {orderData?.product_id}
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bold}>Placed on:</Text>{" "}
                        {new Date(orderData?.created_at).toLocaleDateString()}
                    </Text>
                </View>

                {/* Items Ordered */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Items Ordered</Text>

                    <View style={styles.itemRow}>
                        <Image
                            source={{ uri: orderData?.image }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{orderData?.name}</Text>
                            <Text style={styles.itemQty}>QTY: {orderData?.qty}</Text>
                        </View>
                        <Text style={styles.itemPrice}>{formatCurrency(orderData?.total_price)}</Text>
                    </View>

                    <View style={styles.divider} />
                </View>

                {/* Delivery Status */}
                <View style={styles.section}>
                    <View style={styles.statusRow}>
                        <View style={styles.leftStatus}>
                            <Ionicons name="car-outline" size={22} color="#FF8800" />
                            <Text style={styles.sectionTitle}>Delivery Status</Text>
                        </View>

                        <Text
                            style={[
                                styles.statusText,
                                { color: orderData?.status === "Delivered" ? "#22C55E" : "#FF8800" }
                            ]}
                        >
                            {orderData?.status || "Processing"}
                        </Text>
                    </View>
                </View>

                {/* Payment Status */}
                <View style={styles.section}>
                    <View style={styles.statusRow}>
                        <View style={styles.leftStatus}>
                            <Ionicons name="card-outline" size={22} color="#FF8800" />
                            <Text style={styles.sectionTitle}>Payment Status</Text>
                        </View>

                        <Text
                            style={[
                                styles.statusText,
                                { color: orderData?.paid ? "#22C55E" : "#EF4444" }
                            ]}
                        >
                            {orderData?.paid ? "Paid" : "Not Paid"}
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;
