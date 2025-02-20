import { useState } from "react";
import { Alert, Button } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/productSlice";

const CreateModal = ({ isOpenCreate, setIsOpenCreate }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const handleCreate = () => {
    const trimmedName = name.trim();
    const trimmedType = type.trim();
    const priceValue = Number(price);

    // Validasi input kosong
    if (!trimmedName || !trimmedType) {
      Alert.alert("Error", "Nama dan Tipe harus diisi.");
      return;
    }

    // Validasi harga
    if (!price || isNaN(priceValue) || priceValue <= 0) {
      Alert.alert("Error", "Harga harus berupa angka dan lebih dari 0.");
      return;
    }
    console.log("Adding product:", { name, price, type });
    dispatch(addProduct({ name, price: Number(price), type }));
    setIsOpenCreate(false);
    setName("");
    setPrice("");
    setType("");
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
        <View style={styles.form}>
          <TextInput
            style={styles.nama}
            value={name}
            onChangeText={setName}
            placeholder="Nama"
          />
          <View className="w-full">
            <TextInput
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              textContentType="telephoneNumber"
              style={[styles.tlp]}
              placeholder="Harga"
            />
          </View>
        </View>
        <TextInput
          value={type}
          onChangeText={setType}
          multiline={true}
          numberOfLines={4}
          style={styles.alamat}
          placeholder="Type"
        />
        <Button title="Simpan" onPress={handleCreate} />
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
    height: 250,
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
