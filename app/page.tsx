"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { tableNumberAtom } from "@/atomconfig";
import { useAtom } from "jotai";

export default function Home() {
  return (
    <div className={`${styles.center} ${styles.stayInOneLine}`}>
      <Image
        src="/vercel.svg"
        width={300}
        height={100}
        alt="restaurant logo"
        priority
      ></Image>
      <h1 className="m-2">Welcome Customer!</h1>
      <Link
        className={`btn btn-primary m-2 ${styles.horizontalCenterElement} ${styles.stayInOneLine} mt-4`}
        href={"/order"}
      >
        Start Ordering
      </Link>
    </div>
  );
}
