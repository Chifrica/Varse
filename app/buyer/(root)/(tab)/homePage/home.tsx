import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categoriesItems, popularItems } from "./_data";

const Home = () => {

  const colorScheme = useColorScheme()
  return (
    <SafeAreaView style={[styles.container, colorScheme === 'light' ? { backgroundColor: "#fff" } : { backgroundColor: "#fff" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* Category Section */}
        <Text style={styles.sectionTitle}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categoriesItems.map((item) => (
            <View key={item.id} style={styles.categoryItem}>
              <View style={styles.categoryCircle}>
                <Image source={item.icon} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Promo Banner */}
        <View style={styles.promoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.promoTitle}>Big Weekend Deals</Text>
            <Text style={styles.promoSubtitle}>Shop Now Before It’s Gone!</Text>

            <TouchableOpacity style={styles.promoButton} onPress={() => alert("Shop Now Clicked!")}>
              <Text style={styles.promoButtonText}>Shop now</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../../../../assets/images/image 5.png")} // use your uploaded image path
            style={styles.promoImage}
          />
        </View>

        {/* Popular Section */}
        <Text style={styles.sectionTitle}>Popular Meals</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularScroll}
        >
          {popularItems.map((item) => (
            <View key={item.id} style={styles.popularCard}>
              <Image source={item.image} style={styles.popularImage} />
              <View style={styles.popularInfo}>
                <Text style={styles.popularName}>{item.name}</Text>
                <View style={styles.popularBottom}>
                  <View style={styles.ratingWrapper}>
                    <Ionicons name="star" size={14} color="#FFA500" />
                    {/* <Text style={styles.ratingText}>{item.rate.}</Text> */}
                    <Text style={styles.popularDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.popularPrice}>₦{item.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Fashion Section */}
        <Text style={styles.sectionTitle}>Fashion</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularScroll}
        >
          {popularItems.map((item) => (
            <View key={item.id} style={styles.popularCard}>
              <Image source={item.image} style={styles.popularImage} />
              <View style={styles.popularInfo}>
                <Text style={styles.popularName}>{item.name}</Text>
                <View style={styles.popularBottom}>
                  <View style={styles.ratingWrapper}>
                    <Ionicons name="star" size={14} color="#FFA500" />
                    {/* <Text style={styles.ratingText}>{item.rate.}</Text> */}
                    <Text style={styles.popularDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.popularPrice}>₦{item.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Electronics Section */}
        <Text style={styles.sectionTitle}>Electronics</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularScroll}
        >
          {popularItems.map((item) => (
            <View key={item.id} style={styles.popularCard}>
              <Image source={item.image} style={styles.popularImage} />
              <View style={styles.popularInfo}>
                <Text style={styles.popularName}>{item.name}</Text>
                <View style={styles.popularBottom}>
                  <View style={styles.ratingWrapper}>
                    <Ionicons name="star" size={14} color="#FFA500" />
                    {/* <Text style={styles.ratingText}>{item.rate.}</Text> */}
                    <Text style={styles.popularDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.popularPrice}>₦{item.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Clothing Section */}
        <Text style={styles.sectionTitle}>Clothing</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularScroll}
        >
          {popularItems.map((item) => (
            <View key={item.id} style={styles.popularCard}>
              <Image source={item.image} style={styles.popularImage} />
              <View style={styles.popularInfo}>
                <Text style={styles.popularName}>{item.name}</Text>
                <View style={styles.popularBottom}>
                  <View style={styles.ratingWrapper}>
                    <Ionicons name="star" size={14} color="#FFA500" />
                    {/* <Text style={styles.ratingText}>{item.rate.}</Text> */}
                    <Text style={styles.popularDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.popularPrice}>₦{item.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    // backgroundColor: "#fff",
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
    backgroundColor: "#FF8800",
    padding: 20,
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "space-between",
    marginTop: 25,
  },
  textContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  promoImage: {
    width: 130,
    height: 130,
    marginLeft: 10,
    resizeMode: "contain",
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
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  /* POPULAR */
  popularScroll: {
    marginTop: 10,
  },
  popularCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    marginRight: 16,
    marginBottom: 20,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  popularImage: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
  },
  popularInfo: {
    padding: 10,
  },
  popularName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  popularDescription: {
    fontSize: 18,
    color: "#555",
    marginVertical: 4,
  },
  popularBottom: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    marginTop: 4,
  },
  popularPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF6A00",
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 4,
    color: "#555",
  },
});
