import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../store/customersSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateModal from "../../component/modal/transaksi/create";

const CustomerList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.data?.data || []);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  return (
    <View className="flex-1 p-4 bg-[#e6e6fa]">
      <Text className="text-xl font-bold text-[#4169e1]">Daftar Transaksi</Text>
      <Text className="text-[#4169e1] mb-4">Semua Pelanggan</Text>
      <View className="flex justify-center items-end mr-4 mb-4">
        <TouchableOpacity
          className="bg-[#4169e1] p-2 justify-center items-center rounded-lg mt-4 w-[60]"
          onPress={() => setIsOpenCreate(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-[#4169e1] rounded-xl shadow p-4 mb-3 flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold text-[#e6e6fa]">
                {item.name}
              </Text>
              <Text className="text-[#e6e6fa]">{item.phoneNumber}</Text>
            </View>
            <TouchableOpacity
              className="bg-[#e6e6fa] px-4 py-2 rounded-lg"
              onPress={() => router.push(`/transaksi/${item.id}`)}
            >
              <Text className="text-[#4169e1] font-bold">Lihat Transaksi</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <CreateModal
        setIsOpenCreate={setIsOpenCreate}
        isOpenCreate={isOpenCreate}
      />
    </View>
  );
};

export default CustomerList;
