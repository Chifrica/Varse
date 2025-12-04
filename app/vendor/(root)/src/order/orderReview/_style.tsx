import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    header: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
        alignSelf: "center",
        marginLeft: 100,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        marginHorizontal: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginBottom: 8,
    },
    text: {
        color: "#555",
        fontSize: 14,
        marginBottom: 5,
    },
    bold: {
        fontWeight: "600",
        color: "#000",
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontWeight: "600",
        fontSize: 15,
        color: "#000",
    },
    itemQty: {
        color: "#666",
        fontSize: 13,
    },
    itemPrice: {
        fontWeight: "700",
        fontSize: 15,
        color: "#000",
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 8,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftStatus: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    statusText: {
        fontSize: 15,
        fontWeight: "700",
    },
});

export default styles;