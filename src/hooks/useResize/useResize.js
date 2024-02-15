import { useState, useEffect } from "react";

export default function useResize () {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=> {
        const resizeHandler = (event) => {
            setWidth(event.target.innerWidth);
        }
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])    

    return width
}