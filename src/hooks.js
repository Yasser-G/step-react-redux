import { useSelector } from 'react-redux';
import { valueExtractor } from "./depth"

const useStateX = (key, fallback = null) => {
    if (typeof key !== 'string') { throw Error('useStepState: Givin key must be string!'); }
    return useSelector(({ Step }) => {
        const value = valueExtractor(Step, key)
        return value || fallback;
    });
};

const useStepState = (key, fallback = null) => {
    console.warn("useStepState was renamed to 'useStateX'");
    return useStateX(key, fallback);
};
export { useStateX, useStepState };
