import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = useSelector((state) =>
    state.students.list.find((s) => s.id === parseInt(id))
  );

  if (!student) {
    return (
      <div>
        <p>Student not found.</p>
        <button
          onClick={() => navigate("/")}
          className="btn-primary mt-4"
          type="button"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 border border-purple-300 rounded shadow">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4">
        Student Details
      </h2>
      <p>
        <strong>Name:</strong> {student.name}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Phone:</strong> {student.phone}
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn-primary mt-6"
        type="button"
      >
        Back to List
      </button>
    </div>
  );
}
