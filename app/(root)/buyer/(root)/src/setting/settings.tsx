import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import supabase from '../../../../../utils/supabase';

const Settings = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.back();
  };

  const [notifications, setNotifications] = useState({
    order: true,
    payment: false,
    chat: true,
    delivery: true,
  });

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Do you want to continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call your Edge Function
              const { error } = await supabase.functions.invoke("delete-user", {});

              if (error) {
                Alert.alert("Error", error.message);
                return;
              }

              // Log out after deletion
              await supabase.auth.signOut();

              Alert.alert("Deleted", "Your account has been permanently removed.");
              router.replace("/buyer/signin");
            } catch (err) {
              Alert.alert("Error", "Something went wrong.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          <View style={styles.innerSection}>
            <Text style={styles.item}>Profile Information → Edit name, phone, email</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Store Info → Update store name, logo, business category etc.</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Change Password → Update login password</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Address & Location → View/edit pickup address</Text>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Notifications</Text>
          <View style={styles.innerSection}>
            {Object.keys(notifications).map((key, index) => (
              <View key={key}>
                <View style={styles.toggleRow}>
                  <Text style={styles.item}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                  </Text>
                  <Switch
                    value={notifications[key]}
                    onValueChange={() => toggleSwitch(key)}
                    trackColor={{ false: '#ccc', true: '#f59e0b' }}
                    thumbColor={notifications[key] ? '#fff' : '#f4f3f4'}
                  />
                </View>
                {index !== Object.keys(notifications).length - 1 && (
                  <View style={styles.line} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Actions</Text>
          <View style={styles.innerSection}>
            <TouchableOpacity onPress={() => ""}>
              <Text style={[styles.item, { color: '#007AFF' }]}>Switch Accounts</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={() => ""}>
              <Text style={[styles.item, { color: '#f59e0b' }]}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text style={[styles.item, { color: 'red' }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

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
    marginLeft: 110,
  },
  section: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  innerSection: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  item: {
    fontSize: 16,
    color: '#333',
    marginVertical: 6,
    fontWeight: '500',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});