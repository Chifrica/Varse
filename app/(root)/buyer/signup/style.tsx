import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        marginTop: 50
    },
    header: {
        alignItems: "center",
        marginBottom: 10
    },
    title: {
        fontSize: 38,
        fontWeight: "900",
        marginBottom: 16,
        color: "#000",
    },
    subTitle: {
        fontSize: 20,
        color: "#999",
        marginBottom: 32,
        alignItems: "center",
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: 350,
        alignSelf: "center",
        fontSize: 18,
        color: "#333",
    },
    button: {
        backgroundColor: "#FF8800",
        padding: 12,
        borderRadius: 4,
        width: 350,
        marginTop: 16
    },
    buttonText: {
        color: "#fff",
        elevation: 1,
        fontSize: 24,
        textAlign: "center"
    },
    loginText1: {
        fontSize: 16,
    },
    loginText2: {
        color: "#FF8800",
        fontSize: 18
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
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    }, agreementContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 16,
        width: "90%", // aligns with your inputs & button
        alignSelf: "center",
    },
    checkboxPlaceholder: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: "#FF8800",
        marginRight: 10,
    },
    agreementText: {
        fontSize: 16,
        color: "#333",
        flexShrink: 1,
    },
    linkText: {
        color: "#FF8800", // default orange
        fontWeight: "600",
    },
});

export default styles;