import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props) => {

    // even though we have to use the Lambda credentials to login I made it look like you're logging in with your own

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = event => {
        setUserData({...userData, 
          [event.target.name]: event.target.value
        });
      }

    const login = () => {
        axios.post('http://localhost:5000/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
          .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/dashboard');
            console.log("Success! res: ", res);
          })
          .catch(err => console.log("Error! err: ", err))
          setIsLoading(false);
      }

    return (
        <Form onSubmit={(event) => {
            event.preventDefault();
            setIsLoading(true);
            login();
        }}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" value={userData.username} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter password" value={userData.password} onChange={handleChange}/>
            </Form.Group>
            <Button type="submit"
                variant="primary"
                disabled={isLoading}
                >
                {isLoading ? 'Loading…' : 'Login'}
            </Button>
        </Form>
    );
}
 
export default Login;