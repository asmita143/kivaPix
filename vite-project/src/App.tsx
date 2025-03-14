import { BrowserRouter as Router } from "react-router-dom";
import RouteConfig from "./route"; // Ensure your route config is correct

const App = () => {
  return (
    <Router>
      <RouteConfig />
    </Router>
  );
};

export default App;
