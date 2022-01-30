import React,{useRef} from 'react';

const RefAndForwarding = (initialValues) => {
    const [data,setData] = useState(initialValues);
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
           initialValues.current.focus();
        }
    }, [ref]);
    return (
        <>
        
    </>
    );
};

export default RefAndForwarding;
