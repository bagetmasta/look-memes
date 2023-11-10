import React, { useState } from "react";
import Notiflix from "notiflix";
import styles from "./category-list.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import CategoryItem from "./category-item";
import Modal from "../modal/modal";

export default function CategoryList({ searchTerm }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const { register, control, handleSubmit, setValue, getValues, reset } =
    useForm({
      defaultValues: {
        categories: [
          { specialKey: 0, name: "Popular", isActive: true },
          { specialKey: 1, name: "New", isActive: true },
          { specialKey: 2, name: "Other", isActive: true },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const handleDeleteClick = (index) => {
    setDeletingIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    cancelCategoryUpdate(currentInputIndex);
    if (deletingIndex !== null) {
      remove(deletingIndex);
      closeModal();
    }
  };

  const onSubmit = (data) => {
    const isAnyCategoryEmpty = data.categories.some(
      (category) => !category.name.trim()
    );
    if (isAnyCategoryEmpty) {
      Notiflix.Notify.warning(
        "You cannot create a category with an empty name."
      );
    } else {
      handleSaveChanges(data);
    }
  };

  const cancelCategoryUpdate = (index) => {
    const currentValues = getValues("categories");
    if (!currentValues[index].name.trim()) {
      remove(index);
    } else {
      currentValues[index] = fields[index];
      reset({ categories: currentValues });
    }
    setIsEditing(false);
  };

  const handleSaveChanges = (data) => {
    const updatedCategories = getValues("categories");
    reset({ categories: updatedCategories });
    setIsEditing(false);
  };

  const filteredFields = searchTerm
    ? fields.filter((field) => field.name.toLowerCase().includes(searchTerm))
    : fields;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <button
          type="button"
          className={styles.createButton}
          onClick={() => append({ name: "", isActive: false })}
        >
          + Create a Category
        </button>

        <div className={styles.wrapper}>
          {filteredFields.length > 0 ? (
            filteredFields.map((field, index) => (
              <CategoryItem
                styles={styles}
                key={field.id}
                register={register}
                category={field}
                specialKey={field.specialKey}
                index={index}
                currentInputIndex={setCurrentInputIndex}
                setIsEditing={setIsEditing}
                handleDeleteClick={handleDeleteClick}
              />
            ))
          ) : (
            <p className={styles.noCategories}>No categories</p>
          )}
        </div>

        {isEditing && (
          <section className={styles.fixedSection}>
            <div className={styles.buttonWrapper}>
              <button className={styles.saveChanges} type="submit">
                Save Changes
              </button>
              <button
                className={styles.cancel}
                type="button"
                onClick={() => {
                  cancelCategoryUpdate(currentInputIndex);
                }}
              >
                Cancel
              </button>
            </div>
          </section>
        )}
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}
