"use client";

import Link from "next/link";

const Error = () => {
  return (
    <>
      <h1>Oops, an error occured!</h1>
      <Link href={"/"} className="btn btn-primary">
        Back to home page
      </Link>
    </>
  );
};

export default Error;
