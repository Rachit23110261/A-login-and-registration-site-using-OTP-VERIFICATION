import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Chat() {
  var {
    isLoggedIn,
    toggleTheme,
    darkMode,
    username,
    setUsername,
    phone,
    setPhone,
    email,
    setEmail,
  } = useAuth();
  const [user, setUser] = useState({
    email: "",
  });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // console.log("login form", response)

      const res_data = await response.json();
      // console.log(res_data);
      console.log(results,'here are results')

      if (response.ok) {
        const { email } = user;
        setEmail(email);
        setResults(res_data.users[0]);
        // toast.success("Login successful");
        isLoggedIn = true;
      } else {
        toast.error(
          // "login Unsccessfull"
          res_data.extraDetails ? res_data.extraDetails : res_data.msg
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const Chatwithuser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/chatwith", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });


      const res_data = await response.json();
      // console.log(res_data);
      console.log(results,'here are chatwith results')

      if (response.ok) {
        setResults(res_data.users);
        isLoggedIn = true;
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.msg
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            placeholder="enter email of the user"
            id="email"
            required
            autoComplete="off"
            // value={user.email}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          search
        </button>
      </form>
      <ul>
        
          <li key={results.email}>{results.username}</li>
       
          {results && (
          <button onClick={Chatwithuser}>Chat</button>
        )}
      </ul>
    </div>
  );
}
