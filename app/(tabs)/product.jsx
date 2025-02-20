import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../../store/productSlice";
import CreateModal from "../../component/modal/product/createModal";
import EditModal from "../../component/modal/product/editModal";
const Product = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data || []);
  const userRole = useSelector((state) => state.auth?.userRole);
  const [isSreching, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const handleShreach = (query) => {
    setSearch(query);
    if (query === "") {
      dispatch(getProduct());
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  const handleDelete = (id) => {
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin menghapus product ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          onPress: () => dispatch(deleteProduct(id)),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView className=" flex-1 bg-[#e6e6fa]">
      <View className="flex mt-3 justify-center items-center">
        <TextInput
          value={isSreching}
          onChangeText={handleShreach}
          placeholder="Cari pelanggan"
          className="w-[300] h-12 px-4 mb-4  border border-[#4169e1] rounded-lg "
        />
      </View>
      <View className="flex justify-center items-end mr-4">
        {userRole !== "employee" && (
          <View className="flex justify-center items-end mr-4">
            <TouchableOpacity
              className="bg-[#4169e1] p-2 justify-center items-center rounded-lg mt-4 w-[60px]"
              onPress={() => setIsOpenCreate(true)}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        style={{ marginBottom: 61 }}
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <View className="relative flex-row bg-[#4169e1] mx-5 mt-4  rounded-xl p-4 justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/images/product-icon.png")}
                className="w-16 h-16 rounded-full mr-4"
              />
              <View>
                <Text className="text-xl text-[#e6e6fa] font-bold">
                  {item.name}
                </Text>
                <Text className="text-[#e6e6fa]">{item.price}</Text>
                <Text className="text-[#e6e6fa]">{item.type}</Text>
              </View>
            </View>
            {userRole !== "employee" && (
              <View className="absolute flex-row -bottom-0 -right-0 bg-[#e6e6fa]   rounded-s-lg px-2 ">
                <TouchableOpacity
                  // className="absolute -top-1 -right-1 mr-1 bg-[#a3a5a8]  rounded-full"
                  onPress={() => {
                    setSelectProduct(item);
                    setOpenEdit(true);
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
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-[#4169e1]">
            Tidak ada product yang ditemukan.
          </Text>
        }
      />
      <CreateModal
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
      />
      <EditModal
        isOpenEdit={isOpenEdit}
        setOpenEdit={setOpenEdit}
        product={selectProduct}
      />
    </SafeAreaView>
  );
};

export default Product;
