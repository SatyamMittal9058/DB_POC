import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Ongoingpositions from './Ongoingpositions';
function Position() {
    const [positions, setPositions] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies('token');
    const openPositions = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/openpositions`;
        const options = {
            method: 'GET',
            headers: {
                "access-token": cookies.token,
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            // console.log(data.data);
            setPositions(data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        openPositions();
        const interval = setInterval(() => {
            openPositions();
        }, 5000);
        return ()=>{
            clearInterval(interval);
        }
    }, [])
    return Array.isArray(positions)===false?<h1>Token Invalid</h1>:(
        <div>
            <h2>Positions</h2>
            <Ongoingpositions positions={positions} loading={loading} />
        </div>
    )
}
export default Position;