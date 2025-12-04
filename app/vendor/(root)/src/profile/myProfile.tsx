import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import supabase from '../../../../utils/supabase';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.log("Profile load error:", error);
          return;
        }

        setProfile(data);
      };

      loadProfile();
    }, [])
  );


  const handleBackArrow = () => router.navigate("/vendor/(root)/(tab)/menu/menu");
  const handleEditProfile = () => router.navigate("/vendor/(root)/src/profile/editProfile");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: profile?.avatar_url ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.changeText}>Change Profile Picture</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{profile?.full_name || "—"}</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile?.email || "—"}</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{profile?.phone_number || "—"}</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{profile?.address || "—"}</Text>
        </View>
        <View style={styles.line} />

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
    textAlign: 'center',
    marginLeft: 100,
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
    backgroundColor: '#FF8800',
    paddingVertical: 18,
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
