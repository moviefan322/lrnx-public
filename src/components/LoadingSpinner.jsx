// components/LoadingSpinner.jsx
import React from "react";
import { SpinnerCircularFixed } from "spinners-react";
import styles from "./LoadingSpinner.module.css";

//replace with custom animation
const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <SpinnerCircularFixed
        data-testid="loading-spinner"
        size={80}
        thickness={100}
        speed={100}
        color="#36ad47"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    </div>
  );
};

export default LoadingSpinner;
