import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch user data based on the user ID when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-user/${id}`);
        const userData = response.data;

        // Populate the form with user data
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          street: userData.street,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          email: userData.email,
          phone: userData.phone,
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.put(`http://localhost:3001/update-user/${id}`, formData);
      if (response.status === 500) {
        alert("Any server problem");
        navigate('/users');
      } else if (response.status === 200) {
        alert("User updated successfully");
        navigate('/users');
      }
    } catch (error) {
      alert("Error updating user. Please check your input.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Responsive Submit Button */}
        <div className="row mb-3">
          <div className="col-md-6 offset-md-6">
            <button type="submit" className="btn btn-primary float-md-end">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
