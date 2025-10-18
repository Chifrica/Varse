import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#F5F5F5", justifyContent: "center" },
    header: { alignItems: "center", marginBottom: 10 },
    title: { fontSize: 38, fontWeight: "bold", marginBottom: 16, color: "#000" },
    subTitle: { fontSize: 20, color: "#999", marginBottom: 32, alignItems: "center", textAlign: "center", fontWeight: "900" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8, // slightly more rounded for modern look
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "280%", // 🔥 expands input width to almost full screen
        alignSelf: "center",
        fontSize: 18, // 🔥 increases both text and placeholder font size
        color: "#333", // input text color
    },
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
        backgroundColor: "#FF8800",
        padding: 12, borderRadius: 4,
        width: 380,
        marginTop: 16
    },
    buttonText: {
        color: "#fff",
        elevation: 1,
        fontSize: 24,
        textAlign: "center",
    },
    signUpTxt1: {
        fontSize: 16,
    },
    signUpText2: {
        color: "#FF8800",
        fontSize: 17,
    },
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#FF8800",
    },
    orTxt: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: "600",
        color: "#555",
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginVertical: 20,
    },
    iconBox: {
        width: 55,
        height: 55,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#E0E0E0",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        // elevation: 0.5, // adds subtle shadow on Android
        shadowColor: "#000", // adds subtle shadow on iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});

export default styles;