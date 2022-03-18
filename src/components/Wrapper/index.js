import { useNavigate } from "react-router-dom";

// 包裹类组件
const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export { withNavigation };
