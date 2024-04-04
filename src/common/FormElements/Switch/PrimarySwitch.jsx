import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel, Typography } from "@mui/material";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(23px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#009CA6" : "#009CA6",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    marginLeft: 0, 
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));


const PrimarySwitch = ({ onChange, defaultValue, labelText ,name}) => {

  return (
    <div>
      <FormControlLabel
        labelPlacement="start"
        sx={{ color: "#7C7C72",width:'100%',marginLeft:'0',justifyContent:'space-between', }}
        control={
          <IOSSwitch name={name}
            sx={{ m: 1 }}
            defaultChecked={defaultValue}
            onChange={onChange}
          />
        }
        label={<span className="text-sm font-medium text-[#74746E]" >{labelText}</span>}
      />
    </div>
  );
};

export default PrimarySwitch;
