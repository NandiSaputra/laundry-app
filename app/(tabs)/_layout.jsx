import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import TabBar from "../../component/tabBar";
import { useDispatch } from "react-redux";
import { getCustomer } from "../../store/customersSlice";
import AdminTopBar from "../../component/topBar";
import { View } from "react-native";

const TabLayout = () => {
  return (
    <View className="flex-1 bg-[#e6e6fa]">
      <AdminTopBar />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ tabBarActiveTintColor: "blue" }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            headerBackVisible: false,
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            headerShown: false,
            headerBackVisible: false,
          }}
        />
        <Tabs.Screen
          name="product"
          options={{
            headerShown: false,
            headerBackVisible: false,
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;
