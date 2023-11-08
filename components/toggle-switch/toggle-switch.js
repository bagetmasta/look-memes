import styles from "./toggle-switch.module.css";

const ToggleSwitch = ({
  register,
  name,
  defaultChecked,
  updateValue,
  setIsEditing,
  currentInputIndex,
  index,
}) => (
  <label className={styles.switch}>
    <input
      className={styles.input}
      defaultChecked={defaultChecked}
      onBlur={(e) => {
        // Обновляем состояние при потере фокуса
        updateValue(`categories.${index}.isActive`, e.target.checked);
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

export default ToggleSwitch;
