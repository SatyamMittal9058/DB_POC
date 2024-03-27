import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import dashboard from '../css/Dashboard.module.css';
import Position from "./Position";
import BuySellCard from "./BuySellCard";
function Dashboard() {
    const [cookies, , removeCookie] = useCookies('token');
    if (cookies.token === "") return <Navigate to={'/'}></Navigate>;
    return (
        <div className={dashboard.container}>
            <div className={dashboard.header}>
                <h1>DashBoard</h1>
                <button className={dashboard.btn} onClick={() => removeCookie('token')}>Logout</button>
            </div>
            <Position/>
            <BuySellCard/>
        </div>
    )
}
export default Dashboard;