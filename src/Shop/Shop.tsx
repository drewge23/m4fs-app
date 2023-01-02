import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {spend} from "../user/moneySlice";
import useSound from 'use-sound';
// @ts-ignore
import coinSound from '../sounds/coin.mp3';
import {NavLink} from "react-router-dom";

const Shop: FC = () => {
    const dispatch = useDispatch();
    const money = useSelector((state: any) => state.money)

    const [playCoinSound] = useSound(coinSound);

    return (
        <div>
            Shop
            <div>
                {money + '$'}
                <div>
                    <button onClick={() => {
                        if (money >= 1) {
                            dispatch(spend(1));
                            playCoinSound()
                            console.log('money well-spent!')
                        } else {
                            alert('not enough money')
                        }
                    }}> spend! </button>
                </div>
            </div>
            <NavLink to={"/"}>
                Back
            </NavLink>
        </div>
    )
}

export default Shop;