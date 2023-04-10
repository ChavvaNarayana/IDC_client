import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayPage from "./components/DisplayPage";
import Form from "./components/Form";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
