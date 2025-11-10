
## 🔧 Tasks / Updates

### 1. Change User Login to Student Login

---

### 2. Replace All Alerts with React Material Snackbar

* Replace all existing `alert()` usages with **React Material Snackbar**.
* Snackbar should appear at the **Top Right** position.
* Reference: [MUI Snackbar Documentation](https://mui.com/material-ui/react-snackbar/)

---

### 3. Add Email Validations

* Implement **email format validation** on both **Login** and **Registration** pages.

---

### 4. Add Unique Email Validation

* Ensure that each email is **unique** during registration.
* Prevent duplicate email entries in the database.

---

### 5. Restrict Access for Non-Logged-In Users

* Users must **log in** before accessing any other pages.
* Redirect unauthorized users to the **Login page**.

---

### 6. Implement Secure Login using Password Hashing

* Use the **bcrypt** library for password hashing.
* Follow best practices for password encryption and comparison.
* Reference: [Node Password Hashing Guide](https://www.honeybadger.io/blog/node-password-hashing/)

---