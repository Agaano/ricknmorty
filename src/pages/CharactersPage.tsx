import { useSelector } from "react-redux";
import { PagePropsType } from "../App"
import { AppDispatch, RootStateType } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, getData } from "../store/slices/dataSlice";
import LayoutDataGrid from "../components/LayoutDataGrid";
import { CharacterType } from "../types/dataTypes";
import CharacterCard from "../components/Character/CharacterCard";
import CharacterFilters from "../components/Character/CharacterFilters";
import parseSearch from "../parseSearch";
import Character from "../components/Character/Character";
import useNavigation from "../hooks/useNavigation";
import { Button } from "@mui/material";

export default ({props}: PagePropsType) => {
    const {data} = useSelector((state: RootStateType) => state.data);
    const dispatch: AppDispatch = useDispatch();
    const {navigate, navigation} = useNavigation();
    const target = +(parseSearch(props).target)
    
    useEffect(() => {
        if (!!target && !Number.isNaN(target)) return;
        dispatch(clear())
        dispatch(getData({apiType: "character"}))
    }, [])

    if (!!target && !Number.isNaN(target)) {
        return <Character id = {target}/>
    }

    function LoadMore() {
        if (!!data && !!data.info.next)
            dispatch(getData({apiType: "character", next: data.info.next}))
    }

    return (
        <>
            <div style = {{display: "flex", width: "100%", justifyContent: "center", marginBottom: "15px"}}>
                <img style ={{maxWidth: "600px", minWidth: "300px", width: "100%", marginInline: "auto"}} src="characterPageImage.png"/>
            </div>
            <CharacterFilters/>
            {data && <LayoutDataGrid spacing={3} arr = {data.results} Callback={({elem}: {elem: CharacterType}) => (
                <CharacterCard key={elem.id} character={elem} onClick={() => {
                    console.log(navigation.currentUrl)
                    navigate(`${navigation.currentUrl}?target=${elem.id}`)
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