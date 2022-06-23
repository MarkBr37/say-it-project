import FormComponent from '../common/form';
import {Form, Button, Modal} from "react-bootstrap";
import Joi from "joi";
import {Link } from 'react-router-dom';
import { Navigate } from "react-router-dom"
import PageTitle from '../common/pageTitle';


import { getPost, editPost } from "../../services/postServices";



class EditPost extends FormComponent{
  
  state = {
    data: { post: '' },
    errors:{},
    redirect: false,
    loading: true,
    showModal: false,
  }
  
  schema= {
    post: Joi.string().max(1024).required().label('Post')
  };

  doSubmit = async () => {
    const data = { ...this.state.data }
    
    try{

      this.setState({showModal: true})
      
      const res = await editPost(this.props.parame.id, data);

      console.log(res);
      
      this.setState({loading: false})

      setTimeout(() => {
        this.setState({redirect: true})
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

  async componentDidMount(){
    
    const data = await getPost(this.props.parame.id);
    const post = {post: data.text}
    this.setState({data: post});
  }

  render(){
    
    const { errors, showModal, loading } = this.state;

    return(
      <>
        { this.state.redirect && <Navigate to='/' replace={true}/> }

          <PageTitle title={"Create Post"} />
          <Form method="POST" onSubmit={this.handleSubmit} autoCapitalize="off" autoComplete='off'>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Change what you say</Form.Label>
              <Form.Control as="textarea" rows={3} name='post' value={this.state.data.post} onChange={this.handleInputChange} />

              {errors.post && <Form.Text className="text-danger">
                {errors.post}
              </Form.Text>}
              
            </Form.Group>

            <Button variant="primary" type="submit" disabled={this.validate()} >
              Create post
            </Button>{' '}
            <Link className="btn btn-secondary ms-2 btn-sm" to="/">Cancel</Link>                    
          </Form>

          <Modal centered show={showModal}  animation={false}>
                
                { loading && <Modal.Body>Loading ...</Modal.Body>}
                { !loading && <Modal.Body>Edit post was successfully</Modal.Body>}
                
          </Modal>
      </>
    )
  }
}

export default EditPost;