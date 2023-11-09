import React, { useState } from "react";
import styles from "./category-item.module.css";
import ToggleSwitch from "../toggle-switch/toggle-switch";
import Image from "next/image";

export default function CategoryItem({
  register,
  category,
  index,
  currentInputIndex,
  setIsEditing,
  handleDeleteClick,
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        className={
          isActive
            ? `${styles.category}`
            : `${styles.category} ${styles.categoryInactive}`
        }
        {...register(`categories.${index}.name`)}
        defaultValue={category.name}
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
        setIsActive={setIsActive}
        setIsEditing={setIsEditing}
        currentInputIndex={currentInputIndex}
        index={index}
      />
      {category.name !== "Other" && (
        <>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => handleDeleteClick(index)}
          >
            <Image
              src={"/images/delete.svg"}
              width={30}
              height={30}
              alt="delete"
            />
          </button>
          <button type="button" className={styles.dragDropButton}>
            <Image
              src={"/images/drag-drop.svg"}
              width={8}
              height={13}
              alt="drag drop"
            />
          </button>
        </>
      )}
    </div>
  );
}
