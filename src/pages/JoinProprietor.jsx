import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { BiSearch } from "react-icons/bi";
import SearchStore, {
  CategoryIcon,
} from "../components/Proprietor/SearchStore";
import { AiOutlineClose } from "react-icons/ai";
import PhoneIcon from "@mui/icons-material/Phone";

const IsPasswordValid = (password, confirmPassword) => {
  if (password.length < 6 || confirmPassword.length < 6) {
    return false;
  } else if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
};

function JoinProprietor() {
  const ps = useRef();
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhoneNum, setStorePhoneNum] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [storePosition, setStorePosition] = useState({});
  const [showKeyword, setShowKeyword] = useState(false);
  //const [currentStore, setCurrentStore] = useState();
  const [firstPage, setFirstPage] = useState(true);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStore = (store) => {
    setSearchKeyword(store.place_name);
    setStoreAddress(store.address_name);
    setStorePhoneNum(store.phone);
    setStoreCode(store.category_group_code);
    setStorePosition({ x: store.x, y: store.y });
    setShowKeyword(false);
    setSearchData([]);
  };
  const onClickClose = useCallback(() => {
    setShowKeyword(false);
    setSearchKeyword("");
  }, []);

  const onChangeKeyword = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);
  const placesSearchCB = useCallback((data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setSearchData(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("?????? ????????? ???????????? ????????????.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("?????? ?????? ??? ????????? ??????????????????.");
      return;
    }
  }, []);

  const searchPlaces = useCallback(() => {
    var keyword = searchKeyword;

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("???????????? ??????????????????!");
      return false;
    }
    ps.current.keywordSearch(keyword, placesSearchCB);
  }, [placesSearchCB, ps, searchKeyword]);

  const onClickSearch = useCallback(() => {
    setShowKeyword(true);
    searchPlaces();
  }, [searchPlaces]);

  const postUserData = useCallback(
    async (
      name,
      email,
      password,
      storeName,
      address,
      code,
      phoneNum,
      openHour,
      openMinute,
      closeHour,
      closeMinute,
      ticketTime,
      parkingSpace,
      fullTime
    ) => {
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
        await set(ref(getDatabase(), "users/proprietor/" + user.uid), {
          name: user.displayName,
          email: email,
          storeCode: user.uid,
          usingTicket: [],
          storeName: storeName,
          address: address,
          code: code,
          phoneNum: phoneNum,
          openHour: openHour,
          openMinute: openMinute,
          closeHour: closeHour,
          closeMinute: closeMinute,
          ticketTime: ticketTime,
          parkingSpace: parkingSpace,
          fullTime: fullTime,
          ableParking: true,
          x: storePosition?.x,
          y: storePosition?.y,
        });
        await set(ref(getDatabase(), "store/" + storeName), {
          name: user.displayName,
          email: email,
          storeCode: user.uid,
          usingTicket: [],
          storeName: storeName,
          address: address,
          code: code,
          phoneNum: phoneNum,
          openHour: openHour,
          openMinute: openMinute,
          closeHour: closeHour,
          closeMinute: closeMinute,
          ticketTime: ticketTime,
          parkingSpace: parkingSpace,
          fullTime: fullTime,
          x: storePosition?.x,
          y: storePosition?.y,
        });
        dispatch(setUser(user));
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    },
    [dispatch, storePosition?.x, storePosition?.y]
  );

  const handleNextpage = useCallback(() => {
    setFirstPage(false);
  }, []);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      //first Page
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      //second Page
      const storeName = data.get("storeName");
      const address = data.get("address");
      const code = data.get("code");
      const phoneNum = data.get("phoneNum");
      const openHour = data.get("openHour");
      const openMinute = data.get("openMinute");
      const closeHour = data.get("closeHour");
      const closeMinute = data.get("closeMinute");
      const ticketTime = data.get("ticketTime");
      const parkingSpace = data.get("parkingSpace");
      const fullTime = data.get("fullTime");
      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !storeName ||
        !address ||
        !phoneNum ||
        !openHour ||
        !openMinute ||
        !closeHour ||
        !closeMinute ||
        !ticketTime ||
        !parkingSpace
      ) {
        setError("?????? ????????? ??????????????????.");
        return;
      }

      if (!IsPasswordValid(password, confirmPassword)) {
        setError("??????????????? ???????????????.");
        return;
      }

      postUserData(
        name,
        email,
        password,
        storeName,
        address,
        code,
        phoneNum,
        openHour,
        openMinute,
        closeHour,
        closeMinute,
        ticketTime,
        parkingSpace,
        fullTime
      );
    },
    [postUserData]
  );

  useEffect(() => {
    ps.current = new window.kakao.maps.services.Places();
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
        ????????????
      </Box>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#F6F6F6",
          height: "90vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={4} display={firstPage ? "flex" : "none"}>
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
                  ????????? ?????? ??????
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="????????? ??????????????????."
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
                  label="????????? ??????"
                  variant="standard"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  variant="standard"
                  label="????????????"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  required
                  fullWidth
                  variant="standard"
                  label="?????? ????????????"
                  type="password"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} display={firstPage ? "none" : "flex"}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  fontSize="1rem"
                  fontWeight="bold"
                >
                  ????????? ?????? ??????
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <TextField
                  name="storeName"
                  required
                  label="?????????"
                  variant="standard"
                  autoFocus
                  fullWidth
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <BiSearch
                          style={{ fontSize: "1.5rem" }}
                          onClick={onClickSearch}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={onChangeKeyword}
                  value={searchKeyword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  label="??????"
                  variant="standard"
                  autoComplete="off"
                  onChange={(e) => setStoreAddress(e.target.value)}
                  value={storeAddress}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <TextField
                  name="code"
                  required
                  fullWidth
                  label="????????????"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon category={storeCode} />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  onChange={(e) => setStoreCode(e.target.value)}
                  value={storeCode}
                />
                <TextField
                  name="phoneNum"
                  required
                  fullWidth
                  label="????????????"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  onChange={(e) => setStorePhoneNum(e.target.value)}
                  value={storePhoneNum}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  fontSize="1rem"
                  width="30%"
                  display="flex"
                  alignItems="end"
                  textDecoration="underline"
                >
                  ????????????
                </Typography>
                <TextField
                  name="openHour"
                  required
                  label="Hour"
                  type="number"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography
                          variant="h6"
                          component="h2"
                          fontSize="1.5rem"
                          fontWeight="bold"
                        >
                          :
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ label: { fontSize: "0.5rem" }, width: "15%" }}
                />
                <TextField
                  name="openMinute"
                  required
                  type="number"
                  label="Min"
                  variant="standard"
                  sx={{
                    label: { fontSize: "0.5rem" },
                    width: "15%",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h2"
                  fontSize="1rem"
                  fontWeight="bold"
                  width="10%"
                  display="flex"
                  alignItems="end"
                  justifyContent="center"
                  textDecoration="underline"
                >
                  ~
                </Typography>
                <TextField
                  name="closeHour"
                  required
                  label="Hour"
                  type="number"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography
                          variant="h6"
                          component="h2"
                          fontSize="1.5rem"
                          fontWeight="bold"
                        >
                          :
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ label: { fontSize: "0.5rem" }, width: "15%" }}
                />
                <TextField
                  name="closeMinute"
                  required
                  label="Min"
                  type="number"
                  variant="standard"
                  sx={{
                    label: { fontSize: "0.5rem" },
                    width: "15%",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  fontSize="1rem"
                  fontWeight="bold"
                >
                  ?????? ?????? ??????
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ticketTime"
                  required
                  fullWidth
                  type="number"
                  label="?????? 1??? ??? ???????????? .ex 30???"
                  variant="standard"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="parkingSpace"
                  required
                  fullWidth
                  type="number"
                  variant="standard"
                  label="????????? ?????? ?????? ??????"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked name="fullTime" />}
                  label="?????? ?????? ??? ?????? ???????????? ???????????????."
                />
              </Grid>
            </Grid>
            {error ? (
              <Alert sx={{ mt: 3 }} severity="error">
                {error}
              </Alert>
            ) : null}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h2"
                fontSize="1rem"
                fontWeight="bold"
                display={firstPage ? "flex" : "none"}
                alignItems="center"
                justifyContent="center"
                bgcolor="#ECE6CC"
                marginTop={3}
                marginBottom={3}
                borderRadius="8px"
                color="#707070"
                height="8vh"
                boxShadow="2px 2px 4px gray"
                onClick={handleNextpage}
              >
                ????????? ?????? ???????????? ??????
              </Typography>
            </Grid>
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
                height: "10%",
                display: firstPage ? "none" : "flex",
              }}
            >
              ????????????
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  ?????? ????????? ?????????? ??????????????? ??????
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Modal
          open={showKeyword}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              padding: "4%",
              width: "80%",
              height: "30%",
              backgroundColor: "white",
              overflow: "scroll",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" component="h2" fontSize="1rem">
                ???????????? ????????? ???????????????.
              </Typography>
              <AiOutlineClose className="text-lg" onClick={onClickClose} />
            </Box>
            {searchData.map((value, index) => (
              <SearchStore
                handleStore={handleStore}
                key={index}
                store={value}
              />
            ))}
          </Box>
        </Modal>
      </Container>
    </>
  );
}

export default JoinProprietor;
