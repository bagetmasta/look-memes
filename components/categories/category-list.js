import React, { useState } from "react";
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
          { name: "Popular", isActive: true },
          { name: "New", isActive: true },
          { name: "Other", isActive: true },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const handleDeleteClick = (index) => {
    setDeletingIndex(index);
    setIsModalOpen(true); // Показать модальное окно
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    cancelCategoryUpdate(currentInputIndex);
    if (deletingIndex !== null) {
      // Здесь логика для перемещения шаблонов в категорию "Other" перед удалением
      remove(deletingIndex);
      closeModal();
    }
  };

  const onSubmit = (data) => {
    console.log("сработал onSubmit");
    console.log("Submitted data:", data);
    handleSaveChanges(data); // Вызов функции для сохранения изменений
  };

  // Функция для отмены изменений конкретного элемента списка
  const cancelCategoryUpdate = (index) => {
    const currentValues = getValues("categories");
    currentValues[index] = fields[index];
    reset({ categories: currentValues });
    setIsEditing(false);
  };

  const handleSaveChanges = (data) => {
    console.log("handleSaveChanges");
    const updatedCategories = getValues("categories");
    // Здесь вы можете отправить updatedCategories куда нужно, например, на сервер
    // или обновить состояние в контексте/глобальном стейте, если это необходимо
    console.log(updatedCategories);
    reset({ categories: updatedCategories });
    setIsEditing(false);
  };

  console.log(`Search Term: ${searchTerm}`); // Добавьте этот console.log перед использованием `filteredFields`

  const filteredFields = searchTerm
    ? fields.filter((field) => field.name.toLowerCase().includes(searchTerm))
    : fields;

  console.log(filteredFields);

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
          {filteredFields.map((field, index) => (
            <CategoryItem
              styles={styles}
              key={field.id}
              register={register}
              category={field}
              index={index}
              currentInputIndex={setCurrentInputIndex}
              setIsEditing={setIsEditing}
              setValue={setValue}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
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
