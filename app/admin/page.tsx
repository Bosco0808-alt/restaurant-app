"use client";
import { checkAdminPassword } from "@/actions";
import { useState } from "react";

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
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
      {auth ? <h1>test message</h1> : ""}
    </>
  );
};

export default Admin;
