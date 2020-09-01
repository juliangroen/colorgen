import React, { useState, useEffect } from 'react';

const ColorScheme = ({ file }) => {
    const [colors, setColors] = useState(null);

    const combinePixels = (pixels) => {
        const combined = pixels.map((pixel) => {
            const rgbArray = pixel.split(',');
            rgbArray.pop();
            const hexArray = rgbArray.map((value) => {
                const hex = parseInt(value).toString(16);
                return hex.length === 1 ? `0${hex}` : hex;
            });
            return ['#', ...hexArray].join('');
        });
        return combined;
    };

    const generateColors = (file) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
            canvas.width = 32;
            canvas.height = 32;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const pixels = [];
            let holder = [];
            imageData.map((value, index) => {
                if ((index + 1) % 4 === 0) {
                    holder.push(value);
                    pixels.push(holder.join(','));
                    holder = [];
                } else {
                    holder.push(value);
                }
            });
            setColors(combinePixels(pixels));
        };
    };

    useEffect(() => {
        file && generateColors(file);
    }, [file]);

    return (
        <div>
            <canvas>HTML5 canvas not supported in your browser.</canvas>
            <div className="flex flex-wrap max-w-xl">
                {colors &&
                    colors.map((color, index) => {
                        return <div key={index} className="w-4 h-4" style={{ background: color }}></div>;
                    })}
            </div>
        </div>
    );
};

export default ColorScheme;
