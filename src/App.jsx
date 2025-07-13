import { Routes, Route } from "react-router-dom";
import StudentList from "./pages/StudentList";
import StudentDetail from "./pages/StudentDetail";
import AddEditStudent from "./pages/AddEditStudent";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">
        Student Management Portal
      </h1>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/add" element={<AddEditStudent />} />
        <Route path="/edit/:id" element={<AddEditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
