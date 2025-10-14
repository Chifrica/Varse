import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { foodData, header } from '../category/data'

const Category = () => {

  const [selectedId, setSelectedId] = useState('1');

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

            const isSelected = item.id === selectedId;

            return (
              <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={{
                  alignItems: "center",
                  marginRight: 20,
                  paddingBottom: 3, // spacing before underline
                }}
              >
                <Text
                  style={{
                    color: isSelected ? "#FF8800" : "#333",
                    fontWeight: isSelected ? "bold" : "700",
                    fontSize: 16,
                  }}
                >
                  {item.title}
                </Text>

                {isSelected && (
                  <View
                    style={{
                      borderBottomWidth: 1.5,
                      borderStyle: "solid",
                      borderColor: "#FF8800",
                      width: "100%", // same width as text
                      marginTop: 3, // small space between text and underline
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
        <Text style={styles.filterText}>Food</Text>
        <View style={styles.filterIconContainer}>
          <FontAwesome name="filter" size={20} color="#FF8800" />
          <Text style={styles.filterIconContainerTxt}>Filters</Text>
        </View>
      </View>

      <FlatList
        data={foodData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
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
  }
})