import React, { useState, useEffect } from "react";

export default function CategoryItem({
  register,
  control,
  category,
  index,
  remove,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(category.name);
  const [localIsActive, setLocalIsActive] = useState(category.isActive);

  useEffect(() => {
    setLocalName(category.name);
    setLocalIsActive(category.isActive);
  }, [category]);

  const saveChanges = () => {
    setIsEditing(false);
    // Ваша логика для сохранения изменений
  };

  const cancelChanges = () => {
    setLocalName(category.name); // Сброс к начальному состоянию
    setLocalIsActive(category.isActive); // Сброс к начальному состоянию
    setIsEditing(false);
  };

  return (
    <div>
      <input
        {...register(`categories.${index}.name`)}
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        onFocus={() => setIsEditing(true)}
        placeholder="Enter Category Name"
      />
      <input
        type="checkbox"
        {...register(`categories.${index}.isActive`)}
        checked={localIsActive}
        onChange={(e) => setLocalIsActive(e.target.checked)}
        onFocus={() => setIsEditing(true)}
      />
      {isEditing && (
        <>
          <button onClick={saveChanges}>Save Changes</button>
          <button onClick={cancelChanges}>Cancel</button>
        </>
      )}
    </div>
  );
}
