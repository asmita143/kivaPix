// src/App.tsx

import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import RouteConfig from './route';  

const App = () => {
  return (
    <Router>
      <RouteConfig />
    </Router>
  );
};

export default App;
