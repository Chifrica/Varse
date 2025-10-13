import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 15,
	},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        top: 10,
    },
    headerTitle: {
        fontSize: 24,
        height: 30,
        fontWeight: "bold",
    },
    headerGasCart: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F0F0F0",
        padding: 8,
        borderRadius: 50,
    },
    headerGas: {
        // flexDirection: "row",
        // justifyContent: "space-around"
    },
    search: {
        borderRadius: 50,
    },
    category: {
        flexDirection: "row"
    },
    categoryProducts: {
        
    },
    categoryProductsImage: {
        borderRadius: 100
    },
    categoryProductsTxt: {
        fontSize: 18,
        fontWeight: 600
    },
    featuredShops: {},
    trendingProducts: {},
})

export default styles;