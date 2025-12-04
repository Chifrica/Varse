import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import supabase from "../../utils/supabase";
import styles from "./style";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    try {
      setLoading(true);

      // Sign user in with Supabase Auth
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      const userId = session.user.id;

      // Fetch or create profile
      let { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert([
          {
            id: userId,
            email: session.user.email,
            role: "vendor",
          }
        ]);

        const { data: newProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        profile = newProfile;
      }

      // Restrict login
      if (profile.role !== "vendor") {
        Alert.alert("You're not Vendor'.");
        console.log(profile)
        return;
      }

      // Correct role, now navigate to vendor home
      router.push("/vendor/(root)/(tab)/homePage/home");

    } catch (err) {
      Alert.alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const handleSignUp = () => {
    router.push("/vendor/signup/signup");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/icons/logo.png")} />
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={styles.subTitle}>Your Marketplace, Your Control.</Text>
      </View>

      <View>
        {/* Email Input */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="envelope"
            size={20}
            color="#888"
            style={{ position: "absolute", left: 20, top: 15 }}
          />
          <TextInput
            placeholder="Enter Email"
            style={[styles.input, { flex: 1 }]}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={{ position: "relative", justifyContent: "center" }}>
          <FontAwesome
            name="lock"
            size={20}
            color="#888"
            style={{ position: "absolute", left: 20, top: 15 }}
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
            style={{ position: "absolute", right: 20, top: 15 }}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Sign in"}
        </Text>
      </TouchableOpacity>

      {/* Signup */}
      <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.signUpTxt1}>
          Don't have an account?
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText2}> SignUp</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;
