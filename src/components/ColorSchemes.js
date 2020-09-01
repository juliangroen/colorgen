import React, { useState, useEffect } from 'react';

const ColorSchemes = ({ file }) => {
    const [colors, setColors] = useState(null);

    // rgbstring to hexstring
    // 255,255,255 to #FFFFFF
    const rgbToHex = (string) => {
        const rgbArray = string.split(',');
        if (rgbArray.length === 4) {
            rgbArray.pop();
        }
        const hexArray = rgbArray.map((value) => {
            const hex = parseInt(value).toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        });
        return ['#', ...hexArray].join('');
    };

    //const pSum1 = p1
    //    .split(',')
    //    .map(Number)
    //    .reduce((sum, val) => sum + val);

    // filters out similar colors using a value tolerance
    const filterColors = (colorArray, lightest, darkest) => {
        const set = [...new Set(colorArray)];
        const filteredColors = set.filter((p1) => {
            const t = 16;
            for (const p2 of set) {
                if (
                    (p2[0] > p1[0] + t || p2[0] < p1[0] - t) &&
                    (p2[1] > p1[1] + t || p2[1] < p1[1] - t) &&
                    (p2[2] > p1[2] + t || p2[2] < p1[2] - t)
                ) {
                    return p1;
                }
            }
        });
        return filteredColors;
    };

    // selects darkest, lightest, and four distinct colors
    const selectScheme = (colorArray) => {
        let darkest = [];
        let lightest = [];
        let distinct = [];

        // find darkest and lightest
        for (const color of colorArray) {
            const values = color.split(',').map(Number);
            const colorSum = values.reduce((sum, val) => sum + val);
            const darkestSum = darkest.length > 0 ? darkest.reduce((sum, val) => sum + val) : null;
            const lightestSum = lightest.length > 0 ? lightest.reduce((sum, val) => sum + val) : null;
            if (darkest.length === 0 && lightest.length === 0) {
                darkest = [...values];
                lightest = [...values];
            } else {
                if (colorSum < darkestSum) {
                    darkest = [...values];
                }
                if (colorSum > lightestSum) {
                    lightest = [...values];
                }
            }
        }
        console.log(darkest);
        console.log(lightest);
    };

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
                    //pixelColors.push(rgbToHex(holder.join(',')));
                    pixelColors.push(holder.join(','));
                    //pixelColors.push(holder);
                    holder = [];
                } else {
                    holder.push(value);
                }
            });
            const filteredColors = filterColors(pixelColors);
            //selectScheme(filteredColors);
            selectScheme(pixelColors);
            const hexArray = filteredColors.map((value) => rgbToHex(value));
            setColors(hexArray);
            console.log(filteredColors);
            // for (const pixel of colorsSet) {
            //     const values = pixel.split(',');
            //     for (const pixel2 of colorsSet) {

            //     }
            // }
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

export default ColorSchemes;
