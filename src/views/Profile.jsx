import { useState, useEffect } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      try {
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []); // ESLint warning: React Hook useEffect has a missing dependency: Fix in the next assignment?

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.user.username}</p>
      <p>Email: {user.user.email}</p>
    </div>
  );
};

export default Profile;
