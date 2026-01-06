import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit"; // changed here
import { SafeAreaView } from "react-native-safe-area-context";
import supabase from "../../../../../utils/supabase";

const screenWidth = Dimensions.get("window").width;

const Order = () => {
  const router = useRouter();

  const [recentOrders, setRecentOrders] = useState([]);
  const [dailyPerformance, setDailyPerformance] = useState([0, 0, 0, 0, 0, 0, 0]);

  const handleBackArrow = () => {
    router.back();
  };

  useEffect(() => {
    const loadOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error("No user found");
        return;
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("vendor_id", user.id)
        .eq("paid", true)
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        console.log("Fetched orders:", data); // Debug log
        console.log("User ID:", user.id); // Debug log
      }

      setRecentOrders(data || []);
      calculateDailyPerformance(data || [])
    };

    loadOrders();
  }, []);

  const calculateDailyPerformance = (orders) => {
    const performance = [0, 0, 0, 0, 0, 0, 0];

    orders.forEach((order) => {
      const orderDate = new Date(order.created_at);
      const dayOfWeek = orderDate.getDay();

      performance[dayOfWeek] += 1;
    });

    const adjustedPerformance = [...performance.slice(1), performance[0]];

    setDailyPerformance(adjustedPerformance);
  }

  const handleOderReview = (order) => {
    router.push({
      pathname: "/vendor/src/order/orderReview",
      params: { order: JSON.stringify(order) },
    });
  };

  const formatCurrency = (amount, currency = "NGN") => {
    if (isNaN(amount)) return "₦0";
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return currency === "NGN" ? `₦ ${formatted}` : formatted;
  };


  const handleCancelledOrder = () => {
    router.navigate("/(root)/vendor/(root)/src/order/cancelOrder/cancelledOrder")
  }

  const handleCompletedOrder = () => {
    router.navigate("/(root)/vendor/(root)/src/order/completedOrder/completedOrder")
  }

  const handleInProgressOrder = () => {
    router.navigate("/(root)/vendor/(root)/src/order/inProgressOrder/inProgressOrder")
  }

  const handlePendingOrder = () => {
    router.navigate("/(root)/vendor/(root)/src/order/pendingOrder/pendingOrder")
  }

  const stats = [
    { label: "Completed", value: 600, color: "#22C55E", onPress: handleCompletedOrder },
    { label: "Pending", value: 3, color: "#FF8800", onPress: handlePendingOrder },
    { label: "In Progress", value: 2, color: "#3B82F6", onPress: handleInProgressOrder },
    { label: "Cancelled", value: 2, color: "#EF4444", onPress: handleCancelledOrder },
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
            <TouchableOpacity key={index} style={[styles.statBox]} onPress={item.onPress}>
              <Text style={[styles.statLabel, { color: item.color }]}>
                {item.label}
              </Text>
              <Text style={[styles.statValue, { color: item.color }]}>
                {item.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Performance */}
        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceTitle}>Daily Performance</Text>
            <Text style={styles.performanceSub}>Last 7 days</Text>
          </View>

          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: dailyPerformance,
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
              // barPercentage: 0.6,
              propsForDots: {
                r: "3",
                strokeWidth: "0.1",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={styles.chartStyle}
          />
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersContainer}>
          <Text style={styles.recentOrdersTitle}>Recent Orders</Text>

          {recentOrders.length === 0 ? (
            <Text style={{ textAlign: "center", padding: 10 }}>No recent orders yet</Text>
          ) : (
            recentOrders.map((order, index) => (
              <TouchableOpacity key={index} style={styles.orderCard} onPress={() => handleOderReview(order)}>
                <View style={styles.orderRow}>
                  <Image
                    source={{
                      uri: order.image
                    }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>Product Name: {`  ${order.name}`}</Text>
                    <Text style={styles.orderId}>
                      {`Price: ${formatCurrency(order.total_price)} \nProduct ID: ${order.product_id} \nDate of Order Placed: ${new Date(order.created_at).toLocaleDateString()}`}
                    </Text>
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
              </TouchableOpacity>
            ))
          )}
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