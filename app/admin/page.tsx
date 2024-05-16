"use client";
import { checkAdminPassword } from "@/actions";
import { useState } from "react";
import AdminComponent from "@/components/Admin";

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
const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTableNumber, setSearchTableNumber] = useState("");
  const [searchingTableNumber, setSearchingTableNumber] = useState("");
  const [orderStore, setOrderStore] = useState<Order[]>([]);
  const [amountStore, setAmountStore] = useState();
  const [productStore, setProductStore] = useState();
  const setOrder = (value: Order[]) => {
    setOrderStore(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await checkAdminPassword(password);
    setAuth(result);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="form-control m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary m-2">
          Enter
        </button>
      </form>
      {auth ? (
        <>
          <div className="form-group">
            <label className="m-2">Enter table number:</label>
            <input
              className="form-control m-2"
              value={searchTableNumber}
              onChange={(e) => setSearchTableNumber(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSearchingTableNumber(searchTableNumber)}
            className="btn btn-primary m-2"
          >
            Search
          </button>
          {searchingTableNumber ? (
            <AdminComponent
              searchingTableNumber={searchingTableNumber}
              adminPassword={password}
              setOrder={setOrder}
              orderStore={orderStore}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Admin;
