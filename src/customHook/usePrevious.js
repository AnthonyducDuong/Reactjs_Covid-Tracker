import React, {
    useEffect,
    useRef
} from 'react';

usePrevious.propTypes = {

};

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default usePrevious;