import { useEffect, useState } from "react";
import { Alert, Button, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";

import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../../store/customersSlice";
import { getProduct } from "../../../store/productSlice";
import { Picker } from "@react-native-picker/picker";
import { createBill } from "../../../store/billSlice";

const CreateModal = ({ isOpenCreate, setIsOpenCreate }) => {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customers?.data?.data || []);
  const products = useSelector((state) => state.products?.data || []);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState("");

  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getProduct());

    console.log("🔄 Memuat ulang transaksi...");
  }, [dispatch]);

  const handleCreateTransaction = () => {
    if (!selectedCustomer || !selectedProduct || !qty) {
      Alert.alert("Error", "Harap isi semua data transaksi!");
      return;
    }
    console.log("🔍 customerId:", selectedCustomer);
    console.log("🔍 productId:", selectedProduct);

    const transactionData = {
      customerId: selectedCustomer,
      billDetails: [
        {
          product: { id: selectedProduct }, // 🔹 Pastikan formatnya seperti ini
          qty: parseInt(qty),
        },
      ],
    };
    console.log(
      "📤 Data dikirim ke API:",
      JSON.stringify(transactionData, null, 2)
    );

    dispatch(createBill(transactionData)).then(() => {
      Alert.alert("Sukses", "Transaksi berhasil dibuat!");

      setSelectedCustomer(null);
      setSelectedProduct(null);
      setQty("");
      setIsOpenCreate(false);
    });
  };

  return (
    <Modal
      isVisible={isOpenCreate}
      swipeDirection="down"
      onSwipeComplete={() => setIsOpenCreate(false)}
      onBackdropPress={() => setIsOpenCreate(false)}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text className="text-gray-700">Pilih Pelanggan:</Text>
        <Picker
          selectedValue={selectedCustomer}
          onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
        >
          <Picker.Item label="Pilih Pelanggan" value={null} />
          {customers?.length > 0 &&
            customers.map((cust) => (
              <Picker.Item key={cust.id} label={cust.name} value={cust.id} />
            ))}
        </Picker>
        {/* 🔹 Pilih Produk */}
        <Text className="text-gray-700">Pilih Produk:</Text>
        <Picker
          selectedValue={selectedProduct}
          onValueChange={(itemValue) => setSelectedProduct(itemValue)}
        >
          <Picker.Item label="Pilih Produk" value={null} />
          {products.map((prod) => (
            <Picker.Item key={prod.id} label={prod.name} value={prod.id} />
          ))}
        </Picker>
        {/* 🔹 Input Jumlah */}
        <Text className="text-gray-700">Jumlah:</Text>
        <TextInput
          value={qty}
          onChangeText={setQty}
          keyboardType="numeric"
          placeholder="Masukkan jumlah"
          className="border border-gray-300 p-2 rounded-lg mb-4"
        />
        {/* 🔹 Tombol Simpan Transaksi */}
        <TouchableOpacity
          className="bg-[#367aff] p-2 rounded-lg items-center"
          onPress={handleCreateTransaction}
        >
          <Text className="text-white font-bold">Simpan Transaksi</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = {
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    margin: 0, // Hilangkan margin bawaan agar pas di bawah
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: 350,
    position: "absolute",
    bottom: 0,
    gap: 10, // Biar muncul di bawah layar
  },
  form: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    paddingRight: 10,
  },
  nama: {
    padding: 15,
    borderRadius: 5,
    width: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  tlp: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 15,
    borderRadius: 5,
    width: "40%",
  },
  alamat: {
    height: 110,
    textAlignVertical: "top",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 15,
    borderRadius: 5,
    width: "100%",
  },
};
export default CreateModal;
