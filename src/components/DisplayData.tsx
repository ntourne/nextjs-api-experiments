import { ChangeEvent, FC, useState } from "react";
import styles from "@/styles/Home.module.css";

const DisplayData: FC = () => {
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const handleFetchData = () => {
    if (!name) {
      return;
    }

    fetch(`/api/test?name=${name}`)
      .then((data) => data.json())
      .then((data) => {
        if (data && data.createdAt) {
          setCreatedAt(data.createdAt);
        }
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h3>DisplayData</h3>

      <div className={styles.card}>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={name}
        />
        <button onClick={handleFetchData}>Fetch data</button>
      </div>

      {createdAt ? (
        <div className={styles.card}>createdAt: {createdAt}</div>
      ) : null}
    </div>
  );
};

export default DisplayData;
