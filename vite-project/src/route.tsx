import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  
import Home  from './Home'

const RouteConfig = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />  {/* Default route */}
      </Routes>
  );
};

export default RouteConfig;
