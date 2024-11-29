import { logoutUser } from "../services/auth"; 


const LogoutButton = ({ setUser }) => {


    const handleLogout = async () => {
        try {
            await logoutUser(); 
            setUser(null); 
        } catch (error) {
            console.error("Error at logout:", error.message);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
