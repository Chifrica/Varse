// import { Tabs } from "expo-router";
// import React from "react";
// import { Image, ImageBackground, StyleSheet, View } from "react-native";
// import icons from "../../../constants/icons";
// import images from "../../../constants/images";

// const TabIcon = ({ focused, icon }: any) => {
// 	if (focused) {
// 		return (
// 			<>
// 				<ImageBackground
// 					source={images.background}
// 					style={styles.container}>
// 					<Image
// 						source={icon}
// 						style={{
// 							width: 18,
// 							height: 18,
// 							top: "25%",
// 							right: "35%",
// 							position: "absolute",
// 						}}
// 					/>
// 				</ImageBackground>
// 			</>
// 		);
// 	}

// 	return (
// 		<View>
// 			<Image
// 				source={icon}
// 				style={{
// 					width: 20,
// 					height: 20,
// 				}}
// 				tintColor={"#E58945"}
// 			/>
// 		</View>
// 	);
// };
// const AppLayout = () => {
// 	return (
// 		<Tabs
// 			screenOptions={{
// 				tabBarLabelStyle: { color: "#E58945" },
// 			}}>
// 			<Tabs.Screen
// 				name="home/homePage"
// 				options={{
// 					title: "Home",
// 					headerShown: false,
// 					tabBarIcon: ({ focused }) => (
// 						<TabIcon
// 							focused={focused}
// 							icon={icons.home}
// 						/>
// 					),
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="category/categoryScreen"
// 				options={{
// 					title: "Categories",
// 					headerShown: false,
// 					tabBarIcon: ({ focused }) => (
// 						<TabIcon
// 							focused={focused}
// 							icon={icons.explore}
// 						/>
// 					),
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="cart/cartScreen"
// 				options={{
// 					title: "Cart",
// 					headerShown: false,
// 					tabBarIcon: ({ focused }) => (
// 						<TabIcon
// 							focused={focused}
// 							icon={icons.order}
// 						/>
// 					),
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="profile/profileScreen"
// 				options={{
// 					title: "Profile",
// 					headerShown: false,
// 					tabBarIcon: ({ focused }) => (
// 						<TabIcon
// 							focused={focused}
// 							icon={icons.schedule}
// 						/>
// 					),
// 				}}
// 			/>
// 		</Tabs>
// 	);
// };

// export default AppLayout;

// const styles = StyleSheet.create({
// 	container: {
// 		position: "relative",
// 		display: "flex",
// 		width: "100%",
// 		height: "100%",
// 		minWidth: 60,
// 		minHeight: 60,
// 		borderRadius: 50,
// 		marginBottom: 20,
// 		overflow: "hidden",
// 	},
// });
