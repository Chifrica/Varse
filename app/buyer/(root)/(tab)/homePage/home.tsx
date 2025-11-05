import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { categories, categoriesItems, featuredShops, popularItems, trendingProducts } from "./_data";

const Home = () => {

  const [searchQuery, setSearchQuery] = useState("");

  // Combine all searchable data into one unified array
  const allItems = [
    ...categories.map((item) => ({
      id: `cat-${item.id}`,
      name: item.name,
      image: { uri: item.image },
      price: null,
    })),
    ...featuredShops.map((item) => ({
      id: `shop-${item.id}`,
      name: item.name,
      image: { uri: item.image },
      price: item.review,
    })),
    ...trendingProducts.map((item) => ({
      id: `trend-${item.id}`,
      name: item.name,
      image: { uri: item.image },
      price: item.price,
    })),
    ...popularItems.map((item) => ({
      id: `pop-${item.id}`,
      name: item.name,
      image: item.image,
      price: item.price,
    })),
  ];

  const filteredItems =
    searchQuery.trim().length > 0
      ? allItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : [];


  const colorScheme = useColorScheme()
  return (
    <SafeAreaView style={[styles.container, colorScheme === 'light' ? { backgroundColor: "#fff" } : { backgroundColor: "#fff" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <View style={styles.inputContainer}>
            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for products, shops, or categories..."
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.headerIcons}>
            <View style={styles.iconWrapper}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </View>
          </View>
        </View>

        {/* Search Results */}
        {searchQuery.trim().length > 0 && (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <Text style={styles.noResults}>No items found</Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.price && (
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Category Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
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
          {/* Zigzag Background */}
          <Svg
            height="100%"
            width="100%"
            style={StyleSheet.absoluteFillObject}
            preserveAspectRatio="none"
          >
            <Path
              d="M0 10 L0 100 L50 10 L100 100 L150 10 L200 130 L250 10 L300 100 L350 10"
              stroke="#fff"
              strokeWidth="3"
              fill="none"
              opacity={0.1}
            />
          </Svg>

          {/* Text + Image on top */}
          <View style={styles.textContainer}>
            <Text style={styles.promoTitle}>Big Weekend Deals</Text>
            <Text style={styles.promoSubtitle}>Shop Now Before It’s Gone!</Text>

            <TouchableOpacity
              style={styles.promoButton}
              onPress={() => alert("Shop Now Clicked!")}
            >
              <Text style={styles.promoButtonText}>Shop now</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../../../../assets/images/image 5.png")}
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
  /* SEARCH */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 20
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 4,
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
    marginLeft: 20
  },
  filterContainer: {
    borderWidth: 1,
    borderColor: "#FF8800",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 30,
  },

  /* Results */
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  itemPrice: {
    color: "#FF8800",
    fontWeight: "500",
    marginTop: 2,
  },
  noResults: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
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
    overflow: "hidden"
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
