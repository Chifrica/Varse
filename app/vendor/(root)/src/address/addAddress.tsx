import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddAddress = () => {
    const router = useRouter();

    const handleBackArrow = () => {
        router.navigate("/vendor/src/address/address");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <Ionicons name="arrow-back-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Address</Text>
                </View>

                {/* Address Input Section */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="12, Avenue, Samaru"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddAddress;

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
        marginLeft: 100,
    },
    inputContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#000",
    },
    saveButton: {
        backgroundColor: "#F59E0B",
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 30,
    },
    saveText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});