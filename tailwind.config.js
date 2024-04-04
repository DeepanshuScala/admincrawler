/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {mob : {max : "500px"} , tab : {max : "900px"}, "4k" : {max : "1920px"} },
      colors : {
      primary : "#E8E51A",
       secondary : "#000" ,
       pureBlack:"#282823",
       white:"#FFFFFF",
       tertiaryDark:"#E3E3D8",
       ButtonPrimary:"#026C73",
      },
      // font size 
      fontSize:{
      h1: ['32px', {lineHeight: '42px', weight: '700'}],
      h2: ['16px', {lineHeight: '26px', weight: '500'}],
      h3: ['19px', {lineHeight: '25px', weight: '400'}],
      subtitle:['24px', {lineHeight: '40px', weight: '600'}],
      caption: ['12px', {lineHeight: '10px', weight: '500'}],
      subtitle1: ['14px', {lineHeight: '16px', weight: '400'}],
      subtitle3: ['12px', {lineHeight: '13px', weight: '700'}],

      },
     


    fontFamily: {
      ubuntu: 'Ubuntu, sans-serif',
      redHat:  "Red Hat Display, sans-serif",
    },
    },
  },
  plugins: [],
}