import { useNavigate } from "react-router";

export const useBackPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  return handleNavigate;
};
