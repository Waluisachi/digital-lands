import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLable,
  FormInput,
  FormButton,
  Text,
  Message
} from '../parts/SignIn/SignInElements'

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authenticationToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    const config = {
      header: {
        "Content-type": "application/json"
      }
    }

    try {
      const { data } = await axios.post("/api/auth/register", { email, username, password }, config);

      localStorage.setItem("authenticationTokens", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">kcoin</Icon>
          <FormContent>
            <Form onSubmit={registerHandler}>
              <FormH1>Register account</FormH1>
            {error && <Message dagerbg={true}>{error}</Message>}
              <FormLable htmlFor='for'>Email</FormLable>
              <FormInput
                type='email'
                required
                placeholder="Enter E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

            <FormLable htmlFor='for'>Username</FormLable>
              <FormInput
                type='text'
                required
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <FormLable htmlFor='for'>Password</FormLable>
              <FormInput
                type='password'
                required
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <FormLable htmlFor='for'>Password</FormLable>
              <FormInput
                type='password'
                required
                placeholder="Re-enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}/>
              <FormButton type='submit' >Continue</FormButton>
            <Text> <Link to="/login"> Already Have An account?</Link></Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  )
}

export default Register;
