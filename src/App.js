import React, { useEffect} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/userReducer";
import { CircularProgress, Stack } from "@mui/material";
import Main from "./pages/Main";
import Proprietor from "./pages/Proprietor";

function App() {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress color="secondary" size={150} />
      </Stack>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Main /> : <Navigate to="/login" />}
      />
      <Route
        path="/proprietor"
        element={currentUser ? <Proprietor /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/join"
        element={currentUser ? <Navigate to="/" /> : <Join />}
      />
    </Routes>
  );
}

export default App;
