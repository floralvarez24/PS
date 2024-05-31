import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";  
import Login from "./components/Login";
import Users from "./pages/Users";
import Fletes from "./pages/Fletes";
import AddUser from "./pages/AddUser";  
import EditUser from "./pages/EditUser";
import AddFlete from "./pages/AddFlete";
import EditFlete from "./pages/EditFlete";

function App() {
  return (
    <div className="has-background-white">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/fletes" element={<Fletes />} />
        <Route path="/fletes/add" element={<AddFlete />} />
        <Route path="/fletes/edit/:id" element={<EditFlete />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>     
      </BrowserRouter>
    </div>
  );
}

export default App;
