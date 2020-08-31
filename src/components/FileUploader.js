import React, { useState } from 'react';

const FileUploader = ({ onChange }) => {
    const [file, setFile] = useState(null);

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        onChange(selected);
        setFile(selected);
    };

    return (
        <div>
            <form>
                <input type="file" accept="image/png, image/jpeg" onChange={changeHandler} />
                {file && <div className="text-green-500">{file.name}</div>}
            </form>
        </div>
    );
};

export default FileUploader;
