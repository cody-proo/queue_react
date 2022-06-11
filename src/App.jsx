import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("image", selectedFile);
      console.log(selectedFile);
      axios
        .patch(
          "http://localhost:4000/scene/upload/62a058191d00eba486b2459e",
          formdata
        )
        .then(({ data }) => {
          console.log(data);
          setSelectedFile(undefined);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (files.length > 0 && start) {
        const filesCollection = [...files];
        filesCollection.shift();
        setSelectedFile(filesCollection[0]);
        setFiles(filesCollection);
      }
    }
  }, [files, selectedFile, start]);

  const onClickFile = () => {
    if (!selectedFile && files.length > 0) {
      setSelectedFile(files[0]);
      setStart(true);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button type="button" onClick={onClickFile}>
        Send File
      </button>
      {JSON.stringify(selectedFile)}
    </div>
  );
};

export default App;
