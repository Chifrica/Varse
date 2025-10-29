import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.back();
  };

  const handleUpdate = () => {
    router.navigate('/vendor/(root)/src/profile/myProfile');
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
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
            }}
            style={styles.profileImage}
          />
        </View>

        {/* Info Sections */}
        {[
          { label: 'First Name', placeholder: 'Yusuf Bashir Jafar' },
          { label: 'Email', placeholder: 'chikaonwunali20122@gmail.com' },
          { label: 'Phone Number', placeholder: '09014074161' },
          { label: 'Address', placeholder: 'No 12 Avenue, Samaru' },
        ].map((field, index) => (
          <View key={index}>
            <View style={styles.infoSection}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.line} />
          </View>
        ))}

        {/* Update Button */}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  changeText: {
    color: '#bbb',
    fontSize: 14,
  },
  infoSection: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 1,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#f59e0b',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
