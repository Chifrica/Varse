import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteUser, getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const router = useRouter();
  const auth = getAuth();

  const handleBackArrow = () => {
    router.back();
  };

  // -----------------------------
  // TOGGLE STATES
  // -----------------------------
  const [notifications, setNotifications] = useState({
    order: true,
    payment: false,
    chat: true,
    delivery: true,
  });

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // -----------------------------
  // LOGOUT HANDLER
  // -----------------------------
  const handleLogOut = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOut(auth);
              alert("Logged out successfully");
              router.replace("/vendor/signin/signin");
            } catch (error) {
              console.error("Error logging out:", error.message);
              alert("Failed to log out. Try again.");
            }
          },
        },
      ]
    );
  };

  // -----------------------------
  // DELETE ACCOUNT HANDLER
  // -----------------------------
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          onPress: async () => {
            const user = auth.currentUser;
            if (user) {
              try {
                await deleteUser(user);
                alert("Account deleted successfully.");
                router.replace("/vendor/signin/signin");
              } catch (error) {
                console.error("Error deleting account:", error.message);
                alert("Failed to delete account. Please log in again and try.");
              }
            } else {
              alert("No user is currently signed in.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  // -----------------------------
  // SWITCH ACCOUNT HANDLER
  // -----------------------------
  const handleSwitchAccount = () => {
    Alert.alert(
      "Switch Account",
      "Do you want to switch to your buyer account?",
      [
        {
          text: "No, Log Out Instead",
          onPress: async () => {
            try {
              await signOut(auth);
              alert("Logged out successfully");
              router.replace("/vendor/signin/signin");
            } catch (error) {
              console.error("Error logging out:", error.message);
              alert("Failed to log out. Try again.");
            }
          },
        },
        {
          text: "Yes, Switch to Buyer",
          onPress: () => {
            router.replace("/buyer/signin/signin");
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
            <TouchableOpacity onPress={handleSwitchAccount}>
              <Text style={[styles.item, { color: '#007AFF' }]}>Switch Accounts</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={handleLogOut}>
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



  // Handle Google login response
  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential)
  //       .then(() => {
  //         Alert.alert("Success", "Signed up successfully with Google!");
  //         router.push("/vendor/signup/kycRegistration/kyc");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         Alert.alert("Google Sign-In Failed", error.message);
  //       });
  //   }
  // }, [response]);