import * as React from "react";
import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material/";

export default function QuestionThree() {
  const [sweet, setSweet] = React.useState();

  const handleChange = (event, nextSweet) => {
    setSweet(nextSweet);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        선호하는 와인의 당도가 있으십니까?
      </Typography>
      <ToggleButtonGroup size="large" orientation="vertical" value={sweet} exclusive onChange={handleChange} fullWidth sx={{ mb: 3 }}>
        <ToggleButton value="1">낮은 당도</ToggleButton>
        <ToggleButton value="2">보통 당도</ToggleButton>
        <ToggleButton value="3">높은 당도</ToggleButton>
        <ToggleButton value="0">잘모르겠어요</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
