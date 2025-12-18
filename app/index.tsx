import { Redirect } from "expo-router";

export default function Index() {
  // New or logged-out users go to onboarding
  return <Redirect href="/onBoarding" />;
}
