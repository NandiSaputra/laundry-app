import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CreateModal from "../../component/modal/customers/create";
import Ionicons from "react-native-vector-icons/Ionicons";
import { deleteCustomers, getCustomer } from "../../store/customersSlice";
import EditModal from "../../component/modal/customers/edit";

const Customers = () => {
  const dispatch = useDispatch();
  const { data: customers, loading } = useSelector(
    (state) => state.customers.data
  );
  // modal
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isSreching, setIsSreching] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);
  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);
  const handleShreach = (query) => {
    setIsSreching(query);
    if (query === "") {
      dispatch(getCustomer());
    } else {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin menghapus pelanggan ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          onPress: () => dispatch(deleteCustomers(id)),
          style: "destructive",
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center  pt-[60]">
        <ActivityIndicator size="large" color="#4169e1" />
      </View>
    ); // Loading screen sebelum data di Tampilkan
  }
  return (
    <SafeAreaView className="bg-[#e6e6fa] flex-1">
      <View className="flex mt-3 justify-center items-center">
        <TextInput
          value={isSreching}
          onChangeText={handleShreach}
          placeholder="Cari pelanggan"
          className="w-[300] h-12 px-4 mb-4  border border-[#4169e1] rounded-lg "
        />
      </View>
      <View className="flex justify-center items-end mr-5">
        <TouchableOpacity
          className="bg-[#4169e1] p-2 justify-center items-center rounded-lg mt-4 w-[60]"
          onPress={() => setIsOpenCreate(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginBottom: 61 }}
        showsVerticalScrollIndicator={false}
        data={filteredCustomers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="relative flex-row bg-[#4169e1] mx-5 mt-4  rounded-xl p-4 justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/images/icon-user.png")}
                className="w-16 h-16 rounded-full mr-4"
              />
              <View>
                <Text className="text-xl text-[#e6e6fa] font-bold">
                  {item.name}
                </Text>
                <Text className="text-[#e6e6fa]">{item.phoneNumber}</Text>
                <Text className="text-[#e6e6fa]">{item.address}</Text>
              </View>
            </View>
            <View className="absolute flex-row -bottom-0 -right-0  bg-[#e6e6fa] rounded-s-md px-2 ">
              <TouchableOpacity
                // className="absolute -top-1 -right-1 mr-1 bg-[#a3a5a8]  rounded-full"
                onPress={() => {
                  setSelectedCustomer(item);
                  setIsOpenEdit(true);
                }}
              >
                <Ionicons name="create-outline" size={25} color="#4169e1" />
              </TouchableOpacity>
              <TouchableOpacity
                // className="absolute -top-1 -right-1 mr-1 bg-[#a3a5a8]  rounded-full"
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="close-outline" size={25} color="#4169e1" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-[#4169e1]">
            Tidak ada pelanggan yang ditemukan.
          </Text>
        }
      />
      <CreateModal
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
      />

      <EditModal
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        customer={selectedCustomer}
      />
    </SafeAreaView>
  );
};

export default Customers;
