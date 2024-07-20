import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function UploadFile({ setFile, file }) {
  const [fileName, setFileName] = useState('No se ha seleccionado un archivo');

  return (
    <div
      onClick={() => document.querySelector('input[type="file"]').click()}
      className="flex flex-col justify-center items-center border-dashed border-2 border-primary w-full h-[200px] cursor-pointer rounded-md shadow-md"
    >
      <input type="file" accept="image/*" hidden
        onChange={({ target: { files } }) => {
          if (files[0]) {
            setFileName(files[0].name);
            setFile(files[0]);
          }
        }}
      />
      {file ? (
        <img src={URL.createObjectURL(file)} className="w-[150px] max-h-[200px]" alt="Preview" />
      ) : (
        <>
          <FaCloudUploadAlt className="text-3xl" />
          <p className="text-primary font-semibold">{fileName}</p>
        </>
      )}
    </div>
  );
}

export default UploadFile;
