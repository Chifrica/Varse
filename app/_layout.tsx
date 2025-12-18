import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import supabase from "./utils/supabase";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().finally(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
