import { Stack } from "expo-router";
import ErrorBoundary from "./components/ErrorBoundary";
import { GlobalProvider } from "./libs/global-provider";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
    </ErrorBoundary>
  );
}
