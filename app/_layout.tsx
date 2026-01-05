import { Stack } from "expo-router";
import { GlobalProvider } from "./libs/global-provider";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </GlobalProvider>
  );
}

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }
