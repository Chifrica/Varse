import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CancelledOrder = () => {

    const router = useRouter();

    const handleBackArrow = () => {
        router.back()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Cancelled Orders</Text>
                </View>

                <View>
                    <View>
                        <View style={styles.items}>
                            <Image />
                            <View>
                                <Text style={styles.productName}>Medium Sized Box</Text>
                                <Text style={styles.orderId}>Order ID: #VAR123ABC</Text>
                            </View>
                            <Text style={styles.orderStatus}>Cancelled</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                        </View>

                        <View style={styles.items}>
                            <Image />
                            <View>
                                <Text style={styles.productName}>Medium Sized Box</Text>
                                <Text style={styles.orderId}>Order ID: #VAR123ABC</Text>
                            </View>
                            <Text style={styles.orderStatus}>Cancelled</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                        </View>

                        <View style={styles.items}>
                            <Image />
                            <View>
                                <Text style={styles.productName}>Medium Sized Box</Text>
                                <Text style={styles.orderId}>Order ID: #VAR123ABC</Text>
                            </View>
                            <Text style={styles.orderStatus}>Cancelled</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                        </View>

                        <View style={styles.items}>
                            <Image />
                            <View>
                                <Text style={styles.productName}>Medium Sized Box</Text>
                                <Text style={styles.orderId}>Order ID: #VAR123ABC</Text>
                            </View>
                            <Text style={styles.orderStatus}>Cancelled</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CancelledOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    header: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
        alignSelf: "center",
        marginLeft: 100,
    },
    items: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff",
    },
    productName: {
        fontSize: 20,
        fontWeight: "600",
    },
    orderId: {
        color: "#555",
        fontSize: 16,
    },
    orderStatus: {
        fontWeight: "600",
        color: "#EF4444",
    },
})