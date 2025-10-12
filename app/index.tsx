import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Varse Market</Text>
        <Text style={styles.subTitle}>{`Welcome back! Please login to your \naccount.`}</Text>
      </View>

      <View>
        <View>
          <Text>Email Address</Text>
          <TextInput placeholder="you@example.com" style={styles.input} />
        </View>

        <View>
          <Text>Password</Text>
          <TextInput placeholder="********" secureTextEntry={true} style={styles.input} />

        </View>

        <TouchableOpacity>
          <Text style={styles.forgetPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Don't have an account? <Text style={styles.signUpText}>Sign Up</Text></Text>
      </View>
    </SafeAreaView>
  );
}
export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#F5F5F5" },
  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 38, fontWeight: "bold", marginBottom: 16, color: "#FF8800" },
  subTitle: { fontSize: 20, color: "#666", marginBottom: 32, alignItems: "center", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 12, marginBottom: 12, width: 300, color: "#CCCCCC" },
  forgetPassword: { textAlign: "right", color: "#FF8800", marginBottom: 32 },
  button: { backgroundColor: "#FF8800", padding: 12, borderRadius: 4, width: 300, marginTop: 16 },
  buttonText: { color: "#fff", elevation: 1, fontSize: 16, textAlign: "center" },
  signUpText: { textAlign: "center", marginTop: 16, color: "#FF8800" }
});
