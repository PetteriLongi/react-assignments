import { useEffect, useState } from "react";
import MediaRow from "../components/MediaRow";
import fetchData from "../utils/fetchData";

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");
        const newArray = await Promise.all(
          json.map(async (item) => {
            const user = await fetchData(
              import.meta.env.VITE_AUTH_API + "/users/" + item.user_id,
            );
            return { ...item, username: user.username };
          }),
        );
        setMediaArray(newArray);
      } catch (error) {
        console.log("Error fetching media data:", error);
      }
    };
    getMedia();
  }, []);

  console.log("mediaArray", mediaArray);

  return (
    <>
      <h2>My Media</h2>

      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Username</th>
          </tr>
        </thead>

        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
