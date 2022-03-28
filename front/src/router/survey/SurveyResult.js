import logo from "../../res/img/logo.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Breadcrumbs, Link, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material/";

export default function SurveyResult() {
  const url = "http://localhost:8080";
  const { state } = useLocation();
  const [results, setResults] = useState([]);

  let country;
  if (state.country.length === 0) {
    country = "FRANCE,UNITED_STATES,ITALY,CHILE,PORTUGAL,AUSTRALIA,SPAIN,NEW_ZEALAND";
  } else {
    country = state.country.join(",");
  }

  let minPrice;
  let maxPrice;
  if (state.price === "1") {
    minPrice = 0;
    maxPrice = 2;
  } else if (state.price === "2") {
    minPrice = 2;
    maxPrice = 4;
  } else if (state.price === "3") {
    minPrice = 4;
    maxPrice = 7;
  } else if (state.price === "4") {
    minPrice = 7;
    maxPrice = 20;
  } else if (state.price === "0") {
    minPrice = 0;
    maxPrice = 999;
  }

  let sweet;
  if (state.sweet === "0") {
    sweet = "1,2,3,4,5";
  } else if (state.sweet === "2") {
    sweet = "1,2";
  } else if (state.sweet === "3") {
    sweet = "3";
  } else if (state.sweet === "4") {
    sweet = "4,5";
  }

  let body;
  if (state.body === "0") {
    body = "1,2,3,4,5";
  } else if (state.body === "2") {
    body = "1,2";
  } else if (state.body === "3") {
    body = "3";
  } else if (state.body === "4") {
    body = "4,5";
  }

  const getResult = () => {
    axios
      .get(url + `/search`, {
        params: {
          type: state.wine,
          price_lower: minPrice,
          price_upper: maxPrice,
          sweet: sweet,
          body: body,
          country: country,
        },
      })
      .then((res) => {
        setResults(res.data.content);
      });
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <>
      {/* 상단 구성 */}
      <div>
        <Breadcrumbs style={{ display: "flex", flexDirection: "row-reverse", marginTop: 10, marginRight: 350 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/accounts/signup">
            회원가입
          </Link>
          <Link underline="hover" color="inherit" href="/accounts/login">
            로그인
          </Link>
        </Breadcrumbs>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href="/">
            <img width={250} src={logo} alt="logo" />
          </Link>
        </Box>
        <Box sx={{ mt: 10, mb: 5, mx: 20, display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h5" sx={{ mb: 10, fontWeight: "bold" }}>
            당신을 위한 wible 와인 추천
          </Typography>
          {/* 추천목록 */}
          <Box sx={{ m: 2, display: "flex", justifyContent: "space-evenly" }}>
            {results &&
              results.map((wine, index) => {
                return (
                  <Card sx={{ minWidth: 230, maxWidth: 230, minHeight: 350 }} key={index}>
                    <CardActionArea href={"/detail/" + wine.wineSeq}>
                      <CardMedia component="img" height="250" image="" alt="와인이미지" />
                      <CardContent>
                        <Box sx={{ height: 70 }}>
                          <Typography gutterBottom sx={{ fontSize: 20, fontWeight: "bold" }} component="div">
                            {wine.kname}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                          {wine.price} 원
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
          </Box>
        </Box>
      </div>
    </>
  );
}