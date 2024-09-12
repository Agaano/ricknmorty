import { Box, Button, Typography } from "@mui/material";
import { useGetElementQuery } from "../../store/slices/elementData";
import { ArrowBack } from "@mui/icons-material";
import { CharacterType, EpisodeType } from "../../types/dataTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import useNavigation from "../../hooks/useNavigation";
import LayoutDataGrid from "../LayoutDataGrid";
import CharacterCard from "../Character/CharacterCard";

export default ({id}: {id: number}) => {
    const {data, isLoading} = useGetElementQuery({id, type: "episode"})
    const episode = data as EpisodeType;
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const {navigate} = useNavigation();

    useEffect(() => {
        if (!episode) return;
        (async () => {
            const characters: CharacterType[] = await Promise.all(episode.characters.slice(0,4).map(async (character) => (await axios.get(character)).data))
            setCharacters(characters)
        })()
    }, [episode])

    if (isLoading || !episode) {
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
                    {episode.name}
                </Typography>
                <Box sx={{display: "flex", minWidth: "200px", maxWidth:"600px", marginInline: "auto", marginTop: "25px"}}>
                    <ListElement caption="Episode" value={episode.episode}/>
                    <ListElement caption="Date" value={episode.air_date}/>
                </Box>
                <Box sx={{marginTop: "65px"}}>
                    <Typography variant="h6" fontWeight={400} color="#8E8E93" sx={{marginBottom: "30px"}}>
                        Cast
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