import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit"; // changed here
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

const Order = () => {
  const router = useRouter();

  const handleBackArrow = () => {
    router.back();
  };

  const stats = [
    { label: "Completed", value: 600, color: "#22C55E" },
    { label: "Pending", value: 3, color: "#F59E0B" },
    { label: "In Progress", value: 2, color: "#3B82F6" },
    { label: "Cancelled", value: 2, color: "#EF4444" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>My Products</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {stats.map((item, index) => (
            <View key={index} style={[styles.statBox]}>
              <Text style={[styles.statLabel, { color: item.color }]}>
                {item.label}
              </Text>
              <Text style={[styles.statValue, { color: item.color }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Daily Performance */}
        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceTitle}>Daily Performance</Text>
            <Text style={styles.performanceSub}>Last 7 days</Text>
          </View>

          <BarChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [5, 9, 7, 15, 8, 6, 8],
                },
              ],
            }}
            width={screenWidth - 50}
            height={220}
            fromZero
            yAxisLabel=""        
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.6,
            }}
            style={styles.chartStyle}
          />

          <View
            style={{
              position: "absolute",
              left: (screenWidth - 50) / 7 * 4.2,
              bottom: 55,
              width: 20,
              height: 165,
              backgroundColor: "#FF7A00",
              opacity: 0.4,
            }}
          />


        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersContainer}>
          <Text style={styles.recentOrdersTitle}>Recent Orders</Text>

          {[
            { status: "Completed", color: "#22C55E" },
            { status: "In Progress", color: "#3B82F6" },
            { status: "Cancelled", color: "#EF4444" },
            { status: "Pending", color: "#F59E0B" },
          ].map((order, index) => (
            <View key={index} style={styles.orderCard}>
              <View style={styles.orderRow}>
                <Image
                  source={{
                    uri: "https://waziri.ng/wp-content/uploads/2024/01/Versace-Leather-White-Shoe-for-Men.jpg",
                  }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Product Name</Text>
                  <Text style={styles.orderId}>Order Id: #VAR102ABC</Text>
                </View>
                <Text style={[styles.orderStatus, { color: order.color }]}>
                  {order.status}
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#000"
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;

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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    width: "48%",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#eee",
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },
  performanceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  performanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  performanceSub: {
    color: "#888",
  },
  chartStyle: {
    borderRadius: 10,
    marginTop: 5,
  },
  recentOrdersContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  recentOrdersTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontWeight: "600",
    color: "#000",
  },
  orderId: {
    color: "#555",
    fontSize: 12,
  },
  orderStatus: {
    fontWeight: "600",
  },
});
