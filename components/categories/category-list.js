import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import CategoryItem from "./category-item";

export default function CategoryList() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      categories: [
        { name: "Popular", isActive: true },
        { name: "New", isActive: true },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "categories",
  });

  const onSubmit = (data) => {
    // Здесь логика для отправки данных формы
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        onClick={() => append({ name: "", isActive: false })}
      >
        + Create a Category
      </button>
      {fields.map((field, index) => (
        <CategoryItem
          key={field.id}
          register={register} // функция для регистрации input
          control={control} // объект управления react-hook-form
          category={field}
          index={index}
        />
      ))}
      <section>
        <button type="submit">Save Changes</button>
        <button type="button">Cancel</button>
      </section>
    </form>
  );
}
