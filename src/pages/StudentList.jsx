import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, deleteStudent } from "../store/studentSlice";
import { Link, useNavigate } from "react-router-dom";

export default function StudentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchStudents());
  }, [dispatch, list.length]);

  function handleDelete(id, name) {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteStudent(id));
      alert("Student deleted successfully!");
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-purple-700">Students</h2>
        <button
          onClick={() => navigate("/add")}
          className="btn-primary"
          type="button"
        >
          Add Student
        </button>
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse border border-purple-300">
          <thead>
            <tr className="bg-purple-100">
              <th className="border border-purple-300 p-2 text-left">Name</th>
              <th className="border border-purple-300 p-2 text-left">Email</th>
              <th className="border border-purple-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No students found.
                </td>
              </tr>
            ) : (
              list.map(({ id, name, email }) => (
                <tr key={id} className="hover:bg-purple-50">
                  <td className="border border-purple-300 p-2">{name}</td>
                  <td className="border border-purple-300 p-2">{email}</td>
                  <td className="border border-purple-300 p-2 text-center space-x-2">
                    <Link
                      to={`/student/${id}`}
                      className="btn-secondary"
                    >
                      View
                    </Link>
                    <button
                      className="btn-primary"
                      onClick={() => handleDelete(id, name)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/edit/${id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
