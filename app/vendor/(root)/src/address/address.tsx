import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Address = () => {
  const router = useRouter();

  const handleBackArrow = () => router.navigate("/vendor/(root)/(tab)/menu/menu");

  const addresses = [
    {
      id: 1,
      title: 'My Home',
      address: '778 Locust View Drive, Oakland, CA',
      icon: 'home-outline',
    },
    {
      id: 2,
      title: 'My Office',
      address: '221 Pinewood Street, San Francisco, CA',
      icon: 'business-outline',
    },
  ];

  const handleAddAddress = () => {
    router.navigate("/vendor/src/address/addAddress")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Address</Text>
        </View>

        {/* Address List */}
        <View style={styles.addressList}>
          {addresses.map((item) => (
            <View key={item.id} style={styles.addressCard}>
              <View style={styles.addressLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color="#FF8800"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.addressTitle}>{item.title}</Text>
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
              </View>

              {/* Radio check (for selected address) */}
              <Ionicons name="radio-button-off-outline" size={22} color="#FF8800" />
            </View>
          ))}
        </View>

        {/* Add New Address Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    alignSelf: 'center',
    marginLeft: 120,
  },
  addressList: {
    marginTop: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    backgroundColor: '#FFF4E5',
    borderRadius: 50,
    padding: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  addressText: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8800',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
});