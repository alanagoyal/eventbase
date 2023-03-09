import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto max-w-6xl pt-20 pb-5">
      <Head>
        <title>You&#x27;re invited 🎉</title>
      </Head>
      <div>
        <h1 className="text-5xl text-bold px-10 pt-20 text-white">
          {" "}
          Welcome 👋🏼
        </h1>
      </div>
      <div>
        <h2 className="text-xl px-2 pt-6 text-white">
          Please navigate to your event landing page
        </h2>
      </div>
      <p className="text-m py-1 text-white">
        {" "}
        If you don&apos;t know it, please contact the host
      </p>
    </div>
  );
}
