import { MODULE } from "../../config/routes/RoleProtectedRoute";
import User from '../../assets/icons/User.svg'
import bussinessDetails from '../../assets/icons/Shape.svg'
import Image from '../../assets/icons/Image.svg'
import Content from '../../assets/icons/Content Discount.svg'
import DashIcon from '../../assets/icons/Dashboard.svg'
import LocationIcon from '../../assets/icons/Location.svg'

// active icon
import ActUser from '../../assets/icons/active-icons/User.svg'
import ActbussinessDetails from '../../assets/icons/active-icons/Shape.svg'
import ActImage from '../../assets/icons/active-icons/Image.svg'
import ActContent from '../../assets/icons/active-icons/Content Discount.svg'
import ActLocationIcon from '../../assets/icons/active-icons/Location.svg'
import ActDashIcon from '../../assets/icons/active-icons/Dashboard.svg'

export const sidepanalLinks = [
  {
    Title: "Dashboard",
    icons: DashIcon,
    acticon: ActDashIcon,
    Link: "/dashboard",
    module: MODULE.USER,
  },
  {
    Title: "Crawled",
    Link: "/dashboard/crawled",
    icons: Content,
    acticon: ActContent,
    module:MODULE.USER,
  },
  {
    Title: "Published",
    Link: "/dashboard/published",
    icons: Content,
    acticon: ActContent,
    module:MODULE.USER,
  }
];

export const status = {
  active: "Active",
  inActive: "Inactive",
  scheduled: "Scheduled",
};

export const socialMediaPost = [
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.scheduled,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.inActive,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    status: status.active,
    discription: "Free Coffee with Breakfast Entre",
    image:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
