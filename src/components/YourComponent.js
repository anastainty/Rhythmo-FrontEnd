import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/apiClient.js'; 

const YourComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchData(); 
            setData(result);
        };

        loadData();
    }, []);

    return (
        <div>
            {data ? <div>{JSON.stringify(data)}</div> : <p>Loading...</p>}
        </div>
    );
};

export default YourComponent;
