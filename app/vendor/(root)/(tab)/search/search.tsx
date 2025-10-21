import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    categories,
    featuredShops,
    popularItems,
    trendingProducts,
} from "../homePage/data"; // Adjust path if needed

const Search = () => {
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

  // Filter items only when the user starts typing
  const filteredItems =
    searchQuery.trim().length > 0
      ? allItems.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <SafeAreaView style={styles.container}>
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

        <TouchableOpacity style={styles.filterContainer}>
          <Ionicons name="filter" size={20} color="#FF8800" />
        </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  /* Search Bar */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
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
});
