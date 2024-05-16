import { getOrder } from "@/actions";
import { useEffect, Fragment } from "react";

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
  amounts: {
    id: string;
    amount: number;
    orderId: string;
    productId: string;
  }[];
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

  return (
    <ul>
      {orderStore.map((order) => (
        <Fragment key={order.id}>
          <li>total price: {String(order.totalPrice)}</li>
          <li>
            order:{" "}
            {order.amounts.map(
              (amount) =>
                `${amount.amount}x ${getProductById(amount.productId)}`
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

export default AdminComponent;
