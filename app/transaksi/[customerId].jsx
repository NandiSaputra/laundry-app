import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../../store/billSlice";

const TransactionHistory = () => {
  const { customerId } = useLocalSearchParams();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.bills?.data || []);

  const [customerTransactions, setCustomerTransactions] = useState([]);

  useEffect(() => {
    dispatch(getBills());
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const filteredTransactions = transactions.filter(
        (trans) => trans.customer?.id === customerId
      );

      // Hanya set state jika ada perubahan
      if (
        JSON.stringify(filteredTransactions) !==
        JSON.stringify(customerTransactions)
      ) {
        setCustomerTransactions(filteredTransactions);
      }
    }
  }, [transactions, customerId]);

  return (
    <View className="flex-1 p-4 bg-[#e6e6fa]">
      <Text className="text-xl font-bold text-[#4169e1]">
        Riwayat Transaksi
      </Text>
      {customerTransactions.length > 0 && (
        <Text className="text-[#4169e1] mb-4">
          {customerTransactions[0].customer.name}
        </Text>
      )}

      <FlatList
        data={customerTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-[#4169e1] rounded-xl shadow p-4 mb-3">
            <Text className="text-[#e6e6fa]">
              {item?.billDate
                ? new Date(item.billDate).toLocaleDateString()
                : "Tanggal tidak tersedia"}
            </Text>
            <Text className="text-[#e6e6fa] font-bold text-lg">
              Rp.
              {item?.billDetails?.[0]?.price && item?.billDetails?.[0]?.qty
                ? (
                    item.billDetails[0].price * item.billDetails[0].qty
                  ).toLocaleString()
                : "Harga tidak tersedia"}
            </Text>
            {item?.billDetails?.[0]?.product ? (
              <Text className="text-[#e6e6fa]">
                {item.billDetails[0].product.name} - {item.billDetails[0].qty}
                {item.billDetails[0].product.type}
              </Text>
            ) : (
              <Text className="text-[#e6e6fa]">Produk tidak tersedia</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">
            Belum ada transaksi.
          </Text>
        }
      />
    </View>
  );
};

export default TransactionHistory;
