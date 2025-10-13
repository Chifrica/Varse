import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../app/style";

const Index = () => {

  const router = useRouter();
  
  const handleSignUp = () => {
    router.push('/src/signup/signup');
  }

  const signupTxt = {text: "SignUp", onPress: handleSignUp};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Varse Market</Text>
        <Text style={styles.subTitle}>{`Welcome back! Please login to your \naccount.`}</Text>
      </View>

      <View>
        <View>
          <Text style={styles.inputTxt}>Email Address</Text>
          <TextInput placeholder="you@example.com" style={styles.input} />
        </View>

        <View>
          <Text style={styles.inputTxt}>Password</Text>
          <TextInput placeholder="********" secureTextEntry={true} style={styles.input} />

        </View>

        <TouchableOpacity >
          <Text style={styles.forgetPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.signUpTxt1}>Don't have an account? 
          <TouchableOpacity onPress={signupTxt.onPress}>
            <Text style={styles.signUpText2}> {signupTxt.text}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}
export default Index;
