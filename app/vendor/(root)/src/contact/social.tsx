import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Social = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.back()
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Socials</Text>
        </View>

        {/* Social Media Options */}
        <TouchableOpacity style={styles.contactBox}>
          <Ionicons
            name="logo-whatsapp"
            size={26}
            color="#25D366"
            style={styles.iconLeft}
          />
          <Text style={styles.contactText}>WhatsApp</Text>
          <Ionicons name="share-social-outline" size={22} color="#FF8800" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBox}>
          <Ionicons
            name="logo-facebook"
            size={26}
            color="#1877F2"
            style={styles.iconLeft}
          />
          <Text style={styles.contactText}>Facebook</Text>
          <Ionicons name="share-social-outline" size={22} color="#FF8800" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBox}>
          <Ionicons
            name="logo-linkedin"
            size={26}
            color="#0A66C2"
            style={styles.iconLeft}
          />
          <Text style={styles.contactText}>LinkedIn</Text>
          <Ionicons name="share-social-outline" size={22} color="#FF8800" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Social;

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
    marginLeft: 120,
  },
  contactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconLeft: {
    backgroundColor: '#eee',
    borderRadius: 50,
    padding: 10,
  },
  contactText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
});
