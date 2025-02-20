import { useEffect, useState } from "react";
import { Button, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { getCustomer, updateCustomers } from "../../../store/customersSlice";
import { getBills } from "../../../store/billSlice";

const EditModal = ({ isOpenEdit, setIsOpenEdit, customer }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // Mengupdate state setiap kali customer berubah
  useEffect(() => {
    if (customer) {
      setName(customer?.name || "");
      setPhoneNumber(customer?.phoneNumber || "");
      setAddress(customer?.address || "");
    }
  }, [customer]);

  const handleEdit = () => {
    if (!customer) return;
    console.log("id customer", customer?.id);
    dispatch(
      updateCustomers({
        customer: { id: customer.id, name, phoneNumber, address },
      })
    );
    console.log("Data yang diedit:", {
      id: customer.id,
      name,
      phoneNumber,
      address,
    });
    dispatch(getCustomer()); // Refresh daftar customer
    dispatch(getBills()); // Refresh transaksi agar data customer terbaru digunakan
    setIsOpenEdit(false);
  };

  return (
    <Modal
      isVisible={isOpenEdit}
      swipeDirection="down"
      onSwipeComplete={() => setIsOpenEdit(false)}
      onBackdropPress={() => setIsOpenEdit(false)}
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
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            textContentType="telephoneNumber"
            style={styles.tlp}
            placeholder="No Telepon"
          />
        </View>
        <TextInput
          value={address}
          onChangeText={setAddress}
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
