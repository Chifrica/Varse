import Fontawesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Varse Market</Text>
                    <View style={styles.headerGasCart}>
                        <View style={styles.headerGas}>
                            <Image 
                                style={{ width: 18, height: 18, marginRight: 10, }}
                                source={{uri: 'https://cdn-icons-png.flaticon.com/128/5771/5771077.png'}}
                            />
                            <Text>Refill Gas</Text>
                        </View>
                        <Fontawesome name="shopping-cart" size={24} color="black" style={{ marginLeft: 15 }} />
                    </View>
                </View>

                {/* Search */}
                <View style={styles.search}>
                    <TextInput
                        placeholder='Search for products or shops'
                    />
                </View>

                 {/* Images */}
                <View>
                    <Image />
                </View> 

                {/* Categories */}
                <View>
                    <Text>Categories</Text>

                    <View style={styles.category}>
                        <View style={styles.categoryProducts}>
                            <Image 
                                style={styles.categoryProductsImage}
                            />
                            <Text style={styles.categoryProductsTxt}>Food</Text>
                        </View>

                        <View style={styles.categoryProducts}>
                            <Image 
                                style={styles.categoryProductsImage}
                            />
                            <Text style={styles.categoryProductsTxt}>Fashion</Text>
                        </View>

                        <View style={styles.categoryProducts}>
                            <Image 
                                style={styles.categoryProductsImage}
                            />
                            <Text style={styles.categoryProductsTxt}>Shoes</Text>
                        </View>
                    </View> 
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 15,
	},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        top: 10,
    },
    headerTitle: {
        fontSize: 24,
        height: 30,
        fontWeight: "bold",
    },
    headerGasCart: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    headerGas: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 50,
        backgroundColor: "#FF8800",
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: "center",
        height: 30,
    },
    search: {
        borderRadius: 50,
    },
    category: {
        flexDirection: "row"
    },
    categoryProducts: {
        
    },
    categoryProductsImage: {
        borderRadius: 100
    },
    categoryProductsTxt: {
        fontSize: 18,
        fontWeight: 600
    },
    featuredShops: {},
    trendingProducts: {},
})
