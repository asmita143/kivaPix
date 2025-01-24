// src/route.tsx
import { Route, Routes } from 'react-router-dom';  // Import Routes and Route
import Login from './Login';  
import Home from './Home';
import Register from './Register';

const RouteConfig = () => {
  return (
    <Routes>  {/* Just use Routes here without another Router */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/" element={<Login />} />  {/* Default route */}
    </Routes>
  );
};

export default RouteConfig;
