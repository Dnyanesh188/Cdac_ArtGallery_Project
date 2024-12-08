import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "admin", // Static for admin
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put("http://localhost:8080/api/admin/profile", profile);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Profile</h1>
      <div className="profile-card">
        <label>
          Name:
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </label>
        <label>
          Email:
          {isEditing ? (
            <input
              type="email"
              className="form-control"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </label>
        <label>
          Role:
          <p>{profile.role}</p>
        </label>
        {isEditing ? (
          <button className="btn btn-success mt-3" onClick={handleUpdateProfile}>
            Save
          </button>
        ) : (
          <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;