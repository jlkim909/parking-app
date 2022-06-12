import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";

const IsPasswordValid = (password, confirmPassword) => {
  if (password.length < 6 || confirmPassword.length < 6) {
    return false;
  } else if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
};

function JoinUser() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const postUserData = useCallback(
    async (name, email, phoneNum, password) => {
      setLoading(true);
      try {
        const { user } = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        await updateProfile(user, {
          displayName: name,
        });
        await set(ref(getDatabase(), "users/" + user.uid), {
          name: user.displayName,
          email: email,
          code: user.uid,
          phoneNum: phoneNum,
          userTicket: [],
        });
        dispatch(setUser(user));
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = data.get("name");
      const email = data.get("email");
      const phoneNum = data.get("phoneNum");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      if (!name || !email || !password || !confirmPassword || !phoneNum) {
        setError("모든 항목을 입력해주세요.");
        return;
      }

      if (!IsPasswordValid(password, confirmPassword)) {
        setError("비밀번호를 확인하세요.");
        return;
      }

      postUserData(name, email, phoneNum, password);
    },
    [postUserData]
  );

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "10vh",
          width: "100%",
          color: "white",
          fontSize: "1.5rem",
          borderRadius: "0 0 8px 8px",
          backgroundColor: "#50accb",
        }}
      >
        회원가입
      </Box>
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
            height: "90vh",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="h2"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  사용자 정보 입력
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="이름을 입력해주세요."
                  variant="standard"
                  autoFocus
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  label="이메일 주소"
                  variant="standard"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phoneNum"
                  required
                  fullWidth
                  label="전화번호"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  variant="standard"
                  label="비밀번호"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  required
                  fullWidth
                  variant="standard"
                  label="확인 비밀번호"
                  type="password"
                />
              </Grid>
            </Grid>
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
                height: "16%",
              }}
            >
              회원가입
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  이미 계정이 있나요? 로그인으로 이동
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default JoinUser;
