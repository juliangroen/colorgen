import React, { useEffect } from 'react';

const ColorScheme = ({ file }) => {
    const generateColors = (file) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const pixels = [];
            let holder = [];
            imageData.map((value, index) => {
                if ((index + 1) % 4 === 0) {
                    holder.push(value);
                    pixels.push(holder);
                    holder = [];
                } else {
                    holder.push(value);
                }
            });
            pixels.map();
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
