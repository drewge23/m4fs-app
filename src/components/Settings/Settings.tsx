import {FC} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Settings: FC = () => {
    const isAuth = useSelector((state: any) => state.user.isAuth);
    if (!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            Settings
        </div>
    )
}

export default Settings;