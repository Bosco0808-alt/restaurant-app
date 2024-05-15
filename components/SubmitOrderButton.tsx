"use client";
import { useTransition } from "react";
import { useAtom } from "jotai";
import { tableNumberAtom } from "@/atomconfig";
import { orderAtom } from "@/atomconfig";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface SubmitOrderButtonProps {
  addOrder: (products: string, tableNumber: string) => Promise<void>;
}

const SubmitOrderButton = ({ addOrder }: SubmitOrderButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [tableNumber, setTableNumber] = useAtom(tableNumberAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const router = useRouter();
  const [] = [];
  const buttonOnClick = () => {
    if (isNaN(Number(tableNumber)) || Number(tableNumber) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Enter a valid table number!",
        timer: 1500,
      });
      return;
    }
    if (!localStorage.getItem("order")) {
      Swal.fire({
        icon: "error",
        title: "Order first!",
        timer: 1500,
      });
      return;
    }
    startTransition(async () => {
      await addOrder(localStorage.getItem("order") || "", tableNumber);
    });
    Swal.fire({
      icon: "success",
      title: "Sucessfully added order!",
      timer: 1500,
    });
    setOrder({});
    setTableNumber("");
    localStorage.clear();
    router.push("/");
  };
  return (
    <>
      <div className="form-group">
        <label className="m-2">Table Number:</label>
        <input
          className="form-control m-2"
          type="number"
          value={tableNumber === "0" ? "" : tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />
      </div>
      <button className="btn btn-primary m-2" onClick={buttonOnClick}>
        Submit Order
      </button>
    </>
  );
};

export default SubmitOrderButton;
