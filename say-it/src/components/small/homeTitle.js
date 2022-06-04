import {Link} from 'react-router-dom';

function HomeTitle(){
    
    return(

        <div className='HomeTitle'>
            <h1 className='display-3'>Welcome to Say it</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda veritatis fugit optio ea nulla eos
            </p>
            <div>
                <Link className="btn btn-primary" to="/signin">Signin</Link>
                <Link className="btn btn-primary ms-2" to="/signup">Signup</Link>
            </div>
                
        </div>
    )

}

export default HomeTitle;