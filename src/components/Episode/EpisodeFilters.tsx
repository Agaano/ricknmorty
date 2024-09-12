import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { clear, getData } from "../../store/slices/dataSlice";
import { AppDispatch } from "../../store/store";
import FilterLayout, { SearchInput } from "../FilterLayout";

export default () => {
    const [search, setSearch] = useState("");
    const dispatch:AppDispatch = useDispatch();
    
    useEffect(() => {
        dispatch(clear())
        dispatch(getData({apiType: "episode", search: {name: search}}))
    }, [search])

    return (
        <>
            <FilterLayout search={
                <SearchInput value = {search} onChange={(value) => setSearch(value)}/>
            } filters={[]}/>
        </>
    )
}