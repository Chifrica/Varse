import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#F5F5F5", justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 38, fontWeight: "bold", marginBottom: 16, color: "#FF8800" },
  subTitle: { fontSize: 20, color: "#666", marginBottom: 32, alignItems: "center", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 12, marginBottom: 12, width: 300, color: "#CCCCCC" },
  forgetPassword: { textAlign: "right", color: "#FF8800", marginBottom: 32 },
  button: { backgroundColor: "#FF8800", padding: 12, borderRadius: 4, width: 300, marginTop: 16 },
  buttonText: { color: "#fff", elevation: 1, fontSize: 16, textAlign: "center" },
  signUpText: { color: "#FF8800" }
});

export default styles;