import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RefillGas = () => {
    const [quantity, setQuantity] = useState(1);
    const firstGasPrice = 500;
    const subsequentGasPrice = 300;

    const router = useRouter();
    // Function to calculate total price
    const calculateTotal = () => {
        if (quantity <= 0) return 0;
        if (quantity === 1) return firstGasPrice;
        return firstGasPrice + (quantity - 1) * subsequentGasPrice;
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // prevents going below 1
    };

    const handleBack = () => {
        router.back()
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                        <FontAwesome name='arrow-left' size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTxt}>Gas Refill</Text>
                </View>

                <View style={{
                    backgroundColor: "#ffd9b3ff",
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 30,
                    marginBottom: 50,
                }}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5771/5771077.png' }}
                        style={{ tintColor: '#FF8800', height: 140, width: 80, alignSelf: 'center', resizeMode: 'contain'}}
                    />
                </View>

                <View >
                    <Text style={styles.middleHeaderTxt}>Customize Your Refill</Text>
                    <Text style={styles.subMiddleHeaderTxt}>{`Select the number of gas cylinders you want \nto refill`}</Text>
                </View>

                <View style={styles.productPrice}>
                    <Text style={styles.productPriceHeaderTxt}>First gas costs 500</Text>
                    <Text style={styles.productPriceMiniHeaderTxt}>Subsequent gases cost 300 each</Text>
                </View>

                <View style={styles.amountIncreaseDecrease}>
                    <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>−</Text>
                    </TouchableOpacity>

                    <View style={styles.quantityDisplay}>
                        <Text style={styles.quantityNumber}>{quantity}</Text>
                    </View>

                    <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Total Amount */}
                <View style={styles.totalAmount}>
                    <Text style={styles.totalTxt}>Total Price</Text>
                    <Text style={styles.totalValue}>₦{calculateTotal()}</Text>
                </View>
                <TouchableOpacity style={styles.checkout}>
                    <Text style={styles.checkoutTxt}>Proceed to Checkout</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RefillGas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
    },
    headerTxt: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: "35%"
    },
    middleHeaderTxt: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    subMiddleHeaderTxt: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 30
    },
    productPrice: {
        backgroundColor: '#ffd9b3ff',
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 20,
        borderRadius: 10
    },
    productPriceHeaderTxt: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#FF8800'
    },
    productPriceMiniHeaderTxt: {
        fontSize: 18,
        color: '#FF8800'
    },
    amountIncreaseDecrease: {
        flexDirection: "row",
        marginBottom: "30%",
        marginTop: 20,
        justifyContent: "center"
    },
    quantityButton: {
        backgroundColor: '#ffd9b3ff',
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 28,
        color: '#FF8800',
        fontWeight: 'bold',
    },
    quantityDisplay: {
        marginHorizontal: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        minWidth: 60,
        alignItems: 'center',
    },
    quantityNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalAmount: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    totalTxt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8800',
    },
    checkout: {
        backgroundColor: "#FF8800",
        padding: 12,
        borderRadius: 4,
    },
    checkoutTxt: {
        color: "#fff",
        elevation: 1,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    }
})