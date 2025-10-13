import React from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './style'

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
                            <Text>Gas cylinder</Text>
                            <Text>Refill Gas</Text>
                        </View>
                        <Text>cart</Text>
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
