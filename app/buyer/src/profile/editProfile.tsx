import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import supabase from "../../../utils/supabase";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const router = useRouter();

  // Load profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("Error loading profile:", error);
        return;
      }
      setProfile(data)

      setFullName(data.full_name || "");
      setEmail(data.email || user.email || "");
      setPhone(data.phone_number || "");
      setAddress(data.address || "");
      setProfileImage(data.avatar_url || null);
    };

    loadProfile();
  }, []);

  // Pick image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed", 
        "Allow us to access gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const getMimeTypeFromUri = (uri) => {
    const ext = uri.split('.').pop()?.toLowerCase() || '';
    const map = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
    };
    return map[ext] || 'application/octet-stream';
  };

  const uploadImage = async (imageUri, userId) => {
  if (!imageUri) return null;

  try {
    // 1. Convert image to ArrayBuffer (works in Expo)
    const response = await fetch(imageUri);
    if (!response.ok) throw new Error("Failed to read image");

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // 2. Create unique filename
    const fileExt = imageUri.split(".").pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // 3. Detect MIME type
    const contentType = getMimeTypeFromUri(imageUri);

    // 4. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, uint8Array, {
        contentType,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // 5. Get public URL
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;

  } catch (err) {
    console.log("Upload error:", err);
    return null;
  }
};

  // Update profile on Supabase
  const handleUpdate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Alert.alert("Error", "User not logged in");

    setLoading(true);

    try {
      let imageUrl = profileImage;

      if (profileImage && !profileImage.startsWith("http")) {
        imageUrl = await uploadImage(profileImage, user.id);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          email: email,
          phone_number: phone,
          address: address,
          avatar_url: imageUrl,
          updated_at: new Date(),
        })
        .eq("id", user.id);

      if (error) throw error;

      Alert.alert("Profile updated successfully!");

      router.replace("/buyer/src/profile/myProfile");

    } catch (error) {
      Alert.alert("Update failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackArrow = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri:
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.changeText}>Tap to change photo</Text>
        </View>

        {/* Input fields */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Profile</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  profileSection: { alignItems: "center", marginBottom: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changeText: { color: "#bbb", fontSize: 14, marginTop: 6 },
  label: { fontSize: 16, color: "#555", marginBottom: 6 },
  input: {
    fontSize: 16,
    color: "#333",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF8800",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});