import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Google from "expo-auth-session/providers/google";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebaseConfig";
import styles from "./style";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  // Google Auth Configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "853543512665-gcfohtk0dnkfjvodgeuosv96tnnf9933.apps.googleusercontent.com",
    webClientId: "853543512665-gcfohtk0dnkfjvodgeuosv96tnnf9933.apps.googleusercontent.com", // from Firebase
  });

  // const auth = getAuth();
  // const provider = new GoogleAuthProvider();

  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     const user = result.user;
  //   }).catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.customData.email;
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //   })

  //   getRedirectResult(auth)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       const user = result.user;
  //     }).catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;

  //       const email = error.customData.email
  //       const credential = GoogleAuthProvider.credentialFromError(error)
  //     })
    // signInWithRedirect(auth, provider);


  // Handle Google login response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed up successfully with Google!");
          router.push("/vendor/signup/kycRegistration/kyc");
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Google Sign-In Failed", error.message);
        });
    }
  }, [response]);

  // Email/Password Signup
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
      router.push("/vendor/signup/kycRegistration/kyc");
    } catch (error) {
      console.log(error);
      Alert.alert("Signup failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/icons/logo.png")} />
        <Text style={styles.title}>Welcome to Varse Vendor</Text>
        <Text style={styles.subTitle}>Your Marketplace, Your Control</Text>
      </View>

      {/* Email/Password Inputs */}
      <View>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Divider */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
          width: "90%",
        }}
      >
        <View style={styles.horizontalLine} />
        <Text style={styles.orTxt}>OR</Text>
        <View style={styles.horizontalLine} />
      </View>

      <Text style={{ fontSize: 18, color: "#666", fontWeight: "700" }}>
        Sign up with
      </Text>

      {/* Social Icons */}
      <View style={styles.socialIcons}>
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <FontAwesome name="apple" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>

      {/* Terms Checkbox */}
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

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
