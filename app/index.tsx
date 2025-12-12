import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const Index = () => {

  const router = useRouter();

  const handleSignInAsBuyer = () => {
    router.push('/buyer/signin');
  }

  const handleSignInAsRider = () => {
    // router.push('/src/(root)/(tab)/riderHome/riderHome');
  }

  const handleSignInAsVendor = () => {
    router.push('/vendor/signin');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/icons/logo.png")} />
        <Text style={styles.title}>Welcome to Varse</Text>
        <Text style={styles.subTitle}>{`Your Market, Your Control.`}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAsBuyer}>
          <Text style={styles.buttonText}>Login as Buyer</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignInAsVendor}>
          <Text style={styles.buttonText}>Login as Vendor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Index;
