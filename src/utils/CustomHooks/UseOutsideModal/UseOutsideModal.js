import {useEffect} from "react";

export  function useOnClickOutsideModal(active, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (!active) {
                return;
            }
            handler(e);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [active, handler])
}
