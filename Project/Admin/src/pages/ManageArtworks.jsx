import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = () => {
    axios
      .get("http://localhost:8080/api/artworks")
      .then((response) => {
        setArtworks(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching artworks:", error);
        setErrors({ fetch: "Failed to load artworks. Try again later." });
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/artworks/${id}`)
      .then(() => {
        setArtworks(artworks.filter((artwork) => artwork.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting artwork:", error);
        alert("Failed to delete artwork. Try again later.");
      });
  };

  const handleEdit = (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle || newTitle.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }

    console.log(`Editing artwork with id: ${id}, newTitle: ${newTitle}`);

    axios
      .put(`http://localhost:8080/api/artworks/${id}`, { title: newTitle })
      .then((response) => {
        console.log("Edit response:", response.data);
        // Refreshing the data directly from the API to ensure consistency
        fetchArtworks();
      })
      .catch((error) => {
        console.error("Error updating artwork:", error.response || error);
        alert("Failed to update artwork. Please check the server logs or try again later.");
      });
  };

  return (
    <div>
      <h1>Manage Artworks</h1>
      {errors.fetch && <p className="error">{errors.fetch}</p>}
      {Array.isArray(artworks) && artworks.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id}>
                <td>{artwork.title}</td>
                <td>{artwork.artist}</td>
                <td>${artwork.price}</td>
                <td>
                  <button onClick={() => handleEdit(artwork.id)}>Edit</button>
                  <button onClick={() => handleDelete(artwork.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No artworks available.</p>
      )}
    </div>
  );
};

export default ManageArtworks;