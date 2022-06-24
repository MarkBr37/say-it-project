import {Link} from 'react-router-dom';

function HomeTitle(){
    
    return(

        <div className='HomeTitle'>
            <h1 className='display-3'>Welcome to Say it</h1>
            
            <p>
                A simple post maker just signup and create some posts
            </p>
           
            <div>
                <Link className="btn btn-primary me-2" to="/signin">SignIn</Link>
                <Link className="btn btn-primary ms-2" to="/signup">SignUp</Link>
            </div>
                
        </div>
    )

}

export default HomeTitle;