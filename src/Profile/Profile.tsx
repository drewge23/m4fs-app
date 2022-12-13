import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../user/userSlice";
import {Navigate} from "react-router-dom";

const Profile: FC = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user)
    const isAuth = useSelector((state: any) => state.user.isAuth);
    if (!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            Profile
            <div>
                <button onClick={() => dispatch(logout())}>Log out</button>
            </div>
            <div>
                <div>
                    {"Login: " + user.login}
                </div>
                <div>
                    {"Email: " + user.email}
                </div>
                <div>
                    {"ID: " + user.id}
                </div>
            </div>
        </div>
    )
}

export default Profile;