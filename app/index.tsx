import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./src/signin/style";

const Index = () => {

  const router = useRouter();

  const handleSignInAsBuyer = () => {
    router.push('/src/signin/signin');
  }

  const handleSignInAsRider = () => {
    // router.push('/src/(root)/(tab)/riderHome/riderHome');
  }

  const handleSignInAsVendor = () => {
    router.push('/vendor/signin/signin');
  }

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
        <TouchableOpacity style={styles.button} onPress={handleSignInAsVendor}>
          <Text style={styles.buttonText}>Login as Vendor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Index;
