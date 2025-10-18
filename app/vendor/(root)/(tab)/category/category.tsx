import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { foodData, header } from '../category/data'

const Category = () => {

  // const [selectedId, setSelectedId] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const filteredData = foodData.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <FontAwesome name="arrow-left" size={24} color="black" />
          <Text style={styles.headerTitle}>Categories</Text>
        </View>

        <FlatList
          data={header}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {

            // const isSelected = item.id === selectedId;
            const isSelectedCategory = item.category === selectedCategory

            return (
              <TouchableOpacity
                // onPress={() => setSelectedId(item.id)}
                onPress={() => setSelectedCategory(item.category)}
                style={{
                  alignItems: "center",
                  marginRight: 20,
                  paddingBottom: 3,
                }}
              >
                <Text
                  style={{
                    color: isSelectedCategory ? "#FF8800" : "#333",
                    fontWeight: isSelectedCategory ? "bold" : "700",
                    fontSize: 16,
                  }}
                >
                  {item.title}
                </Text>

                {isSelectedCategory && (
                  <View
                    style={{
                      borderBottomWidth: 1.5,
                      borderStyle: "solid",
                      borderColor: "#FF8800",
                      width: "100%",
                      marginTop: 3,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            marginBottom: 20,
            marginHorizontal: 10,
          }}
        />

        <View style={styles.filtersContainer}>
          <Text style={styles.filterText}>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</Text>
          <View style={styles.filterIconContainer}>
            <FontAwesome name="filter" size={20} color="#FF8800" />
            <Text style={styles.filterIconContainerTxt}>Filters</Text>
          </View>
        </View>

        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={styles.foodDataBody}>
              <Image
                source={{ uri: item.uri }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </ScrollView>
    </SafeAreaView >
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: "30%"
  },
  categoryItem: {
    marginRight: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8
  },
  productItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  filterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd9b3ff',
    padding: 8,
    borderRadius: 20,
    gap: 10,
    paddingLeft: 12,
    paddingRight: 12
  },
  filterIconContainerTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF8800'
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000", 
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: "48%", 
    marginBottom: 15,
    overflow: "hidden", 
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
  },
  textContainer: {
    // padding: 10,
    // alignItems: "center",
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 15,
    color: "#FF8800",
    fontWeight: "700",
    marginTop: 4,
  },
  foodDataBody: {
    // backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "48%", // 
    shadowColor: "#000",
    // shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
    marginBottom: 10,
    marginRight: 15,
    marginTop: 10,
  }
})