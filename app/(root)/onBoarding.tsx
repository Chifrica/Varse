import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const Index = () => {

  const router = useRouter();

  const handleSignInAsBuyer = () => {
    try {
      router.push('/(root)/buyer/signin');
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }

  const handleSignInAsVendor = () => {
    try {
      router.push('/(root)/vendor/signin');
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require("../../assets/icons/logo.png")} 
          style={{ width: 80, height: 80 }}
        />
        <Text style={styles.title}>Welcome to Varse</Text>
        <Text style={styles.subTitle}>{`Your Market, Your Control.`}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAsBuyer}>
          <Text style={styles.buttonText}>Get Started as Buyer</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAsVendor}>
          <Text style={styles.buttonText}>Get Started as Vendor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Index;
