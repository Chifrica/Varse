import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./src/signin/style";

const Index = () => {

  const router = useRouter();
  
  const handleSignIn = () => {
    router.push('/src/signin/index');
  }

  const handleSignInAsBuyer = () => {
    router.push('/src/signin/index');
  }

  const handleSignInAsRider = () => {
    // router.push('/src/(root)/(tab)/riderHome/riderHome');
  }

  const handleSignInAsVendor = () => {
    // router.push('/src/(root)/(tab)/vendorHome/vendorHome');
  }

  const signinTxt = {text: "SignIn", onPress: handleSignIn};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Varse Market</Text>
        <Text style={styles.subTitle}>{`Welcome back! Please login to your \naccount.`}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAsBuyer}>
          <Text style={styles.buttonText}>Login as Buyer</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAsRider}>
          <Text style={styles.buttonText}>Login as Rider</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Login as Vendor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Index;
