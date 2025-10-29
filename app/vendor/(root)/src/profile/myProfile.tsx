import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyProfile = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.navigate("/vendor/(root)/(tab)/menu/menu");
  };

  const handleEditProfile = () => {
    router.navigate("/vendor/(root)/src/profile/editProfile")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Order Details</Text>
        </View>

        {/* Profile Image */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.changeText}>Change Profile Picture</Text>
        </View>

        {/* Info Sections */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>Yusuf Bashir Jafar</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>chikaonwunali20122@gmail.com</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>09014074161</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>No 12 Avenue, Samaru</Text>
        </View>
        <View style={styles.line} />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    alignSelf: 'center',
    marginLeft: 80,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeText: {
    color: '#888',
    fontSize: 20,
  },
  infoSection: {
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#f59e0b',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
