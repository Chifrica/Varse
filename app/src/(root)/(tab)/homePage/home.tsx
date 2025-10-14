import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories, featuredShops, trendingProducts } from './data';

const Home = () => {
    const renderHeader = () => (
        <>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Varse Market</Text>
                <View style={styles.headerGasCart}>
                    <View style={styles.headerGas}>
                        <Image
                            style={{ width: 18, height: 18, marginRight: 5, tintColor: '#FFFFFF' }}
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5771/5771077.png' }}
                        />
                        <Text style={styles.headerGasCartTxt}>Refill Gas</Text>
                    </View>
                    <FontAwesome name="shopping-cart" size={24} color="black" style={{ marginLeft: 15 }} />
                </View>
            </View>

            {/* Search Box */}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for products or shops"
                    placeholderTextColor="#999"
                />
            </View>

            {/* Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <View style={styles.categoryProducts}>
                        <Image source={{ uri: item.image }} style={styles.categoryProductsImage} />
                        <Text style={styles.categoryProductsTxt}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
            />

            {/* Featured Shops */}
            <Text style={styles.sectionTitle}>Featured Shops</Text>
            <FlatList
                data={featuredShops}
                renderItem={({ item }) => (
                    <View style={styles.featuredShopsProducts}>
                        <Image source={{ uri: item.image }} style={styles.featuredShopsProductsImage} />
                        <Text style={styles.featuredShopsProductsTxt}>{item.name}</Text>
                        <Text style={styles.featuredShopsProductsReview}>{item.review}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
            />

            {/* Trending Products Title */}
            <Text style={styles.sectionTitle}>Trending Products</Text>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={trendingProducts}
                renderItem={({ item }) => (
                    <View style={styles.trendingProducts}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.trendingProductsImage}
                        />
                        <Text style={styles.trendingProductsTxt}>{item.name}</Text>
                        <Text style={styles.trendingProductsPrice}>{item.price}</Text>
                        <Text style={styles.trendingProductsReview}>{item.shop}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};


export default Home;

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
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    headerGasCart: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerGasCartTxt: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
        color: "#FFFFFF"
    },
    headerGas: {
        flexDirection: "row",
        borderRadius: 50,
        backgroundColor: "#FF8800",
        paddingHorizontal: 10,
        alignItems: "center",
        height: 30,
    },
    // Search Box Styles
    searchContainer: {
        position: "relative",
        marginTop: 20,
    },
    searchIcon: {
        position: "absolute",
        top: 10,
        left: 15,
        zIndex: 1,
    },
    searchInput: {
        borderRadius: 50,
        backgroundColor: "#F0F0F0",
        height: 40,
        paddingLeft: 40,
        fontSize: 16,
    },

    sectionTitle: {
        marginTop: 25,
        fontSize: 20,
        fontWeight: "600",
    },
    // Category Styles
    category: {
        flexDirection: "row",
        marginTop: 10,
        gap: 20,
    },
    categoryProducts: {
        alignItems: "center",
        marginRight: 20,
        marginTop: 15,
    },
    categoryProductsImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#f5f5f5",
        marginBottom: 5,
    },
    categoryProductsTxt: {
        fontSize: 16,
        fontWeight: "600",
    },
    // Featured Shops Styles
    featuredShops: {
        flexDirection: "row",
        marginTop: 10,
        gap: 20,
    },
    featuredShopsProducts: {
        alignItems: "center",
        marginRight: 20,
        marginTop: 15,
    },
    featuredShopsProductsImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#f5f5f5",
        marginBottom: 5,
    },
    featuredShopsProductsTxt: {
        fontSize: 16,
        fontWeight: "600",
    },
    featuredShopsProductsReview: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    // Trending Products Styles
    trendingProducts: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        width: "48%", // 
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
        marginBottom: 10,
        marginRight: 15,
        marginTop: 10,
    },

    trendingProductsImage: {
        // resizeMode: "contain",
        borderRadius: 10,
        marginBottom: 8,
        width: "100%",        
        height: 120, 
    },

    trendingProductsTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },

    trendingProductsReview: {
        fontSize: 13,
        color: "#777",
        textAlign: "center",
    },

    trendingProductsPrice: {
        fontSize: 15,
        fontWeight: "700",
        color: "#E58945",
        marginTop: 5,
    },

});
