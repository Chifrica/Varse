import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Google from "expo-auth-session/providers/google";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../utils/supabase";
import styles from "./style";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Google Auth Configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "EXPO_PUBLIC_SUPABASE_CLIENT_ID",
    webClientId: "EXPO_PUBLIC_SUPABASE_CLIENT_ID",
  });

  async function signUpBuyer() {
    // Basic validations
    if (!email || !password || !confirmPassword) {
      Alert.alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    if (!isChecked) {
      Alert.alert("Please accept the Terms and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      await supabase.from("profiles").upsert({
        id: user?.id,
        email: user?.email,
        role: "buyer", 
        updated_at: new Date().toISOString(),
      });

      if (!user) {
        Alert.alert(
          "Verify your email",
          "A verification email has been sent to your inbox."
        );
        setLoading(false);
        return;
      }

      Alert.alert(
        "Verify your email",
        "Account created successfully. Please check your email.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/vendor/signin/signin"),
          },
        ]
      );

    } catch (err) {
      Alert.alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require("../../../assets/icons/logo.png")} />
          <Text style={styles.title}>Welcome to Varse Buyer</Text>
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

          <View style={{ position: "relative", justifyContent: "center" }}>
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

          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

        <Text style={{ fontSize: 18, color: "#666", fontWeight: "700" }}>Sign up with</Text>

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
        <TouchableOpacity
          style={styles.button}
          onPress={signUpBuyer}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating account..." : "Register"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
