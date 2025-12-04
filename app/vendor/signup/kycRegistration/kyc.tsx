import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const KYCSetUp = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const categories = ["Fashion", "Electronics", "Groceries", "Beauty", "Others"];

  const handleNext = () => {
    if (
      businessName.trim() === "" ||
      selectedCategory.trim() === "" ||
      fullName.trim() === "" ||
      address.trim() === ""
    ) {
      Alert.alert("Incomplete Form", "Please fill out all fields before proceeding.");
    } else {
      router.push("/vendor/(root)/(tab)/homePage/home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Image
          source={require("../../../../assets/icons/logo.png")}
          style={styles.image}
        />

        {/* Header */}
        <View>
          <Text style={styles.headerTxt}>KYC Set Up</Text>
          <Text style={styles.subTitle}>
            You are just a step away from becoming a vendor
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("basic")}
            style={[
              styles.tabButton,
              activeTab === "basic" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "basic" && styles.activeTabText,
              ]}
            >
              Basic Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("documents")}
            style={[
              styles.tabButton,
              activeTab === "documents" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "documents" && styles.activeTabText,
              ]}
            >
              Documents
            </Text>
          </TouchableOpacity>
        </View>

        {/* BASIC INFO SECTION */}
        {activeTab === "basic" && (
          <View style={styles.formContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Business Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Business name"
                  value={businessName}
                  onChangeText={setBusinessName}
                />
              </View>

              {/* Dropdown */}
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowCategories(!showCategories)}
                >
                  <Text style={{ color: selectedCategory ? "#000" : "#aaa" }}>
                    {selectedCategory || "Select category"}
                  </Text>
                  <Ionicons
                    name={showCategories ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#000"
                  />
                </TouchableOpacity>

                {showCategories && (
                  <View style={styles.dropdownList}>
                    {categories.map((item) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => {
                          setSelectedCategory(item);
                          setShowCategories(false);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
        )}

        {/* DOCUMENTS SECTION */}
        {activeTab === "documents" && (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Upload Business CAC</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={24} color="#FF8800" />
              <Text style={{ color: "#FF8800" }}>Upload CAC</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Upload Your NIN</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="document-outline" size={24} color="#FF8800" />
              <Text style={{ color: "#FF8800" }}>Upload NIN</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KYCSetUp;