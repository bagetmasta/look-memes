import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.keyCode === 27) onClose();
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button type="button">
          <Image
            className={styles.closeButton}
            src={"/images/close.svg"}
            width={10}
            height={10}
            alt="close"
            onClick={onClose}
          />
        </button>
        <h2 className={styles.title}>Delete the Category?</h2>
        <p className={styles.text}>
          All templates in the category will be moved to the category "Other".
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Delete
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
