// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import RouteConfig from './route';  // Import RouteConfig (with no Router)

const App = () => {
  return (
    <Router>
      <RouteConfig />  {/* Only wrap RouteConfig here */}
    </Router>
  );
};

export default App;
