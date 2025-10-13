import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {

    const router = useRouter();

    const handleLogin = () => {
        router.push('/');
    }

    const handleRegister = () => {
        router.push('/src/(root)/(tab)/homePage/home');
    }

    const loginTxt = { text: "Login", onPress: handleLogin };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Varse Market</Text>
        <Text style={styles.subTitle}>{`Join us and start shopping!`}</Text>
      </View>

      <View>
        <View>
          <TextInput placeholder="Full Name" style={styles.input} />
        </View>

        <View>
          <TextInput placeholder="Email Address" style={styles.input} />
        </View>

        <View>
          <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} />
        </View>

        <View>
          <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.input} />
        </View>

      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <Text>Already have an account?  
            <TouchableOpacity onPress={loginTxt.onPress}> 
                <Text style={styles.loginText}>{loginTxt.text}</Text> 
            </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}
export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#F5F5F5", justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 38, fontWeight: "bold", marginBottom: 16, color: "#FF8800" },
  subTitle: { fontSize: 20, color: "#666", marginBottom: 32, alignItems: "center", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, elevation: 0, padding: 12, marginBottom: 12, width: 300, color: "#CCCCCC" },
  button: { backgroundColor: "#FF8800", padding: 12, borderRadius: 4, width: 300, marginTop: 16 },
  buttonText: { color: "#fff", elevation: 1, fontSize: 16, textAlign: "center" },
  loginText: { color: "#FF8800" }
});
