import {
    FiUser,
    FiClock,
    FiMapPin,
    FiCornerRightDown,
    FiArrowLeft,
  } from "react-icons/fi";
  
  export const Icons = {
    user: (props?: any) => <FiUser {...props} />,
    clock: (props?: any) => <FiClock {...props} />,
    mapPin: (props?: any) => <FiMapPin {...props} />,
    cornerDown: (props?: any) => <FiCornerRightDown {...props} />,
    back: (props?: any) => <FiArrowLeft {...props} />,
  };
  