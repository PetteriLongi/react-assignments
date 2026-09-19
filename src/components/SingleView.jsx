// SingleView.jsx

const SingleView = (props) => {
  const { item, setSelectedItem } = props;

  if (!item) {
    return null;
  }

  return (
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
    <dialog open={item !== null}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      {item.media_type.startsWith("image/") ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};
export default SingleView;
