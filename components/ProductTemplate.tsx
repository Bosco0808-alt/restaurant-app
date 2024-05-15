"use client";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { orderAtom } from "@/atomconfig";
import { Decimal } from "@prisma/client/runtime/library";

interface ProductProps {
  prodId: string;
  prodName: string;
  prodPrice: number;
}

const Product = ({ prodId, prodName, prodPrice }: ProductProps) => {
  const [order, setOrder] = useAtom(orderAtom);

  const plusAmount = (prodId: string) => {
    setOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder };
      updatedOrder[prodId] = (updatedOrder[prodId] || 0) + 1;
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      return updatedOrder;
    });
  };

  const minusAmount = (prodId: string) => {
    setOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder };
      updatedOrder[prodId] = (updatedOrder[prodId] || 0) - 1;
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      return updatedOrder;
    });
  };

  const resetAmount = (prodId: string) => {
    setOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder };
      updatedOrder[prodId] = 0;
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      return updatedOrder;
    });
  };

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      try {
        setOrder(JSON.parse(storedOrder));
      } catch (error) {
        console.error("Error parsing stored order:", error);
      }
    }
  }, []);
  useEffect(() => {
    if (order[prodId] < 0) {
      resetAmount(prodId);
    }
  }, [order]);

  return (
    <>
      <div>
        {prodName}
        {` $${prodPrice}`}
        <button
          className="btn btn-primary m-2"
          onClick={() => plusAmount(prodId)}
        >
          +
        </button>
        <button
          className="btn btn-secondary m-2"
          onClick={() => minusAmount(prodId)}
        >
          -
        </button>{" "}
        <span>Amount: {order[prodId]}</span>
      </div>
    </>
  );
};

export default Product;
