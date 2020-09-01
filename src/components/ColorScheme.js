import React, { useState, useEffect } from 'react';

const ColorScheme = ({ file }) => {
    const [colors, setColors] = useState(null);

    const generateColors = (image) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = window.URL.createObjectURL(image);
        img.onload = () => {
            canvas.width = 32;
            canvas.height = 32;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let holder = [];
            const pixelColors = [];
            imageData.map((value, index) => {
                if ((index + 1) % 4 === 0) {
                    holder.push(value);
                    const hexArray = holder.map((value) => {
                        const hex = parseInt(value).toString(16);
                        return hex.length === 1 ? `0${hex}` : hex;
                    });
                    hexArray.pop();
                    pixelColors.push(['#', ...hexArray].join(''));
                    //pixels.push(holder.join(','));
                    holder = [];
                } else {
                    holder.push(value);
                }
            });
            setColors(pixelColors);
        };
    };

    useEffect(() => {
        file && generateColors(file);
    }, [file]);

    return (
        <div>
            <canvas>HTML5 canvas not supported in your browser.</canvas>
            <div className="flex flex-wrap max-w-lg">
                {colors &&
                    colors.map((color, index) => {
                        return <div key={index} className="w-4 h-4" style={{ background: color }}></div>;
                    })}
            </div>
        </div>
    );
};

export default ColorScheme;
