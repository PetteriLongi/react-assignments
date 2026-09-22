import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUser } from "../hooks/apiHooks";

const Logout = () => {
  const navigate = useNavigate();
  const { handleLogout } = useUser();
  useEffect(() => {
    handleLogout();
    navigate("/login");
  }, [handleLogout, navigate]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
