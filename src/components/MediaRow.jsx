// src/components/MediaRow.jsx
import { Link } from "react-router";

const MediaRow = (props) => {
  const { item } = props;

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
      <td>{item.username}</td>
      <td>
        <Link to="/single" state={{ item }}>
          Show
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
