import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    alignSelf: "center",
    marginLeft: 100,
  },

  // Search bar
  searchContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  // Product Card
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
    marginBottom: 16,
    margin: 1
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FF8800",
    marginVertical: 4,
  },

  // Edit & Delete actions
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 14,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },

  // Stock status
  stock: {
    fontSize: 14,
    fontWeight: "700",
    color: "green",
    marginLeft: 10,
  },

  // Floating Action Button
  fab: {
    position: "absolute",
    bottom: "20%",
    right: 25,
    backgroundColor: "#FF8800", // light orange
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;