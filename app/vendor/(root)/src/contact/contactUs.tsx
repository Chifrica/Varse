import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactUs = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.navigate("/vendor/(root)/(tab)/menu/menu");
  };

  const handleEmailScreen = () => {
    router.navigate("/vendor/(root)/src/contact/email")
  }

  const handleMobile = () => {
    router.navigate("/vendor/(root)/src/contact/email")
  }

  const handleSocials = () => {
    router.navigate("/vendor/(root)/src/contact/social")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Contact Us</Text>
        </View>

        {/* Contact Options */}
        <TouchableOpacity style={styles.contactBox} onPress={handleEmailScreen}>
          <Ionicons name="mail-outline" size={24} color="#FF8800" style={{backgroundColor: "#eee", borderRadius: 50, padding: 10}} />
          <Text style={styles.contactText}>Via Email</Text>
          <Ionicons name="share-outline" size={22} color="#FF8800" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBox}>
          <Ionicons name="call-outline" size={24} color="#FF8800" style={{backgroundColor: "#eee", borderRadius: 50, padding: 10}} />
          <Text style={styles.contactText}>Mobile</Text>
          <Ionicons name="share-outline" size={22} color="#FF8800" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBox} onPress={handleSocials} >
          <Ionicons name="people" size={24} color="#FF8800" style={{backgroundColor: "#eee", borderRadius: 50, padding: 10}} />
          <Text style={styles.contactText}>Socials</Text>
          <Ionicons name="share-outline" size={22} color="#FF8800" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

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
    marginLeft: 100,
  },
  contactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  contactText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
  },
});
