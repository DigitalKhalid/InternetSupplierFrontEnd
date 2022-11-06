import './App.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { User } from './components/contents/User'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import background from './background.jpg'

function App() {
  document.body.style.backgroundImage = `url(${background})`
  document.body.style.backgroundSize = 'cover'

  return (
    <>
      <Router>
        <Header />
        <div className="container-float mx-3 my-3">
          <div className="row">
            <div className="col-md-12">
              <Sidebar />
            </div>
            <Routes>
              {/* <Route
              path='/'
              element={
                <div className="col md 10">
                  <Dashboard />
                </div>
              }
            /> */}

              <Route
                path='/users'
                element={
                  <div className="col md 10">
                    <User />
                  </div>
                }
              />
            </Routes>

          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
