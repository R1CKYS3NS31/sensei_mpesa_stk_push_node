import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Home } from './component/home/Home';
import Pay from './component/pay/Pay';

function App() {
  return (
    <Router>
      <Routes>
     {/* none existing routes */}
     <Route path='/' exact element={<Home/>}/>
     <Route path='/pay' element={<Pay/>}/>
     <Route
          path="*"
          element={
            <main
              style={{
                padding: "1rem",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h1>There's nothing here!</h1>
              <Link to={"/"}>
                <button
                  style={{
                    textDecoration: "none",
                    border: "none",
                    width: 120,
                    borderRadius: 5,
                    padding: "20px",
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Go Back Home
                </button>
              </Link>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
