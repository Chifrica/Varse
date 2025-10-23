import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

const Products = () => {
    const router = useRouter();

    const handleBackArrow = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <Ionicons name="arrow-back-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Products</Text>
                </View>

                {/* Product Image Section */}
                <View style={styles.imageCard}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: "https://tse4.mm.bing.net/th/id/OIP.67P4CLNOPwSCPeCvKJ0_gQHaHd?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />

                        {/* Top-right icons */}
                        <View style={styles.topRightIcons}>
                            <Ionicons name="create-outline" size={20} color="#FF8800" style={styles.icon} />
                            <Ionicons name="camera-outline" size={20} color="#FF8800" style={styles.icon} />
                        </View>
                    </View>
                </View>

                {/* Product Details Section */}
                <View style={styles.detailsCard}>
                    <View style={styles.productHeader}>
                        <View>
                            <Text style={styles.productName}>Black Leather Smart Phone Case</Text>
                            <Text style={styles.productPrice}>$5,000</Text>
                        </View>
                        <Text style={styles.inStock}>In Stock</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Category & ID */}
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Category</Text>
                        <Text style={styles.value}>VSI</Text>
                    </View>

                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Tech</Text>
                        <Text style={styles.value}>#12345A</Text>
                    </View>

                    <Text style={styles.description}>
                        A Black styled pouch built for durability and comfort while enabling protection for
                        your Android Smart Phone. Suitable for Samsung S22, S23, S24.
                    </Text>
                </View>

                {/* Bottom Buttons */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="stats-chart-outline" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Analytics</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reviewButton}>
                        <Ionicons name="chatbubbles-outline" size={20} color="#FF8800" />
                        <Text style={styles.reviewButtonText}>Reviews</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Products;


