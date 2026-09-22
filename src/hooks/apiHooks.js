import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaData = await fetchData(
          import.meta.env.VITE_MEDIA_API + "/media",
        );

        const userListPromises = mediaData.map((media) =>
          fetchData(import.meta.env.VITE_AUTH_API + "/users/" + media.user_id),
        );

        const userListData = await Promise.all(userListPromises);

        const combinedData = mediaData.map((item) => {
          const foundUser = userListData.find(
            (user) => user.user_id === item.user_id,
          );

          return {
            ...item,
            username: foundUser.username,
          };
        });

        setMediaArray(combinedData);
      } catch (error) {
        console.log(error);
      }
    };

    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...file,
      ...inputs,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_MEDIA_API + "/media",
      fetchOptions,
    );
    return loginResult;
  };

  return { mediaArray, postMedia };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      fetchOptions,
    );
    return loginResult;
  };
  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const userData = await fetchData(
      import.meta.env.VITE_AUTH_API + "/users/token",
      fetchOptions,
    );
    return userData;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };

    const userData = await fetchData(
      import.meta.env.VITE_AUTH_API + "/users",
      fetchOptions,
    );
    return userData;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return { getUserByToken, postUser, handleLogout };
};

const useFile = () => {
  const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const fetchOptions = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    };
    const result = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + "/upload",
      fetchOptions,
    );
    return result;
  };

  return { uploadFile };
};

export { useMedia, useAuthentication, useUser, useFile };
