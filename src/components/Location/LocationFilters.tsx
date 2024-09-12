import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { clear, getData } from "../../store/slices/dataSlice";
import { AppDispatch } from "../../store/store";
import FilterLayout, { ModSelect, SearchInput } from "../FilterLayout";


type CharacterFilter = {
    name: string,
    type: string,
    dimension: string,
}

export default () => {
    const [filterBy, setFilterBy] = useState<CharacterFilter>({
        name: "",
        type: "",
        dimension: "",
    })
    const dispatch:AppDispatch = useDispatch();
    
    useEffect(() => {
        dispatch(clear())
        dispatch(getData({apiType: "location", search: filterBy}))
    }, Object.values(filterBy))

    const filters = [
        () => <ModSelect arr={[
            {value: "", text: "Type"},
            {value: "Planet", text: "Planet"},
            {value: "Cluster", text: "Cluster"},
            {value: "Space station", text: "Space Station"},
            {value: "Microverse", text: "Microverse"},
        ]} value={filterBy.type} onChange={e => setFilterBy((prev) => ({...prev, type: e.target.value}))}/>,
        () => <ModSelect arr={[
            {value: "", text: "Dimension"},
            {value: "Dimension C-137", text: "Dimension C-137"},
            {value: "Replacement Dimension", text: "Replacement Dimension"},
            {value: "unknown", text: "Unknown"},
        ]} value={filterBy.dimension} onChange={e => setFilterBy((prev) => ({...prev, dimension: e.target.value}))}/>
    ]

    return (
        <>
            <FilterLayout search={
                <SearchInput value = {filterBy.name} onChange={(value) => setFilterBy(prev => ({...prev, name: value}))}/>
            } filters={filters}/>
        </>
    )
}