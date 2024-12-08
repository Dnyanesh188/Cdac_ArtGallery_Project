import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("image", newCategory.image);

    try {
      await axios.post("http://localhost:8080/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCategories();
      setNewCategory({ name: "", image: null });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container">
      <h1>Manage Categories</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Category Name"
          className="form-control"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <input
          type="file"
          className="form-control mt-2"
          onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
        />
        <button className="btn btn-primary mt-3" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                {category.image && (
                  <img
                    src={`http://localhost:8080/images/${category.image}`}
                    alt={category.name}
                    width="100"
                    height="100"
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;