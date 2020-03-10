import { useSelector } from 'react-redux';
import { valueExtractor } from "./depth"

const useStateX = (key) => {
    if (typeof key !== 'string') { throw Error('useStepState: Givin key must be string!'); }
    return useSelector(({ RN }) => valueExtractor(RN, key));
};

const useStepState = (key) => {
    console.warn("useStepState was renamed to 'useStateX'");
    return useStateX(key);
};
export { useStateX, useStepState };
