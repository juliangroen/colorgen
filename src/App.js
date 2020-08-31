import React, { useState } from 'react';
import FileUploader from './components/FileUploader';

function App() {
    const [file, setFile] = useState(null);
    const changeHandler = (newFile) => {
        setFile(newFile);
    };

    return (
        <div className="bg-indigo-100 fixed w-full h-full overflow-auto">
            {file && file.type}
            <FileUploader onChange={changeHandler} />
        </div>
    );
}

export default App;
