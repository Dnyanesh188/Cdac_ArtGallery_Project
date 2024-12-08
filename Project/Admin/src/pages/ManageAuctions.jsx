import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [newAuction, setNewAuction] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auctions");
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  const handleAddAuction = async () => {
    try {
      await axios.post("http://localhost:8080/api/auctions", newAuction);
      fetchAuctions();
      setNewAuction({ title: "", startDate: "", endDate: "" });
    } catch (error) {
      console.error("Error adding auction:", error);
    }
  };

  const handleDeleteAuction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/auctions/${id}`);
      fetchAuctions();
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return (
    <div className="container">
      <h1>Manage Auctions</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Title"
          className="form-control"
          value={newAuction.title}
          onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })}
        />
        <input
          type="date"
          className="form-control mt-2"
          value={newAuction.startDate}
          onChange={(e) => setNewAuction({ ...newAuction, startDate: e.target.value })}
        />
        <input
          type="date"
          className="form-control mt-2"
          value={newAuction.endDate}
          onChange={(e) => setNewAuction({ ...newAuction, endDate: e.target.value })}
        />
        <button className="btn btn-primary mt-3" onClick={handleAddAuction}>
          Add Auction
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction) => (
            <tr key={auction.id}>
              <td>{auction.title}</td>
              <td>{auction.startDate}</td>
              <td>{auction.endDate}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteAuction(auction.id)}
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

export default ManageAuctions;