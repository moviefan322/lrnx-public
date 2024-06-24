import React from "react";
import styles from './Button.module.css';

interface ButtonProps {
    id: string
    label?: string;
    faIcon: string;
    onClick: () => void; // Define the onClick handler type here
  }

function Button({id, label, faIcon, onClick}: ButtonProps) {
  return (
    <button id={id} className={styles.button} onClick={onClick}>
      <i className={`fas ${faIcon} ${styles.icon}`}></i>
      {label}
    </button>
  );
}

export default Button;
