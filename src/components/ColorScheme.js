import React, { useEffect } from 'react';

const ColorScheme = ({ file }) => {
    const combinePixels = (pixels) => {
        const combined = [];
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
            console.log(pixels);
        };
    };

    useEffect(() => {
        file && generateColors(file);
    }, [file]);

    return (
        <div>
            <canvas>HTML5 canvas not supported in your browser.</canvas>
        </div>
    );
};

export default ColorScheme;
