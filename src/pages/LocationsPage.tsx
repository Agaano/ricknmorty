import { useSelector } from "react-redux";
import { PagePropsType } from "../App"
import { AppDispatch, RootStateType } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, getData } from "../store/slices/dataSlice";
import LayoutDataGrid from "../components/LayoutDataGrid";
import { LocationType } from "../types/dataTypes";
import LocationCard from "../components/Location/LocationCard";
import LocationFilters from "../components/Location/LocationFilters";
import parseSearch from "../parseSearch";
import Location from "../components/Location/Location";
import useNavigation from "../hooks/useNavigation";
import { Button } from "@mui/material";

export default ({props}: PagePropsType) => {
    const {data} = useSelector((state: RootStateType) => state.data);
    const dispatch: AppDispatch = useDispatch();
    const {navigate} = useNavigation();
    const target = +(parseSearch(props).target)
    useEffect(() => {
        dispatch(clear())
        dispatch(getData({apiType: "location"}))
    }, [])

    if (!!target && !Number.isNaN(target)) {
        return <Location id = {target}/>
    }

    function LoadMore() {
        if (!!data && !!data.info.next)
            dispatch(getData({apiType: "location", next: data.info.next}))
    }

    return (
        <>
            <div style = {{display: "flex", width: "100%", justifyContent: "center", marginBottom: "15px"}}>
                <img style ={{maxWidth: "330px", minWidth: "220px", width: "100%", marginInline: "auto"}} src="rick-and-morty.png"/>
            </div>
            <LocationFilters/>
            {data && <LayoutDataGrid spacing={3} arr = {data.results} Callback={({elem}: {elem: LocationType}) => (
                <LocationCard key={elem.id} location={elem} onClick={() => {
                    navigate("/locations?target="+elem.id)
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