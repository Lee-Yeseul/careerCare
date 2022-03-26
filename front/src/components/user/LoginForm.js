import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { DispatchContext } from '../../App';
import PwReissue from './PwReissue';

import { IoPersonCircleOutline } from 'react-icons/io5';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post('user/login', {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem('userToken', jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate('/', { replace: true });
    } catch (err) {
      alert('로그인에 실패하였습니다.\n', err);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col lg={3}>
          <div className='text-center'>
            <IoPersonCircleOutline size='3rem' color='rgb(0 0 0 / 50%)' />
          </div>
          <div id='signIn' className='my-2 text-center'>
            Sign in to CareerCare
          </div>
          <div className='mt-4'>
            <Form onSubmit={handleSubmit} id='login1'>
              <div id='loginForm'>
                <Form.Group controlId='loginEmail'>
                  <Form.Label>이메일 주소</Form.Label>
                  <Form.Control
                    type='email'
                    autoComplete='on'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isEmailValid && (
                    <Form.Text className='text-success'>
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId='loginPassword' className='my-3'>
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type='password'
                    autoComplete='on'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isPasswordValid && (
                    <Form.Text className='text-success'>
                      비밀번호는 4글자 이상입니다.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Row} className='my-3 mx-0 px-0 text-center'>
                  <Button
                    variant='primary'
                    type='submit'
                    disabled={!isFormValid}
                  >
                    로그인
                  </Button>
                </Form.Group>
              </div>
              <div className='mt-2 mx-0 px-0 text-center'>
                <Button
                  variant='light'
                  onClick={() => navigate('/register')}
                  style={{ color: 'grey' }}
                >
                  회원가입
                </Button>
                <PwReissue />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
