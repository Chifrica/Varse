import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#F5F5F5", marginTop: 50 },
    header: { alignItems: "center", marginBottom: "20%" },
    title: { 
        fontSize: 38, 
        fontWeight: "bold", 
        marginBottom: 16, 
    },
    subTitle: { fontSize: 20, marginBottom: 32, alignItems: "center", textAlign: "center", fontWeight: "700"},
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 12, marginBottom: 12, width: 300, color: "#CCCCCC" },
    inputTxt: {
        fontSize: 18,
    },
    forgetPassword: { 
        textAlign: "right", 
        color: "#FF8800", 
        marginBottom: 32,
        fontSize: 18, 
    },
    button: { 
        padding: 12, 
        borderRadius: 4, 
        width: 300, 
        marginTop: 25, 
        borderColor: "#FF8800",
        borderWidth: 1,
    },
    buttonText: { 
        color: "#FF8800", 
        elevation: 1, 
        fontSize: 20, 
        textAlign: "center",
        fontWeight: "800"
    },
    signUpTxt1: {
        fontSize: 16,
    },
    signUpText2: { 
        color: "#FF8800",
        fontSize: 17,
    }
});

export default styles;