import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import supabase from "../../../../../utils/supabase";
import styles from "./_style";

const Index = () => {
    const router = useRouter();

    const handleBackArrow = () => {
        router.back();
    };

    useEffect(() => {
        const loadOrders = async () => {
          const { data: { user } } = await supabase.auth.getUser();
    
          if (!user) {
            console.error("No user found");
            return;
          }
    
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("vendor_id", user.id)
            .eq("paid", true)
            .gte("created_at", sevenDaysAgo.toISOString())
            .order("created_at", { ascending: false });
    
          if (error) {
            console.error("Error fetching orders:", error.message);
          } else {
            console.log("Fetched orders:", data); // Debug log
            console.log("User ID:", user.id); // Debug log
          }
    
        };
    
        loadOrders();
      }, []);

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

                {/* Order Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Order ID:</Text> #VAR102ABC
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Placed on:</Text> 28 November, 2025
                    </Text>
                </View>

                {/* Items Ordered */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Items Ordered</Text>

                    {/* Item 1 */}
                    <View style={styles.itemRow}>
                        <Image
                            source={{
                                uri: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MW683?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1693244631287",
                            }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>iPhone 15 Black Case</Text>
                            <Text style={styles.itemQty}>QTY: 1</Text>
                        </View>
                        <Text style={styles.itemPrice}>$29.99</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Item 2 */}
                    <View style={styles.itemRow}>
                        <Image
                            source={{
                                uri: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MW683?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1693244631287",
                            }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>iPhone 15 Transparent Case</Text>
                            <Text style={styles.itemQty}>QTY: 1</Text>
                        </View>
                        <Text style={styles.itemPrice}>$19.99</Text>
                    </View>
                </View>

                {/* Delivery Status */}
                <View style={styles.section}>
                    <View style={styles.statusRow}>
                        <View style={styles.leftStatus}>
                            <Ionicons name="car-outline" size={22} color="#FF8800" />
                            <Text style={styles.sectionTitle}>Delivery Status</Text>
                        </View>
                        <Text style={[styles.statusText, { color: "#22C55E" }]}>Delivered</Text>
                    </View>
                </View>

                {/* Payment Status */}
                <View style={styles.section}>
                    <View style={styles.statusRow}>
                        <View style={styles.leftStatus}>
                            <Ionicons name="card-outline" size={22} color="#FF8800" />
                            <Text style={styles.sectionTitle}>Payment Status</Text>
                        </View>
                        <Text style={[styles.statusText, { color: "#22C55E" }]}>Paid</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;


