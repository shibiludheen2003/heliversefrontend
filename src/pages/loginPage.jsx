import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      
       
         

        
         <Link path={'/users'} variant="primary" type="submit" className="w-100"> Login</Link>
    
         
        
     
    </Container>
  );
};

export default LoginPage;
