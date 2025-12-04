import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    /** Header */
    header: {
        marginBottom: 20,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
        alignSelf: "center",
        marginLeft: 100,
    },

    /** Image Card */
    imageCard: {
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        alignItems: "center",
        marginBottom: 20,
    },
    imageWrapper: {
        position: "relative",
    },
    productImage: {
        width: 180,
        height: 180,
        borderRadius: 12,
        alignSelf: "center",
        marginRight: 50
    },
    topRightIcons: {
        position: "absolute",
        top: 8,
        right: 0,
        flexDirection: "column",
        gap: 10,
    },
    icon: {
        backgroundColor: "#FFF",
        padding: 6,
        borderRadius: 8,
        elevation: 3,
    },

    /** Details Card */
    detailsCard: {
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    productHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF8800",
    },
    inStock: {
        fontSize: 14,
        color: "#10B981",
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 10,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontSize: 18,
        color: "#6B7280",
    },
    value: {
        fontSize: 18,
        color: "#111827",
        fontWeight: "900",
    },
    description: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 20,
        color: "#374151",
    },

    /** Bottom Buttons */
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 24,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#FF8800",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    reviewButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderColor: "#FF8800",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 20,
        borderWidth: 1,
    },
    reviewButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF8800",
    },
});

export default styles;