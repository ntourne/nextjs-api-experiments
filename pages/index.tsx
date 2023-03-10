import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import DisplayData from "@/src/components/DisplayData";
import { GetServerSideProps } from "next/types";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  createdAt: string;
  name: string;
};
export default function Home({ createdAt, name }: Props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          The test is being done with these values:
          <ul>
            <li>name: {`"${name}"`}</li>
            <li>last time updated: {`"${createdAt}"`}</li>
          </ul>
        </div>
        <div className={styles.description}>
          <DisplayData />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=900, stale-while-revalidate=21600"
  );

  const name = "home";

  const createdAt = await fetch(
    `https://nextjs-api-experiments.vercel.app/api/test?name=${name}`
  )
    .then((data) => data.json())
    .then((data) => {
      return data.createdAt;
    });

  return {
    props: {
      createdAt,
      name,
    },
  };
};
