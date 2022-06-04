import {Form, Button} from "react-bootstrap";
import PageTitle from './common/pageTitle';

function Signin(){

    return(
        <>
            <PageTitle title={"Signin"} />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />

                <Form.Text className="text-muted">
                  
                </Form.Text>

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
        </>
    )
}

export default Signin;