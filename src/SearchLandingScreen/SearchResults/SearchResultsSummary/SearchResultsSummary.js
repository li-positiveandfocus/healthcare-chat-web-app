import React from "react";
import styles from "./index.module.css";

export function SearchResultsSummary(props) {
  return (
    <div className={styles.container}>
      <div className={styles["search-summary"]}>
        <h1 className="subtitle">
          <strong>{props.term}</strong> {props.location}
        </h1>
      </div>
    </div>
  );
}
