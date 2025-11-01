import FontAwesome from "@expo/vector-icons/FontAwesome";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebaseConfig";
import styles from "./style";

const SignUp = () => {

  const router = useRouter();

   const handleKYC = () => {
    router.push('/vendor/signup/kycRegistration/kyc')
  }

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const handleRegister = async () => {
  if (!email || !password || !confirmPassword) {
    Alert.alert("Error", "All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match.");
    return;
  }

  if (!isChecked) {
    Alert.alert("Error", "You must agree to the Terms and Privacy Policy.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Alert.alert("Success", "Account created successfully!");
    router.push('/vendor/signup/kycRegistration/kyc')
  } catch (error) {
    console.log(error);
    Alert.alert("Signup failed", error.message);
  }
};

  const handleLogin = () => {
    // router.push('/vendor/(root)/(tab)/homePage/home');
  }

  // const handleRegister = () => {
  //   router.push('/vendor/(root)/(tab)/homePage/home');
  // }

  const loginTxt = { text: "  Login", onPress: handleLogin };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/icons/logo.png')} />
        <Text style={styles.title}>Welcome to Varse Vendor</Text>
        <Text style={styles.subTitle}>{`Your Marketplace, Your Control`}</Text>
      </View>

      <View>
        <View>
          <TextInput
            placeholder="Enter Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20, width: "90%" }}>
        <View style={styles.horizontalLine} />
        <Text style={styles.orTxt}>
          OR
        </Text>
        <View
          style={styles.horizontalLine} />
      </View>

      <Text style={{ fontSize: 18, color: '#666', fontWeight: '700' }}>Log in with</Text>

      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.iconBox}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <FontAwesome name="apple" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>

      <View style={styles.agreementContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#FF8800" : undefined}
        />
        <Text style={styles.agreementText}>
          {"  "}I agree to the{" "}
          <Text style={styles.linkText}>Terms and Privacy Policy</Text>
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default SignUp;