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

    const rgbToSum = (string) => {
        const colorSum = string
            .split(',')
            .map(Number)
            .reduce((sum, val) => sum + val);
        return colorSum;
    };

    const filterSection = (colorArray) => {
        //const avg = colorArray.map((val) => rgbToSum(val)).reduce((sum, val) => sum + val); // / colorArray.length;
        const filtered = colorArray.filter((val) => {
            const sum = rgbToSum(val);
            const t = 150;
            for (const val2 of colorArray) {
                const sum2 = rgbToSum(val2);
                if (sum > sum2 + t || sum < sum2 - t) {
                    return val;
                }
            }
        });
        return filtered;
    };

    // selects darkest and lightest colors.
    const findLightestDarkest = (colorArray) => {
        let lightest = [];
        let darkest = [];

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
        return { lightest, darkest };
    };

    const filterColors = (colorArray) => {
        const set = [...new Set(colorArray)];
        //const filteredColors = set.filter((p1) => {
        //    const t = 16;
        //    for (const p2 of set) {
        //        if (
        //            (p2[0] > p1[0] + t || p2[0] < p1[0] - t) &&
        //            (p2[1] > p1[1] + t || p2[1] < p1[1] - t) &&
        //            (p2[2] > p1[2] + t || p2[2] < p1[2] - t)
        //        ) {
        //            return p1;
        //        }
        //    }
        //});
        // 511 - 765
        const high = 765;
        const highArray = [];
        // 255 - 510
        const mid = 510;
        const midArray = [];
        // 0 - 254
        const low = 254;
        const lowArray = [];

        // divide colors into low/med/high
        for (const color of colorArray) {
            const colorSum = rgbToSum(color);

            if (colorSum > mid && colorSum < high) {
                highArray.push(color);
            } else if (colorSum > low && colorSum < mid) {
                midArray.push(color);
            } else if (colorSum >= 64 && colorSum < low) {
                lowArray.push(color);
            }
        }
        const filteredHigh = filterSection(highArray);
        const filteredMid = filterSection(midArray);
        const filteredLow = filterSection(lowArray);

        const combined = [...filteredHigh, ...filteredMid, ...filteredLow];
        const { lightest, darkest } = findLightestDarkest(combined);

        const filteredColors =
            set.length <= 6
                ? [...set]
                : [
                      lightest.join(','),
                      filteredHigh[0],
                      filteredHigh[filteredHigh.length - 1],
                      filteredMid[0],
                      filteredMid[filteredMid.length - 1],
                      filteredLow[0],
                      filteredLow[filteredLow.length - 1],
                      darkest.join(','),
                  ];

        return filteredColors;
    };

    const generateColors = (image) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = window.URL.createObjectURL(image);
        img.onload = () => {
            canvas.width = 64;
            canvas.height = 64;
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
            console.log(filteredColors);
            const hexArray = filteredColors.map((value) => rgbToHex(value));
            setColors(hexArray);
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
                        return <div key={index} className="w-16 h-64" style={{ background: color }}></div>;
                    })}
            </div>
        </div>
    );
};

export default ColorSchemes;
