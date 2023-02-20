import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../BLL/junk/userSlice";
import {Navigate, NavLink} from "react-router-dom";

const Profile: FC = () => {
    const globalProgress = useSelector((state: any) => state.globalProgress)
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
                <p>{'lessons completed = ' + globalProgress.lessonsTotal}</p>
                <p>{'bonus lessons completed = ' + globalProgress.bonusLessonsTotal}</p>
            </div>
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
            <NavLink to={"/"}>
                Back
            </NavLink>
        </div>
    )
}

export default Profile;