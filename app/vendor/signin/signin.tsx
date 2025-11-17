import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";
import styles from "./style";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true)
    const { error, data: { session } } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (session) {
      router.push("/vendor/(root)/(tab)/homePage/home")
    }
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const handleSignUp = () => {
    router.push("/vendor/signup/signup");
  };

  // const handleSignIn = async () => {
  //   const auth = getAuth();
  //   if (!email || !password) {
  //     alert("Please enter both email and password");
  //     return;
  //   }

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     console.log("Signed in user:", user);

  //     router.push("/vendor/(root)/(tab)/homePage/home");
  //   } catch (error) {
  //     console.error(
  //       alert("Invalid email or password. Please try again.")
  //     );
  //   }
  // };

  const signupTxt = { text: "SignUp", onPress: handleSignUp };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/icons/logo.png")} />
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={styles.subTitle}>
          Your Marketplace, Your Control.
        </Text>
      </View>

      <View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome 
              name="envelope" 
              size={20} color="#888" 
              style={{ position: "absolute",left: 20, top: 15, }} 
            />

            <TextInput
              placeholder="Enter Email"
              style={[styles.input, { flex: 1 }]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ position: "relative", justifyContent: "center" }}>
          <FontAwesome 
              name="lock" 
              size={20} color="#888" 
              style={{ position: "absolute",left: 20, top: 15, }} 
            />

          <TextInput
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 20,
              top: 15,
            }}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Line */}
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
        Log in with
      </Text>

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

      <View>
        <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.signUpTxt1}>
          Don't have an account?
          <TouchableOpacity onPress={signupTxt.onPress}>
            <Text style={styles.signUpText2}> {signupTxt.text}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
