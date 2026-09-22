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

  return { mediaArray };
};

export { useMedia };
