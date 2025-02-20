import { useEffect, useState } from "react";
import { Alert, Button, Text } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";

import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers, updateCustomers } from "../../../store/customersSlice";

const CreateModal = ({ isOpenCreate, setIsOpenCreate }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(true);
  const [address, setAddress] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true); // Track phone number validity

  const handleCreate = () => {
    if (!name || !phoneNumber || !address) {
      Alert.alert("Error", "fields Tidak boleh kosong!");
      return;
    }
    dispatch(addCustomers({ name, phoneNumber, address }));
    setIsOpenCreate(false);
    setName("");
    setPhoneNumber("");
    setAddress("");
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
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              textContentType="telephoneNumber"
              style={[
                styles.tlp,
                !isPhoneNumberValid && { borderColor: "red", borderWidth: 1 },
              ]}
              placeholder="No Telepon"
            />
          </View>
        </View>
        <TextInput
          value={address}
          onChangeText={setAddress}
          multiline={true}
          numberOfLines={4}
          style={styles.alamat}
          placeholder="Alamat"
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
