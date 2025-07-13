
# Student Management Portal

A React-based Student Management Portal that allows users to **view**, **add**, **edit**, and **delete** student details. This project demonstrates the use of **React Hooks**, **Redux Toolkit** for state management, **React Router v6** with loader functions, **API integration**, and **form validation**.

---
## Live Demo

The website is hosted here:  
[https://student-management-portal-jade.vercel.app/](https://student-management-portal-jade.vercel.app/)

## Source Code

The complete source code is available at:  
[https://github.com/sooryashibu/-Student-Management-Portal.git](https://github.com/sooryashibu/-Student-Management-Portal.git)

---
## Technologies Used

- React 18 (Functional Components & Hooks)
- Redux Toolkit (for state management)
- React Router v6 (with loader functions)
- JavaScript (ES6+)
- CSS (Custom purple theme)
- JSONPlaceholder API (Mock data source)
- Redux Thunk (via Redux Toolkit)
- Vite or Create React App (for bootstrapping the project)

---

---

## Features & Functionality

### Student List Page (`/`)
- Fetches student list from mock API on load.
- Displays name, email, and a "View" button for each student.
- Allows deleting students with confirmation.
- Handles loading and error states.
- Clicking "View" navigates to student details page.

### Student Detail Page (`/student/:id`)
- Shows detailed information for a selected student.
- Loads data based on URL params and React Router loader.
- Includes "Back to List" button.

### Add / Edit Student Form (`/add` and `/edit/:id`)
- Form fields: Full Name, Email, Phone Number.
- Validation for required fields, email format, and phone number digits only.
- Supports adding new and editing existing students.
- Shows success alert after submission.
- Updates Redux store and reflects changes on student list.

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd student-management-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## Notes

- Student data changes (add/edit/delete) are stored in Redux and reset on page reload.
- Initial student list is fetched from JSONPlaceholder mock API.
- Simple alert messages for success notifications, no external toast libraries.
- Form validations prevent invalid inputs.


