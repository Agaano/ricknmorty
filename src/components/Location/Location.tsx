import { Box, Button, Typography } from "@mui/material";
import { useGetElementQuery } from "../../store/slices/elementData";
import { ArrowBack } from "@mui/icons-material";
import { CharacterType, LocationType } from "../../types/dataTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import useNavigation from "../../hooks/useNavigation";
import LayoutDataGrid from "../LayoutDataGrid";
import CharacterCard from "../Character/CharacterCard";

export default ({id}: {id: number}) => {
    const {data, isLoading} = useGetElementQuery({id, type: "location"})
    const location = data as LocationType;
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const {navigate} = useNavigation();

    useEffect(() => {
        if (!location) return;
        (async () => {
            const characters: CharacterType[] = await Promise.all(location.residents.slice(0,4).map(async (character) => (await axios.get(character)).data))
            setCharacters(characters)
        })()
    }, [location])

    if (isLoading || !location) {
        return "Loading..."
    }

    return (
        <Box sx = {{width: "100%", justifyContent: "start"}}>
                <Button 
                    color="inherit"
                    startIcon={
                        <ArrowBack/>
                    }
                    onClick={() => {
                        navigate("/episodes")
                    }}
                >GO BACK</Button>
                <Typography textAlign={"center"} variant="h3">
                    {location.name}
                </Typography>
                <Box sx={{display: "flex", minWidth: "200px", maxWidth:"600px", marginInline: "auto", marginTop: "25px"}}>
                    <ListElement caption="Type" value={location.type}/>
                    <ListElement caption="Dimension" value={location.dimension}/>
                </Box>
                <Box sx={{marginTop: "65px"}}>
                    <Typography variant="h6" fontWeight={400} color="#8E8E93" sx={{marginBottom: "30px"}}>
                        Residents
                    </Typography>
                    {characters.length > 0 ? <LayoutDataGrid spacing={3} arr={characters} Callback={({elem}: {elem: CharacterType}) => (
                        <CharacterCard character={elem} onClick={() => {
                            navigate("/?target=" + elem.id)
                        }} key={elem.id}/>
                    )}/> : "Loading..."}
                </Box>
        </Box>
    )
}

function ListElement({caption, value}: {caption: string, value: string}) {
    return (
        <Box sx={{width: "100%", padding: "10px"}}>
            <Typography fontWeight={700} fontSize={16}>
                {caption}
            </Typography>
            <Typography fontWeight={400} fontSize={14}>
                {value}
            </Typography>
        </Box>
    )
}