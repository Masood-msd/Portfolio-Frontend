/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState([]);

  const AuthorizationToken = `Bearer ${token}`;

  // API KEY GATHERING  ====================

  const API = import.meta.env.VITE_API_KEY;

  //  login functionality ========================
  const isLoggedIn = !!token;

  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // useEffect for isAdmin===========================
  useEffect(() => {
    handleWorkData();
  }, []);

  // Logout function

  const LogoutUser = () => {
    setToken(null);
    setIsAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  // Fetching All users details  ==============================

  const userApi = `${API}/api/auth/user`;
  const userDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(userApi, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("isAdmin", data.userData.isAdmin);
        setIsAdmin(data.userData.isAdmin);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.log("Failed to load data from USER");
        setIsLoading(false);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect for token ================================
  useEffect(() => {
    if (token) {
      userDetails();
    }
  }, [token]);

  // Showing all work===============================

  const handleWorkData = async () => {
    try {
      const response = await fetch(`${API}/api/data/work`, {
        method: "GET",
      });

      if (response.ok) {
        const userdata = await response.json();
        setWork(userdata);
        //console.log(userdata);
      } else {
        console.log("Error from handleData");
      }
    } catch (err) {
      console.error(err.message || "Gathering data error ");
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        storeTokenInLs,
        LogoutUser,
        user,
        work,
        AuthorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
