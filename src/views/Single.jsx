import { useLocation, useNavigate } from "react-router";

const Single = () => {
  const { state } = useLocation();
  const item = state.item;
  const navigate = useNavigate();

  return (
    <>
      <h2>{item.title}</h2>
      <p>Owner: {item.username}</p>
      <p>{item.description}</p>

      {item.media_type.startsWith("image/") ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
};

export default Single;
