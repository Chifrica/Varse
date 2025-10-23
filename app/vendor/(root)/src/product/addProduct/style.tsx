import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginLeft: 100,
  },

  // Upload Section
  uploadSection: {
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 25,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
  },

  uploadIconContainer: {
    backgroundColor: "#FFD580",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  uploadSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  // Product Card
  card: {
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
  },

  textArea: {
    height: 100,
  },

  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
