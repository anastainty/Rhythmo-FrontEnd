export const fetchData = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
