import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Pagination, Form } from 'react-bootstrap';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    domain: '',
    gender: '',
    availability: '',
  });

  const usersPerPage = 20;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const applyFilters = () => {
    let filteredData = [...filteredUsers];

    // Apply domain filter
    if (selectedFilters.domain) {
      filteredData = filteredData.filter((user) => user.domain === selectedFilters.domain);
    }

    // Apply gender filter
    if (selectedFilters.gender) {
      filteredData = filteredData.filter((user) => user.gender === selectedFilters.gender);
    }

    // Apply availability filter
    if (selectedFilters.availability !== '') {
      filteredData = filteredData.filter((user) => user.available === (selectedFilters.availability === 'true'));
    }
    return filteredData;
  };

  const currentUsers = applyFilters().slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset the current page when the search query changes
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    setCurrentPage(1); // Reset the current page when filters change
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data-from-database');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/delete-user/${userId}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  // Logic for displaying users

  

  return (
    <div className="container mt-5">
    {/* Search input */}
    <Form.Group controlId="search">
      <Form.Control
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </Form.Group>

    {/* Domain filter */}
    <Form.Group controlId="domain">
      <Form.Label>Domain:</Form.Label>
      <Form.Control
        as="select"
        value={selectedFilters.domain}
        onChange={(e) => handleFilterChange('domain', e.target.value)}
      >
        <option value="">All</option>
        <option value="Domain1">Domain1</option>
        <option value="Domain2">Domain2</option>
        {/* Add more options based on your actual domain values */}
      </Form.Control>
    </Form.Group>

    {/* Gender filter */}
    <Form.Group controlId="gender">
      <Form.Label>Gender:</Form.Label>
      <Form.Control
        as="select"
        value={selectedFilters.gender}
        onChange={(e) => handleFilterChange('gender', e.target.value)}
      >
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        {/* Add more options based on your actual gender values */}
      </Form.Control>
    </Form.Group>

    {/* Availability filter */}
    <Form.Group controlId="availability">
      <Form.Label>Availability:</Form.Label>
      <Form.Control
        as="select"
        value={selectedFilters.availability}
        onChange={(e) => handleFilterChange('availability', e.target.value)}
      >
        <option value="">All</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
        {/* Add more options based on your actual availability values */}
      </Form.Control>
    </Form.Group>


      <div className="row">
      {currentUsers.map((user) => (
          <div key={user._id} className="col-md-3 mb-4">
            <Card>
            <Card.Img variant="top" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <Card.Body>
                <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                <Card.Text>  
                 EMAil:      {user.email}<br/>
                 GENDER: {user.gender}<br/>
                 DOMAIN: {user.domain}<br/>
                 AVAILABLE : {user.available.toString()}
                </Card.Text>
                

                <Link to={`/edit-user/${user._id}`} className="btn btn-warning btn-sm">
                  <i className="bi bi-pencil"></i> Edit
                </Link>
                <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm ml-2">
                  <i className="bi bi-x"></i> Delete
                </button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-3">
      <Pagination>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
 
    </div>
  );
};

export default UserTable;
