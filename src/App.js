import "./css/app.css";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import Login from "./components/login";

function App() {
  return(
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
  )
}

export default App;
