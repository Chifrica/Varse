import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
import { auth, db, storage } from "../../../../../firebaseConfig";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ Load existing user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFirstName(data.firstName || "");
          setEmail(data.email || user.email || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setProfileImage(data.profileImage || null);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need permission to access your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // handling update button
  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "No user logged in!");
      return;
    }

    // ✅ Prevent update if nothing was filled or changed
    if (!firstName && !email && !phone && !address && !profileImage) {
      Alert.alert("Nothing to update", "Please fill at least one field or choose an image.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (profileImage && !profileImage.startsWith("https")) {
        // Upload new image only if it's a local URI
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      } else {
        imageUrl = profileImage; 
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName: firstName || null,
          email: email || null,
          phone: phone || null,
          address: address || null,
          profileImage: imageUrl || null,
        },
        { merge: true }
      );

      const updatedDoc = await getDoc(doc(db, "users", user.uid));
      if (updatedDoc.exists()) {
        setProfileImage(updatedDoc.data());
      }
      router.replace("/vendor/(root)/src/profile/myProfile");

    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Input Fields */}
        {[
          { label: "First Name", value: firstName, onChangeText: setFirstName },
          { label: "Email", value: email, onChangeText: setEmail },
          { label: "Phone Number", value: phone, onChangeText: setPhone },
          { label: "Address", value: address, onChangeText: setAddress },
        ].map((field, i) => (
          <View key={i}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChangeText}
              placeholder={field.label}
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Update Profile</Text>
          )}
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