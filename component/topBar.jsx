import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Menu } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { logoutUser } from "../store/authSlice";

const AdminTopBar = ({ title }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="ellipsis-vertical" size={24} color="#e6e6fa" />
          </TouchableOpacity>
        }
      >
        <Menu.Item
          onPress={handleLogout}
          title="Logout"
          leadingIcon="logout"
          titleStyle={{ color: "#4169e1" }}
        />
      </Menu>
    </View>
  );
};

export default AdminTopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#4169e1",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
