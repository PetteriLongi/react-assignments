import { useFile, useMedia } from "../hooks/apiHooks";
import useForm from "../hooks/formHooks";
import { useState } from "react";
import { useNavigate } from "react-router";

const Upload = () => {
  const { postMedia } = useMedia();
  const { uploadFile } = useFile();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const initValues = {
    title: "",
    description: "",
  };

  const doUpload = async (inputs) => {
    const token = localStorage.getItem("token");
    try {
      const results = await uploadFile(file, token);
      const mediaResults = await postMedia(results.data, inputs, token);
      console.log("Upload successful:", mediaResults);
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const { handleInputChange, handleSubmit, inputs } = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (event) => {
    if (event.target.files) {
      console.log("Selected file:", event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : "https://placehold.co/200?text=Choose+image"
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
