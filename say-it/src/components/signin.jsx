import {Form, Button, Modal} from "react-bootstrap";
import Joi from "joi";

import PageTitle from './common/pageTitle';
import FormComponent from './common/form';

import { login } from '../services/userServices';
import apiUrl from "../config.json";



class Signin extends FormComponent{
  
  state = {
    data: {email: "", password: ""},
    errors:{},
    loading: true,
    showModal: false,
  }
  
  schema= {
    email: Joi.string().email({ tlds: { allow: false }}).required().label('Email'),
    password: Joi.string().min(6).max(255).required().label('Password')
  }

  doSubmit = async () => {
    
    const data = { ...this.state.data };
    
    try{

      this.setState({showModal: true})
      
      await login(data)
      
      this.setState({loading: false})

      setTimeout(() => {
        window.location = apiUrl.home;
      },2000);
      
    }catch(error){
      this.setState({showModal: false})
      
      console.log(error);
      const { response: res } = error;

      if( res && res.status === 400){
        
        const { errors } = this.state;
        
        for(let error of res.data) errors[error.path[0]] = error.message;

        this.setState({errors})
      }
    }
    
  }

  render(){
    
    const { errors, showModal, loading } = this.state;

    return(
      <>
          <PageTitle title={"SignIn"} />
          <Form method="POST" onSubmit={this.handleSubmit} autoCapitalize="off" autoComplete='off'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleInputChange} />

              {errors.email && <Form.Text className="text-danger">
                {errors.email}
              </Form.Text>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />

              {errors.password && <Form.Text className="text-danger">
                {errors.password}
              </Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={this.validate()} >
              Submit
            </Button>
          </Form>

          <Modal centered show={showModal}  animation={false}>
                
                { loading && <Modal.Body>Loading ...</Modal.Body>}
                { !loading && <Modal.Body>Your signin successfuly</Modal.Body>}
                
          </Modal>
      </>
    )
  }
}

export default Signin;