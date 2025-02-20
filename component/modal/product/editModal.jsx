import { useEffect, useState } from "react";
import { Button, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";

import { editProduct } from "../../../store/productSlice";

const EditModal = ({ isOpenEdit, setOpenEdit, product }) => {
  const dispatch = useDispatch();

  // Pastikan state tidak undefined dengan memberikan nilai default ""
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  // Mengupdate state setiap kali customer berubah
  useEffect(() => {
    if (product) {
      setName(product?.name || "");
      setPrice(product?.price?.toString() || "");
      setType(product?.type || "");
    }
  }, [product]);

  const handleEdit = async () => {
    if (!product) return;
    console.log("Mengirim data:", { id: product.id, name, price, type });

    try {
      const response = await dispatch(
        editProduct({
          product: { id: product.id, name, price: Number(price), type },
        })
      ).unwrap(); // Unwrap untuk menangkap respons asli dari Redux Thunk

      console.log("Respons API:", response); // Debug respons dari backend
      setOpenEdit(false);
    } catch (error) {
      console.error("Error saat mengedit produk:", error);
    }
  };

  return (
    <Modal
      isVisible={isOpenEdit}
      swipeDirection="down"
      onSwipeComplete={() => setOpenEdit(false)}
      onBackdropPress={() => setOpenEdit(false)}
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
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            style={styles.tlp}
            placeholder="No Telepon"
          />
        </View>
        <TextInput
          value={type}
          onChangeText={setType}
          multiline={true}
          numberOfLines={4}
          style={styles.alamat}
          placeholder="Alamat"
        />
        <Button title="Edit" onPress={handleEdit} />
      </View>
    </Modal>
  );
};

const styles = {
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    margin: 0,
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
    gap: 10,
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

export default EditModal;
