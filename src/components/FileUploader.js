import React, { useState } from 'react';

const FileUploader = ({ onChange }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            onChange(selected);
            setFile(selected);
            setError(null);
        } else {
            setFile(null);
            setError('Please select an image (PNG or JPG/JPEG)');
        }
    };

    return (
        <div>
            <form>
                <input type="file" onChange={changeHandler} />
                {error && <div>{error}</div>}
                {file && <div>{file.name}</div>}
            </form>
        </div>
    );
};

export default FileUploader;
