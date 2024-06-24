import React from "react";
import { useRouter } from "next/router";
import styles from "./StartOverModal.module.css";

function StartOverModal({ closeModal }: { closeModal: () => void }) {
  const router = useRouter();

  const handleOK = () => {
    router.push("/");
    closeModal();
  };

  return (
    <div className={styles.modaloverlay} id="modal">
      <div className={styles.modalcontent}>
        <div>
          <h4>Start Over?</h4>
          <p>Your recording will not be saved.</p>
        </div>
        <div className={styles.buttContainer}>
          {" "}
          <button onClick={() => closeModal()}>Cancel</button>
          <button onClick={handleOK}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default StartOverModal;
