import { Component } from "react";
import PageTitle from '../common/pageTitle';
import Post from '../posts/post';
import {Link} from 'react-router-dom';

import {getMyPosts, deletePost} from '../../services/postServices';

class MyPosts extends Component{

    state = {
        posts: [],
        loading: true
    }
    
    async componentDidMount(){
            
        const posts = await getMyPosts();
        this.setState({posts, loading: false});     
    }

    handleDelete = async (post_id) => {
        const approval = window.confirm('Are you sure?')

        if(approval){
            await deletePost(post_id)

            let { posts } = this.state;
            posts = posts.filter( post => post._id !== post_id);
            this.setState({posts});
        } 
    }
    
    render(){
        
        const { user } = this.props;
        const { posts, loading } = this.state;
        
        return(
            <>
                
                <PageTitle title={'My Posts'} />
                <Link className="btn btn-primary mt-2" to="/createpost">Create post</Link> 
                                   
                {!loading &&
                <>
                    { posts.length > 0 && posts.map((post)=> {
                        return <Post 
                        key={post._id} 
                        data={post} 
                        currentUser={user._id}
                        handleDelete={this.handleDelete} /> 
                    })}

                    {!posts.length &&
                    <>
                        <br />
                        <br />
                        <i className="">No posts</i>
                    </>
                    }
                </>
                }                
                {loading && 
                <>
                    <br />
                    <br />
                    <i className="">Loading ...</i>
                </>
                }
            
            </>
        
        )
    }
}

export default MyPosts;