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
  View
} from "react-native";
import { supabase } from "../../utils/supabase";
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

      // STEP 1 — Sign in using email & password
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      const userId = session.user.id;

      // Check if profile exists
      let { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // If no profile, create one
      if (!profile) {
        await supabase.from("profiles").insert([
          {
            id: userId,
            email: session.user.email,
            role: "buyer",
          }
        ]);

        const { data: newProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        profile = newProfile;
      }

      // Block vendors from using buyer login
      if (profile.role !== "buyer") {
        Alert.alert("This account is a Vendor'.");
        return;
      }

      // STEP 4 — Navigate to Buyer home if role is correct
      router.push("/buyer/(root)/(tab)/homePage/home");

    } catch (err) {
      Alert.alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSignUp = () => {
    router.push("/buyer/signup/signup");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/icons/logo.png")} />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subTitle}>Shop Smart. Shop Easy.</Text>
      </View>

      <View>
        {/* Email */}
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

        {/* Password */}
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

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Sign in"}
        </Text>
      </TouchableOpacity>

      {/* Sign Up */}
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
