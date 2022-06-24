import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import { getCurrentUser } from './services/userServices';

import {  Container } from 'react-bootstrap';

import NavBar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';
import Signin from './components/signin';
import Signup from './components/signup';
import CreatePost from './components/posts/createPost';
import EditPost from './components/posts/editPost';
import MyPosts from './components/posts/myposts';
import Middleware from './components/middleware';



function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    
    setUser(getCurrentUser())
  }, []);

  

  return (
      <div className="App">
        <header>
          <NavBar user={user} />
        </header>
        <main className="ming-900">
            <Container>
              <Routes>

                
                
                <Route path="/about" element={<About />} />
                { !user &&
                  <>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                  </>
                }
                { user && 
                  <>
                    <Route path="/createpost" element={<CreatePost />} />
                    <Route path="/myposts" element={<MyPosts user={user} />} />
                    <Route path="/editpost/:id" element={<Middleware component={EditPost} />} />
                  </>
                }

                <Route path="*" element={<Home />}  />

              </Routes>
            </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
  );
}

export default App;
