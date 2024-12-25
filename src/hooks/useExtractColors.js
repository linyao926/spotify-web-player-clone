import { useState, useEffect } from "react";
import { extractColors } from "extract-colors";

const useExtractColors = (coverUrl) => {
    const [colorPalettes, setColorPalettes] = useState(null);
    const [backgroundBase, setBackgroundBase] = useState(null);

    const getBrightness = (color) => {
        return (0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;
    };

    const adjustBrightness = (color, factor) => {
        return {
            red: Math.min(255, color.red + (255 - color.red) * factor),
            green: Math.min(255, color.green + (255 - color.green) * factor),
            blue: Math.min(255, color.blue + (255 - color.blue) * factor),
        };
    };

    const findReadableColor = (colors) => {
        const MIN_BRIGHTNESS = 0.2; 
        const MAX_BRIGHTNESS = 0.7; 

        const getAdjustedColor = (color) => {
            const brightness = getBrightness(color);
            const factor = brightness < MIN_BRIGHTNESS ? 0.5 : -0.5; 
            return adjustBrightness(color, factor);
        };
    
        const filteredColors = colors.filter((color) => {
            const brightness = getBrightness(color);
            return brightness >= MIN_BRIGHTNESS && brightness <= MAX_BRIGHTNESS;
        });
        
        const chosenColor = filteredColors.length
        ? filteredColors.reduce((dominant, color) =>
            color.intensity > dominant.intensity ? color : dominant)
        : colors.reduce((dominant, color) =>
            color.intensity > dominant.intensity ? color : dominant);

        const chosenBrightness = getBrightness(chosenColor);

        return chosenBrightness < MIN_BRIGHTNESS || chosenBrightness > MAX_BRIGHTNESS
        ? { ...chosenColor, ...getAdjustedColor(chosenColor) }
        : chosenColor;
    };

    useEffect(() => {
        if (coverUrl) {
        extractColors(coverUrl)
            .then((colors) => {
                setColorPalettes(colors);
            })
            .catch((error) => {
                console.error("Error extracting colors:", error);
            });
        }
    }, [coverUrl]);

    useEffect(() => {
        if (colorPalettes) {
            // console.log(colorPalettes)
            const dominantColor = findReadableColor(colorPalettes);
            setBackgroundBase(dominantColor.hex);
            // setBackgroundBase('#cf4e49')
            // setBackgroundBase("#0b265d")
            // setBackgroundBase("#086898")
        }
    }, [colorPalettes]);

    return { colorPalettes, backgroundBase };
};

export default useExtractColors;
