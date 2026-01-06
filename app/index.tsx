import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useGlobalContext } from "./libs/global-provider";

export default function Index() {
  const { isLoggedIn, loading, role } = useGlobalContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoggedIn && role === "buyer") {
    return <Redirect href="/(root)/buyer/(root)/(tab)/homePage/home" />;
  }

  if (isLoggedIn && role === "vendor") {
    return <Redirect href="/(root)/vendor/(root)/(tab)/homePage/home" />;
  }

  // Fallback safety
  return <Redirect href="/(root)/onBoarding" />;
}
