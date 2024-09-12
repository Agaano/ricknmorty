import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { useDispatch } from "react-redux";
import { navigate } from "../store/slices/navSlice";

export default function useNavigation() {
    const navigation = useSelector((state: RootStateType) => state.navigation)
    const dispatch = useDispatch();

    return {navigation, navigate: (path: string, body?: any) => {
        dispatch(navigate({path,body}))
    }}
}