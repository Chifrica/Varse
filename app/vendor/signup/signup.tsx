import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const SignUp = () => {

    const router = useRouter();

    const handleLogin = () => {
        // router.push('/vendor/(root)/(tab)/homePage/home');
    }

    const handleRegister = () => {
        router.push('/vendor/(root)/(tab)/homePage/home');
    }

    const loginTxt = { text: "  Login", onPress: handleLogin };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Varse Vendor</Text>
        <Text style={styles.subTitle}>{`Your Marketplace, Your Control`}</Text>
      </View>

      <View>
        <View>
          <TextInput placeholder="Enter Email" style={styles.input} />
        </View>

        <View>
          <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />
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
        <Text style={styles.loginText1}>Already have an account?  
            <TouchableOpacity onPress={loginTxt.onPress}> 
                <Text style={styles.loginText2}>{loginTxt.text}</Text> 
            </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}
export default SignUp;