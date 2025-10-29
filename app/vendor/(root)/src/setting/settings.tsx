import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.back();
  };

  // Notification toggle states
  const [notifications, setNotifications] = useState({
    order: true,
    payment: false,
    chat: true,
    delivery: true,
  });

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
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

        {/* Payment & Wallet */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Payment & Wallet</Text>
          <View style={styles.innerSection}>
            <Text style={styles.item}>Bank Details → Add or edit bank account</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Wallet Settings → View transaction history</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Payout Schedule → Choose daily or weekly payments</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Earnings Reports → Export or view statement</Text>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Notifications</Text>
          <View style={styles.innerSection}>
            <View style={styles.toggleRow}>
              <Text style={styles.item}>Order Notifications</Text>
              <Switch
                value={notifications.order}
                onValueChange={() => toggleSwitch('order')}
                trackColor={{ false: '#ccc', true: '#f59e0b' }}
                thumbColor={notifications.order ? '#fff' : '#f4f3f4'}
              />
            </View>
            <View style={styles.line} />
            <View style={styles.toggleRow}>
              <Text style={styles.item}>Payment Updates</Text>
              <Switch
                value={notifications.payment}
                onValueChange={() => toggleSwitch('payment')}
                trackColor={{ false: '#ccc', true: '#f59e0b' }}
                thumbColor={notifications.payment ? '#fff' : '#f4f3f4'}
              />
            </View>
            <View style={styles.line} />
            <View style={styles.toggleRow}>
              <Text style={styles.item}>Chat Notifications</Text>
              <Switch
                value={notifications.chat}
                onValueChange={() => toggleSwitch('chat')}
                trackColor={{ false: '#ccc', true: '#f59e0b' }}
                thumbColor={notifications.chat ? '#fff' : '#f4f3f4'}
              />
            </View>
            <View style={styles.line} />
            <View style={styles.toggleRow}>
              <Text style={styles.item}>Delivery Updates</Text>
              <Switch
                value={notifications.delivery}
                onValueChange={() => toggleSwitch('delivery')}
                trackColor={{ false: '#ccc', true: '#f59e0b' }}
                thumbColor={notifications.delivery ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>App Preferences</Text>
          <View style={styles.innerSection}>
            <Text style={styles.item}>Dark Mode</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Language → English</Text>
            <View style={styles.line} />
            <Text style={styles.item}>App Version → v1.0.3 (Latest)</Text>
          </View>
        </View>

        {/* Help & Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Help & Legal</Text>
          <View style={styles.innerSection}>
            <Text style={styles.item}>Help & FAQ</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Terms of Service</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Privacy Policy</Text>
            <View style={styles.line} />
            <Text style={styles.item}>Contact Support</Text>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Actions</Text>
          <View style={styles.innerSection}>
            <Text style={styles.item}>Switch Accounts</Text>
            <View style={styles.line} />
            <Text style={[styles.item, { color: '#f59e0b' }]}>Log Out</Text>
            <View style={styles.line} />
            <Text style={[styles.item, { color: 'red' }]}>Delete Account</Text>
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