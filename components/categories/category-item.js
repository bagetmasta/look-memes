import styles from "./category-item.module.css";
import ToggleSwitch from "../toggle-switch/toggle-switch";
import Image from "next/image";

export default function CategoryItem({
  register,
  category,
  index,
  currentInputIndex,
  setIsEditing,
  setValue,
  handleDeleteClick,
}) {
  // Функция для обновления значения
  const updateValue = (name, value) => {
    setValue(name, value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.category}
        {...register(`categories.${index}.name`)}
        defaultValue={category.name}
        onBlur={(e) => {
          updateValue(`categories.${index}.name`, e.target.value);
        }}
        onFocus={() => {
          setIsEditing(true);
          currentInputIndex(index);
        }}
        placeholder="Enter Category Name"
      />
      <ToggleSwitch
        register={register}
        name={`categories.${index}.isActive`}
        defaultChecked={category.isActive}
        updateValue={updateValue}
        // onBlur={(e) => {
        //   // Обновляем состояние при потере фокуса
        //   updateValue(`categories.${index}.isActive`, e.target.checked);
        // }}
        setIsEditing={setIsEditing}
        currentInputIndex={currentInputIndex}
        index={index}
        // onFocus={() => {
        //   setIsEditing(true);
        //   currentInputIndex(index);
        // }}
      />
      {/* <ToggleSwitch register={register} name={`categories.${index}.isActive`} /> */}
      <button type="button" onClick={() => handleDeleteClick(index)}>
        <Image
          className={styles.deleteButton}
          src={"/images/delete.svg"}
          width={30}
          height={30}
          alt="delete"
        />
      </button>
      <button type="button">
        <Image
          className={styles.dragDropButton}
          src={"/images/drag-drop.svg"}
          width={8}
          height={13}
          alt="drag drop"
        />
      </button>
    </div>
  );
}

{
  /* <input
type="checkbox"
{...register(`categories.${index}.isActive`)}
defaultChecked={category.isActive}
onBlur={(e) => {
  // Обновляем состояние при потере фокуса
  updateValue(`categories.${index}.isActive`, e.target.checked);
}}
onFocus={() => {
  setIsEditing(true);
  currentInputIndex(index);
}}
/> */
}
