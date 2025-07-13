import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchStudents = () => axios.get(API_URL);
export const fetchStudentById = (id) => axios.get(`${API_URL}/${id}`);
