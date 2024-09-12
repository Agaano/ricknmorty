import { useSelector } from "react-redux";
import { PagePropsType } from "../App"
import { AppDispatch, RootStateType } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, getData } from "../store/slices/dataSlice";
import LayoutDataGrid from "../components/LayoutDataGrid";
import { EpisodeType, LocationType } from "../types/dataTypes";
import EpisodeFilters from "../components/Episode/EpisodeFilters";
import EpisodeCard from "../components/Episode/EpisodeCard";
import parseSearch from "../parseSearch";
import Episode from "../components/Episode/Episode";
import useNavigation from "../hooks/useNavigation";

export default ({props}: PagePropsType) => {
    const {status, data, error} = useSelector((state: RootStateType) => state.data);
    const dispatch: AppDispatch = useDispatch();
    const {navigate} = useNavigation();
    const target = +(parseSearch(props).target)
    useEffect(() => {
        dispatch(clear())
        dispatch(getData({apiType: "episode"}))
    }, [])

    if (!!target && !Number.isNaN(target)) {
        return <Episode id={target}/>
    }

    function LoadMore() {
        if (!!data && !!data.info.next)
            dispatch(getData({apiType: "episode", next: data.info.next}))
    }

    return (
        <>
            <div style = {{display: "flex", width: "100%", justifyContent: "center", marginBottom: "15px"}}>
                <img style ={{maxWidth: "270px", minWidth: "170px", width: "80%", marginInline: "auto"}} src="rick-and-morty2.png"/>
            </div>
            <EpisodeFilters/>
            {data && <LayoutDataGrid spacing={3} arr = {data.results} Callback={({elem}: {elem: EpisodeType}) => (
                <EpisodeCard key={elem.id} episode={elem} onClick={() => {
                    navigate("/episodes?target="+elem.id)
                }}/>
            )}/>}
            {!data || !data.info.next ? "" : (
                <button onClick = {() => LoadMore()}>load more</button>
            )}
        </>
    )
}