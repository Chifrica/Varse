import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const Index = () => {

  const router = useRouter();

  const handleSignUp = () => {
    router.push('/vendor/signup/signup');
  }

  const signupTxt = { text: "SignUp", onPress: handleSignUp };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/icons/logo.png')}
        />
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={styles.subTitle}>{`Your Marketplace, Your Control.`}</Text>
      </View>

      <View>
        <View>
          <TextInput placeholder="Enter Email" style={styles.input} />
        </View>

        <View>
          <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />

        </View>

        {/* <TouchableOpacity >
          <Text style={styles.forgetPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}
      </View>
      {/* Horizontal Line */}
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
      <View>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
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
