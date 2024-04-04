import  * as yup from "yup"
export const admissionSchema = yup.object().shape({
    socialapp : yup.mixed().required("Please Select your social media application"),
    userId : yup.string().required("Please enter your social user id"),
    password  : yup.string().required("Please enter your social platform password")
    
})