import { getOrder } from "@/actions";
import { useEffect } from "react";

interface Order {
  id: string;
  tableNumber: string;
  totalPrice: number;
}

interface AdminComponentProps {
  searchingTableNumber: string;
  adminPassword: string;
  setOrder: (value: Order[]) => void;
  orderStore: Order[];
}

const AdminComponent = ({
  searchingTableNumber,
  adminPassword,
  setOrder,
  orderStore,
}: AdminComponentProps) => {
  useEffect(() => {
    (async () => {
      const orders = await getOrder(adminPassword, searchingTableNumber);
      setOrder(
        orders.map((order) => ({
          id: order.id,
          tableNumber: order.tableNumber,
          totalPrice: Number(order.totalPrice),
        }))
      );
    })();
  }, [searchingTableNumber]);
  return (
    <ul>
      {orderStore.map((order) => (
        <li>{String(order.totalPrice)}</li>
      ))}
    </ul>
  );
};

export default AdminComponent;
