import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../constants/_data";
import styles from "./style";

const Index = () => {

  const router = useRouter();

  const handleSignInAsBuyer = () => {
    router.replace('/buyer/signin');
  }

  const handleSignInAsVendor = () => {
    try {
          router.replace('/vendor/signin');
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={icons[0].logo} />
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
