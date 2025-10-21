import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categoriesItems } from "./data";

const Home = () => {

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../../../../assets/icons/logo.png")}
            style={styles.headerImage}
          />
          <Text style={styles.headerName}>Hi Ahmed</Text>
        </View>

        <View style={styles.headerIcons}>
          <View style={styles.iconWrapper}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
          </View>
          <View style={styles.iconWrapper}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </View>
        </View>
      </View>

      {/* Promo Banner */}
      <View style={styles.promoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {`Order meals from your \nfavorite campus spots`}
          </Text>
          <Text style={styles.subtitle}>
            Enjoy <Text style={styles.highlight}>our offer</Text> now
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../../../../assets/icons/logo.png")}
          style={styles.image}
        />
      </View>

      {/* Category Section */}
      <Text style={styles.sectionTitle}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categoriesItems.map((item) => (
          <View key={item.id} style={styles.categoryItem}>
            <View style={styles.categoryCircle}>
              <Image source={item.icon} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Popular Section */}
      <Text style={styles.sectionTitle}>Popular</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    backgroundColor: "#FF6A00",
    borderRadius: 12,
    padding: 6,
  },

  /* PROMO */
  promoContainer: {
    flexDirection: "row",
    backgroundColor: "#FFE5B4",
    padding: 20,
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "space-between",
    marginTop: 25,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#FB923C",
    marginBottom: 12,
    fontWeight: "800",
  },
  highlight: {
    color: "#FB923C",
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 10,
    resizeMode: "contain",
  },

  /* CATEGORY */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  categoryText: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
});
