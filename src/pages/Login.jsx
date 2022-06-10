import React, { useCallback, useEffect, useState } from "react";
import { Alert, Box, Container, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import loginImg from "../image/loginlogo.png";
import { setMode } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
function Login({ client, setClient }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { mode } = useSelector((state) => state.user);
  const loginUser = useCallback(async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      if (!email || !password) {
        setError("모든 항목을 입력해주세요.");
        return;
      }
      loginUser(email, password);
    },
    [loginUser]
  );

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: "#F6F6F6" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img src={loginImg} alt="" style={{ marginBottom: "10vh" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "10vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: mode === "user" ? "#ECE6CC" : "white",
              width: "40vw",
              height: "4vh",
              color: "#707070",
              boxShadow: "2px 2px 4px gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
            onClick={() => dispatch(setMode("user"))}
          >
            고객용
          </Box>
          <Box
            sx={{
              backgroundColor: mode === "proprietor" ? "#ECE6CC" : "white",
              width: "40vw",
              height: "4vh",
              color: "#707070",
              boxShadow: "2px 2px 4px gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
            onClick={() => dispatch(setMode("proprietor"))}
          >
            사업자용
          </Box>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="아이디"
            name="email"
            autoComplete="off"
            autoFocus
            sx={{}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="비밀번호"
            name="password"
            type="password"
          />
          {error ? (
            <Alert sx={{ mt: 3 }} severity="error">
              {error}
            </Alert>
          ) : null}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#ECE6CC",
              color: "#707070",
              height: "20%",
            }}
          >
            로그인
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/join"
                style={{
                  textDecoration: "none",
                  color: "#707070",
                }}
              >
                계정이 없나요? 회원가입으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
