import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, editStudent } from "../store/studentSlice";

const phoneRegex = /^\+?[0-9]{7,15}$/;

const AddEditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const students = useSelector((state) => state.students.list);
  const existingStudent = students.find((stu) => stu.id === parseInt(id));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id && existingStudent) {
      setFormData({
        fullName: existingStudent.name,
        email: existingStudent.email,
        phone: existingStudent.phone || "",
      });
    }
  }, [id, existingStudent]);

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) errs.fullName = "Full Name is required.";

    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else {
      // Simple email regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errs.email = "Invalid email format.";
      }
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errs.phone = "Invalid phone number. Use 7-15 digits, optional +.";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits and optional leading +
      let sanitized = value;

      // Remove all chars except digits and +
      sanitized = sanitized.replace(/[^\d+]/g, "");

      // Only allow one + at start
      if (sanitized.indexOf("+") > 0) {
        sanitized = sanitized.replace(/\+/g, "");
      }
      
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      dispatch(
        editStudent({
          id: parseInt(id),
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        })
      );
      alert("Student updated successfully!");
    } else {
      dispatch(
        addStudent({
          id: Date.now(),
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        })
      );
      alert("Student added successfully!");
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-purple-100 p-6 rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">
        {id ? "Edit Student" : "Add Student"}
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.fullName ? "border-red-500" : "border-purple-300"
            } rounded`}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-purple-300"
            } rounded`}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={16}
            className={`w-full p-2 border ${
              errors.phone ? "border-red-500" : "border-purple-300"
            } rounded`}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          {id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddEditStudent;
