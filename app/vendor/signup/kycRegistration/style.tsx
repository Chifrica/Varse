import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    image: {
        alignSelf: "center"
    },
    headerTxt: {
        fontSize: 38,
        color: "#FF8800",
        fontWeight: "900",
        textAlign: "center"
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
})