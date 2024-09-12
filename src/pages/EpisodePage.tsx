import { useSelector } from "react-redux";
import { PagePropsType } from "../App"
import { AppDispatch, RootStateType } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, getData } from "../store/slices/dataSlice";
import LayoutDataGrid from "../components/LayoutDataGrid";
import { EpisodeType } from "../types/dataTypes";
import EpisodeFilters from "../components/Episode/EpisodeFilters";
import EpisodeCard from "../components/Episode/EpisodeCard";
import parseSearch from "../parseSearch";
import Episode from "../components/Episode/Episode";
import useNavigation from "../hooks/useNavigation";
import { Button } from "@mui/material";

export default ({props}: PagePropsType) => {
    const {data} = useSelector((state: RootStateType) => state.data);
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
                <div style = {{display: "flex", justifyContent: "center", marginTop: "35px"}}>
                    <Button sx={{backgroundColor: "#F2F9FE", color: "#2196F3", padding: "10px 28px", boxShadow: "0 6px 10px rgba(0,0,0,0.14)", marginInline: "auto"}} variant="contained" onClick = {() => LoadMore()}>load more</Button>
                </div>
            )}
        </>
    )
}