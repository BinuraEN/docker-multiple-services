import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./pages/OtherPage";

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/otherpage">Other page</Link>

      <Routes>
        <Route path="/" element={<Fib />} />
        <Route path="/otherpage" element={<OtherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
