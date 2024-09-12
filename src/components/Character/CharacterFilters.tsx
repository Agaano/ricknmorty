import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { clear, getData } from "../../store/slices/dataSlice";
import { AppDispatch } from "../../store/store";
import FilterLayout, { ModSelect, SearchInput } from "../FilterLayout";


type CharacterFilter = {
    name: string,
    species: string,
    gender: "" | "male" | "female" | "genderless" | "unknown",
    status: "" | "Alive" | "Dead" | "unknown"
}

export default () => {
    const [filterBy, setFilterBy] = useState<CharacterFilter>({
        name: "",
        species: "",
        gender: "",
        status: ""
    })
    const dispatch:AppDispatch = useDispatch();
    
    useEffect(() => {
        dispatch(clear())
        dispatch(getData({apiType: "character", search: filterBy}))
    }, Object.values(filterBy))

    const filters = [
        () => <ModSelect arr={[
            {value: "", text: "Gender"},
            {value: "male", text: "Male"},
            {value: "female", text: "Female"},
            {value: "genderless", text: "Genderless"},
            {value: "unknown", text: "Unknown"},
        ]} value={filterBy.gender} onChange={e => setFilterBy((prev) => ({...prev, gender: e.target.value}))}/>,
        () => <ModSelect arr={[
            {value: "", text: "Species"},
            {value: "Human", text: "Human"},
            {value: "Alien", text: "Alien"},
            {value: "unknown", text: "Unknown"},
        ]} value={filterBy.species} onChange={e => setFilterBy((prev) => ({...prev, species: e.target.value}))}/>,
        () => <ModSelect arr={[
            {value: "", text: "Status"},
            {value: "Alive", text: "Alive"},
            {value: "Dead", text: "Dead"},
            {value: "unknown", text: "Unknown"},
        ]} value={filterBy.status} onChange={e => setFilterBy((prev) => ({...prev, status: e.target.value}))}/>
    ]

    return (
        <>
            <FilterLayout search={
                <SearchInput value = {filterBy.name} onChange={(value) => setFilterBy(prev => ({...prev, name: value}))}/>
            } filters={filters}/>
        </>
    )
}