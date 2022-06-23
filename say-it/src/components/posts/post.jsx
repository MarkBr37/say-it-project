import {Card, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Post({data, currentUser, handleDelete}) {


  return(
      <Card className='mt-4'>
          <Card.Header>
              
              <span className='cardTitle'>{data.user_name}</span>
              
              { currentUser === data.user_id &&
              <Dropdown className='float-end'>
                <Dropdown.Toggle className="round-btn" id="dropdown-basic">
                  
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link className='dropdown-item' to={"/editpost/"+data._id} >Edit</Link>
                  <Dropdown.Item onClick={() => handleDelete(data._id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>}

          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                {data.text}
                {' '}
              </p>
              
            </blockquote>
          </Card.Body>
      </Card>
  )
    
}

export default Post;