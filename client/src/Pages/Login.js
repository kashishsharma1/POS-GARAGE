import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { Col, Row } from "antd";
import '../Resources/Authentication.css'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'





function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const onFinish=(values)=>{
      dispatch({type : 'showLoading'})
      axios.post('/api/users/login', values).then((res)=>{
        dispatch({type : 'hideLoading'});
        message.success('Login Successul.')
        localStorage.setItem('pos-user', JSON.stringify(res.data))
        navigate('/home')
      }).catch(() =>{
        dispatch({type : 'hideLoading'})
        message.error('Something went wrong.')
      })
    }

    useEffect(()=>{
      if(localStorage.getItem('pos-user'))
      navigate('/home')
    })

  return (
    <div className='authentication'>
     <Row >
        <Col lg={8} xs={22} >
        <h1><b>GARAGE</b></h1>
        <Form layout="vertical" onFinish={onFinish}>
            <h3>Login</h3>
            
            <Form.Item name='userId' label='User ID'>
              <Input/>
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password'/>
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
                <Link to='/register'> Not Yet Registered? Click here to Register </Link>
              <Button htmlType='submit' type='primary'>
                Login
              </Button>

            </div>

          </Form>
        </Col>
     </Row>
    </div>
  )
}

export default Login;
