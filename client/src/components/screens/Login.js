import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


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

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authenticationToken")) {
      // history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config  = {
      header: {
        "Content-type": "application/json"
      }
    }

    try {
      const { data } = await axios.post("/api/auth/login", { email, password }, config);
      localStorage.setItem("authenticationToken", data.token);
      history.push("/");

    } catch (error) {
      setError(error.response.data.error);

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
            <Form onSubmit={loginHandler}>
              <FormH1>Sign in to your account</FormH1>
            {error && <Message dagerbg={true}>{error}</Message>}
              <FormLable htmlFor='for'>Email</FormLable>
              <FormInput
                 type='email'
                 required
                 placeholder="Enter E-mail"
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
               />

              <FormLable htmlFor='for'>Password</FormLable>
              <FormInput
                type='password'
                required
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormButton type='submit' >Continue</FormButton>
              <Text> <Link to="/forgotpassword">Forgot password</Link> </Text>
              <Text> <Link to="/register"> Don't have an account?</Link> </Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  )
}

export default Login
