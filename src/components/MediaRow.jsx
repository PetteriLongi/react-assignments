// src/components/MediaRow.jsx
const MediaRow = (props) => {
  const { item, setSelectedItem } = props;

  return (
    // TODO: move <tr> element in foreach from Home.jsx here
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button onClick={() => setSelectedItem(item)}>View</button>
      </td>
    </tr>
  );
};

export default MediaRow;
