import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Send from "../../../config/Send";
import TopNav from "../../main/Home/TopNav";
import { Box, Typography, Link, Grid, MenuItem, Select } from "@mui/material/";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
    }}
  />
);

function WineInfo(props) {
  const [criteria, setCriteria] = useState("all");
  const handleCriteria = (event) => {
    setCriteria(event.target.value);
  };

  const [infoData, setInfoData] = useState([]);
  const getInfo = () => {
    if (criteria === "all") {
      Send.get(`/wineinfo`).then((res) => setInfoData(res.data));
    } else {
      Send.get(`/wineinfo/${criteria}`).then((res) => setInfoData(res.data));
    }
  };

  useEffect(() => {
    getInfo();
  }, [criteria]);

  return (
    <>
      {/* 상단 구성 */}
      <div>
        <TopNav />
        <Box
          sx={{
            my: 3,
            px: 50,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link href="/search" color="inherit" underline="none">
            와인검색
          </Link>
          <Link href="/wineinfo" color="inherit" underline="none">
            와인사전
          </Link>
          <Link href="#" color="inherit" underline="none">
            주제별와인
          </Link>
          <Link href="/foodSearch" color="inherit" underline="none">
            음식추천
          </Link>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Box sx={{ mt: 10, mb: 5, mx: 30, display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                  와인사전
                </Typography>
                <Select size="small" sx={{ mr: 3 }} value={criteria} onChange={handleCriteria}>
                  <MenuItem value={"all"}>전체</MenuItem>
                  <MenuItem value={"기본용어"}>기본용어</MenuItem>
                  <MenuItem value={"와인상식"}>와인상식</MenuItem>
                  <MenuItem value={"포도품종"}>포도품종</MenuItem>
                  <MenuItem value={"생산지역"}>생산지역</MenuItem>
                </Select>
              </Box>
              <ColoredLine color="black" />
              {infoData &&
                infoData.map((info, index) => {
                  return (
                    <Box sx={{ my: 1 }} key={index}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>[{info.type}]</Typography>
                        <Typography>　</Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>{info.infoTitle}</Typography>
                      </Box>
                      <Typography sx={{ mt: 1, mb: 2 }}>{info.infoText}</Typography>
                      <ColoredLine color="lightgray" />
                    </Box>
                  );
                })}
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(WineInfo);
