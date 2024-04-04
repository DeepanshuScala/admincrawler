// import React from "react";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import {
//   Box,
//   StepConnector,
//   StepLabel,
//   stepConnectorClasses,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Check } from "@mui/icons-material";

// const MAX_STEP = 4;
// const QontoConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 10,
//     left: "calc(-50%)",
//     right: "calc(50% )",
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: "#000",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       // borderColor: "#784af4",
//       borderColor: "#000",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor:
//       //   theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
//       theme.palette.mode === "dark" ? "#000" : "#000",
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// }));

// const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   //   color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
//   color: theme.palette.mode === "dark" ? "#000" : "#000",
//   display: "flex",
//   height: 22,
//   alignItems: "center",
//   ...(ownerState.active && {
//     // color: "#784af4",
//     color: "#000",
//   }),
//   "& .QontoStepIcon-completedIcon": {
//     color: "#000",
//     zIndex: 1,
//     fontSize: 18,
//     width: 20,
//     height: 20,
//     backgroundColor: "#03B4BF",
//     borderRadius: "50%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   "& .QontoStepIcon-circle": {
//     width: 20,
//     height: 20,
//     borderRadius: "50%",
//     backgroundColor: "currentColor",
//   },
// }));

// function QontoStepIcon(props) {
//   const { active, completed, className } = props;

//   return (
//     <QontoStepIconRoot ownerState={{ active }} className={className}>
//       {completed ? (
//         <div className="QontoStepIcon-completedIcon">
//           <Check fontSize="small" />
//         </div>
//       ) : (
//         <div className="QontoStepIcon-circle" />
//       )}
//     </QontoStepIconRoot>
//   );
// }

// const StepWizard = ({ step }) => {
//   console.log(step)
//   return (
//     <div>
//       <Box sx={{ width: "50%" }}>
//         <Stepper
//           alternativeLabel
//           activeStep={step+""}
//           connector={<QontoConnector />}
//         >
//           {Array(MAX_STEP)
//             .fill("1")
//             .map((label, index) => {
//               return (
//                 <Step key={index}>
//                   <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
//                 </Step>
//               );
//             })}
//         </Stepper>
//       </Box>
//     </div>
//   );
// };

// export default StepWizard;


import React from 'react'

export default function StepWizard({ step }) {
  return (
    <div className='flex gap-2 items-center'>
      {
        [1, 2, 3, 4].map((item) => (
          <div key={item} className="circle w-[15px] h-[15px] rounded-full bg-[#E7E7DB] flex items-center justify-center right-step-line">
            {
              (step + 1) === item ?
                <div className="circle w-[10px] h-[10px] rounded-full bg-[#03B4BF]">
                </div> : null
            }
            {
              (step >= item) ?
                <div className="circle w-[13px] h-[13px] flex items-center justify-center rounded-full bg-[#03B4BF] overflow-hidden">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="7" fill="#03B4BF" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2737 3.98699C10.557 4.18411 10.6269 4.57361 10.4298 4.85697L7.38093 9.23974C7.01034 9.77246 6.24813 9.84032 5.78926 9.38145L3.84981 7.442C3.60573 7.19792 3.60573 6.80219 3.84981 6.55811C4.09388 6.31404 4.48961 6.31404 4.73369 6.55811L6.49703 8.32145L9.40368 4.14314C9.6008 3.85978 9.99031 3.78987 10.2737 3.98699Z" fill="#0D0D0A" />
                  </svg>
                </div> : null
            }
          </div>
        ))
      }
    </div>
  )
}
