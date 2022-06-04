import {Routes, Route } from "react-router-dom";

import {Container} from 'react-bootstrap';

import NavBar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Signin from './components/signin';
import Signup from './components/signup';



function App() {
  return (
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main>
            <Container>
              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="*" element={<Home />} />

              </Routes>
            </Container>
        </main>
        <footer></footer>
      </div>
  );
}

export default App;
