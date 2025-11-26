import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../../utils/supabase";

const Home = () => {

  const [profile, setProfile] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("vendor_id", user.id)   // your vendor ID
        .order("created_at", { ascending: false });

      if (!error) setRecentOrders(data);
    };

    loadOrders();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if(!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) {
        throw new Error(error);
      }

      setProfile(data);
    };

    loadProfile();
  }, []); 

  const colorScheme = useColorScheme();

  const router = useRouter();

  const handleAddProduct = () => {
    router.push("/vendor/(root)/src/product/myProduct");
  }

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // Prefer displayName; fallback to email if displayName is null
  //       setUserName(user.displayName || user.email?.split("@")[0] || "User");
  //     } else {
  //       setUserName("User");
  //     }
  //   });
  //   return unsubscribe; // cleanup listener on unmount
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: profile?.avatar_url
            }}
            style={styles.logo}
          />
          <View>
            <Text style={styles.greeting}>Hi {profile?.full_name?.split(" ")[0]} 👋</Text>
            <Text style={styles.subGreeting}>Welcome back!</Text>
          </View>
        </View>

        {/* Dashboard Section */}
        <View style={styles.dashboard}>
          <View style={styles.card}>
            <Ionicons name="cash-outline" size={26} color="#FF8800" />
            <View>
              <Text style={styles.cardTitle}>
                Total Sales
                <Text style={styles.cardValue}>{`    1`}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Ionicons name="cart-outline" size={26} color="#FF8800" />
            <View>
              <Text style={styles.cardTitle}>
                Pending Orders
                <Text style={styles.cardValue}>{`    14`}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Ionicons name="cube-outline" size={26} color="#FF8800" />
            <View>
              <Text style={styles.cardTitle}>
                Active Products
                <Text style={styles.cardValue}>{`    10`}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Ionicons name="wallet-outline" size={26} color="#FF8800" />
            <View>
              <Text style={styles.cardTitle}>
                Wallet Balance
                <Text style={styles.cardValue}>{`    $5`}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Actions Row */}
        <View style={styles.actionsRow}>
          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.iconWrapper} onPress={handleAddProduct}>
              <Ionicons name="add" size={26} color="#FF8800" />
            </TouchableOpacity>
            <Text style={styles.actionText}>Add New Product</Text>
          </View>

          <View style={styles.actionItem}>
            <View style={styles.iconWrapper}>
              <Ionicons name="wallet-outline" size={26} color="#FF8800" />
            </View>
            <Text style={styles.actionText}>Withdraw Earnings</Text>
          </View>

          <View style={styles.actionItem}>
            <View style={styles.iconWrapper}>
              <Ionicons name="list-outline" size={26} color="#FF8800" />
            </View>
            <Text style={styles.actionText}>View Orders</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Orders</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          {recentOrders.length === 0 ? (
            <Text style={{ textAlign: "center", padding: 10 }}>No recent orders yet</Text>
          ) : (
            recentOrders.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.orderRow}
              // onPress={handleOderReview}
              >
                <Text style={styles.orderName}>{order.name}</Text>
                <Text style={{ color: "#22C55E", fontWeight: "700" }}>Paid</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.recentOrders}>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>

          <View style={styles.divider} />

          {recentOrders.length === 0 ? (
            <Text style={{ textAlign: "center", padding: 10 }}>No recent orders yet</Text>
          ) : (
            recentOrders.map((order, index) => (
              <View key={index} style={styles.orderCard}>
                <View>
                  <Text style={styles.orderTitle}>{order.name}</Text>
                  <Text style={styles.orderDetails}>
                    Price: ₦{order.totalPrice} | ID: {order.id}
                  </Text>
                </View>

                <Text style={styles.approved}>Paid</Text>
              </View>
            ))
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    // color: "#000",
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
  },

  // Dashboard
  dashboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#FFF5E5",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 14,
    // color: "#333",
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF8800",
    marginLeft: 4,
    paddingLeft: 10
  },

  // Actions Row
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 5,
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 55,
    height: 55,
    // backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginBottom: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },

  // Recent Orders
  recentOrders: {
    marginTop: 20,
    borderRadius: 20,
    padding: 8,
    borderWidth: 0.5,
    borderColor: "#888",
    // backgroundColor: "#fff",
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  seeAll: {
    fontSize: 20,
    color: "#FF8800",
    fontWeight: "500",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderDetails: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  approved: {
    color: "green",
    fontWeight: "700",
  },
  pending: {
    color: "#FF8800",
    fontWeight: "700",
  },
  declined: {
    color: "red",
    fontWeight: "700",
  },
  orderRow: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd"
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

});
