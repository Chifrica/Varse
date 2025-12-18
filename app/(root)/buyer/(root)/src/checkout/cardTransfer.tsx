import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const CardTransfer = () => {
  const [visible, setVisible] = useState(false);
  const { finalTotal } = useLocalSearchParams();

  const router = useRouter();

  const handlePay = () => {
    setVisible(true);
  };

  const formatCurrency = (n) =>
    "₦" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <SafeAreaView style={styles.container}>
      {/* ATM CARD */}
      <View style={styles.card}>
        {/* Flower Decorations */}
        <Text style={styles.flowerTop}>🌸✨</Text>
        <Svg
          height="100%"
          width="100%"
          style={StyleSheet.absoluteFillObject}
          preserveAspectRatio="none"
        >
          <Path
            d="M0 10 L0 100 L50 10 L100 100 L150 10 L200 130 L250 10 L300 100 L350 10"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            opacity={0.1}
          />
        </Svg>
        <Text style={styles.bankName}>Opay</Text>

        <Text style={styles.cardNumber}>9014   0741   61</Text>

        <View style={styles.bottomSection}>
          <Text style={styles.holder}>Onwunali Blessing Chika</Text>
          <Text style={styles.validThru}>VALID ••••</Text>
        </View>

        <Text style={styles.flowerBottom}>✨🌺</Text>
      </View>

      {/* PAY NOW BUTTON */}
      <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>

      {/* POPUP MODAL */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.circle}>
              <Ionicons name="checkmark" size={50} color="#fff" />
            </View>

            <Text style={styles.reviewText}>
              Payment received for {formatCurrency(finalTotal)}
            </Text>

            <Text style={styles.subReview}>
              Your payment is in review for item purchase
            </Text>

            <Text style={styles.celebrate}>🎉✨🎊</Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={async () => {
                // 1. Load cart items
                const savedCart = await AsyncStorage.getItem("cartItems");
                let cart = savedCart ? JSON.parse(savedCart) : [];

                // 2. Mark all items as PAID
                const updatedCart = cart.map(item => ({
                  ...item,
                  paid: true,  // new field
                }));

                // 3. Save updated cart
                await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));

                // 4. Close modal
                setVisible(false);

                // 5. Navigate back to cart
                router.replace("/buyer/order/order");
              }}
            >
              <Text style={styles.closeText}>Okay</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CardTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 16,
    alignItems: "center",
  },

  // CARD DESIGN
  card: {
    width: "92%",
    backgroundColor: "#FF8800",
    height: 180,
    borderRadius: 18,
    padding: 18,
    elevation: 12,
    shadowColor: "#000",
    position: "relative",
  },

  flowerTop: {
    position: "absolute",
    top: 50,
    right: 85,
    fontSize: 20,
  },
  flowerBottom: {
    position: "absolute",
    bottom: 70,
    left: 45,
    fontSize: 20,
  },

  bankName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },

  amountText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },

  cardNumber: {
    fontSize: 20,
    letterSpacing: 3,
    color: "#fff",
    marginTop: 15,
    fontWeight: "700",
  },

  bottomSection: {
    position: "absolute",
    bottom: 25,
    left: 20,
  },
  holder: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  validThru: {
    fontSize: 12,
    color: "#ffe5c4",
    marginTop: 3,
  },

  // PAY BUTTON
  payBtn: {
    backgroundColor: "#FF8800",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  payText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  // MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  circle: {
    width: 90,
    height: 90,
    backgroundColor: "#FF8800",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  reviewText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  subReview: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },
  celebrate: {
    fontSize: 40,
    marginVertical: 10,
  },
  closeBtn: {
    marginTop: 15,
    backgroundColor: "#FF8800",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
