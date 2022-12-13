import {FC} from "react";
import {useSelector} from "react-redux";

const Profile: FC = () => {
    const firstName = useSelector((state: any) => state.user.firstName)
    const lastName = useSelector((state: any) => state.user.lastName)
    const country = useSelector((state: any) => state.user.country)

    return (
        <div>
            Profile
            <div>
                <div>
                    {firstName + "  " + lastName}
                </div>
                <div>
                    {"Country: " + country}
                </div>
            </div>
        </div>
    )
}

export default Profile;