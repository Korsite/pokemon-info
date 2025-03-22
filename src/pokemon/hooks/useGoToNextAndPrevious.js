import {useState} from "react";

export const useGoToNextAndPrevious = (lastIndex = 0) => {
    const [index, setIndex] = useState(0);
    const safeLastIndex = Math.max(0, Number(lastIndex) || 0);

    const nextIndex = () => {
        setIndex(prev => prev >= safeLastIndex ? 0 : prev + 1);
    };

    const previousIndex = () => {
        setIndex(prev => prev <= 0 ? safeLastIndex : prev - 1);
    };

    return {
        index,
        setIndex,
        nextIndex,
        previousIndex
    };
};