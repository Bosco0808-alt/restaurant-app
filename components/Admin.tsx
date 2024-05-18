import { getOrder } from "@/actions";
import { useEffect } from "react";

interface Amount {
  id: string;
  amount: number;
  orderId: string;
  productId: string;
}

interface Order {
  id: string;
  tableNumber: string;
  totalPrice: number;
  products: {
    id: string;
    name: string;
    price: number;
    typesId: string | null;
    orderId: string | null;
  }[];
  amounts: Amount[];
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
      const newOrders = orders.map((order) => ({
        id: order.id,
        tableNumber: order.tableNumber,
        totalPrice: Number(order.totalPrice),
        amounts: order.amounts,
        products: order.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          typesId: product.typesId,
          orderId: product.orderId,
        })),
      }));
      setOrder(newOrders);
    })();
  }, [searchingTableNumber]);
  const getProductById = (productId: string) => {
    const foundProduct = orderStore
      .flatMap((order) => order.products)
      .find((product) => product.id === productId);
    return foundProduct ? foundProduct.name : "";
  };

  const getTotalPrice = (orders: Order[]) => {
    let totalPrice: number = 0;
    for (const order of orders) {
      totalPrice += order.totalPrice;
    }
    return totalPrice;
  };
  return (
    <ul>
      <li>total price: {getTotalPrice(orderStore)}</li>
      {
        orderStore.map((order) => (
          <li key={order.id}>
            order:{" "}
            {order.amounts.map(
              (amount) =>
                `${amount.amount}x ${getProductById(amount.productId)}`
            )}
          </li>
        ))[0]
      }
    </ul>
  );
};

export default AdminComponent;
