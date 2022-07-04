import {Form, Button, Modal} from "react-bootstrap";
import Joi from "joi";
import http from '../services/httpService';
import apiUrl from '../config.json';

import PageTitle from './common/pageTitle';
import FormComponent from './common/form';
import { Navigate } from "react-router-dom"



class Signup extends FormComponent{

  state = {
    data: {email: "", password: "", name:""},
    errors: {},
    redirect: false,
    loading: true,
    showModal: false,
  }

  schema = {
    email: Joi.string().email({ tlds: { allow: false }}).required().label('Email'),
    password: Joi.string().min(6).max(255).required().label('Password'),
    name: Joi.string().min(3).max(255).required().label('Name')
  };

  

  doSubmit = async () => {
    const data = { ...this.state.data };
    const { srverUrl, signup } = apiUrl;
    

    try{

      this.setState({showModal: true})
      
      await http.post(srverUrl + signup, data);
      
      this.setState({loading: false})

      setTimeout(() => {
        this.setState({redirect: true})
      },2000);
      
    }catch(error){

      this.setState({showModal: false})
      
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
            { this.state.redirect && <Navigate to='/signin' replace={true}/> }

              <PageTitle title={"SignUp"} />
              <Form method="POST" onSubmit={this.handleSubmit} autoCapitalize="off" autoComplete='off'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleInputChange} />

                  {errors.email && <Form.Text className="text-danger">
                    {errors.email}
                    <br />
                  </Form.Text>}
                  <span className="info">
                    Email don't have to be real
                  </span>

                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>Name or nickname</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" name="name" onChange={this.handleInputChange} />

                  {errors.name && <Form.Text className="text-danger">
                    {errors.name}
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
                { !loading && <Modal.Body>Your signup was successfully</Modal.Body>}
                
              </Modal>
          </>
      )
    }
  }
  
  export default Signup;
