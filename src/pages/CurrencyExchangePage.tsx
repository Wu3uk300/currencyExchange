import React from "react";
import styles from "../styles/CurrencyExchangePage.module.css";
import CurrencyExchange from "../components/CurrencyExchange";

const CurrencyExchangePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.header}>Currency Exchange</h1>
        <CurrencyExchange />
      </div>
    </div>
  );
};

export default CurrencyExchangePage;
