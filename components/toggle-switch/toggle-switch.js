import React, { useEffect } from "react";
import styles from "./toggle-switch.module.css";

export default function ToggleSwitch({
  register,
  name,
  defaultChecked,
  updateValue,
  setIsEditing,
  currentInputIndex,
  index,
  setIsActive,
}) {
  useEffect(() => {
    setIsActive(defaultChecked);
  }, [defaultChecked, setIsActive]);

  return (
    <label className={styles.switch}>
      <input
        className={styles.input}
        defaultChecked={defaultChecked}
        onBlur={(e) => {
          updateValue(`categories.${index}.isActive`, e.target.checked);
          setIsActive(e.target.checked);
        }}
        onFocus={() => {
          setIsEditing(true);
          currentInputIndex(index);
        }}
        type="checkbox"
        {...register(name)}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}
