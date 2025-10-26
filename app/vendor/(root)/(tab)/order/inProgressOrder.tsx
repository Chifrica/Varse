import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InProgressOrder = () => {

    const router = useRouter();

    const handleBackArrow = () => {
        router.back()
    }
    
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Pending Orders</Text>
                </View>

                <View>
                    <View>
                        <Image  />
                        <View>
                            <Text>Medium Sized Box</Text>
                            <Text>Order ID: #VAR123ABC</Text>
                        </View>
                        <Text>Pending</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                    </View>

                    <View>
                        <Image />
                        <View>
                            <Text>Medium Sized Box</Text>
                            <Text>Order ID: #VAR123ABC</Text>
                        </View>
                        <Text>Pending</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default InProgressOrder

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
})