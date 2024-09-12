import { Avatar, Box, Button, Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import { useGetElementQuery } from "../../store/slices/elementData";
import { ArrowBack, ArrowForwardIos } from "@mui/icons-material";
import { CharacterType, EpisodeType } from "../../types/dataTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import useNavigation from "../../hooks/useNavigation";

export default ({id}: {id: number}) => {
    const {data, isLoading} = useGetElementQuery({id, type: "character"})
    const character = data as CharacterType;
    const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
    const {navigate} = useNavigation();

    useEffect(() => {
        if (!character) return;
        (async () => {
            const episodes: EpisodeType[] = await Promise.all(character.episode.slice(0,4).map(async (episode) => (await axios.get(episode)).data))
            setEpisodes(episodes)
        })()
    }, [character])

    if (isLoading || !character) {
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
                    navigate("/")
                }}
            >GO BACK</Button>
            <Box sx={{display:"flex", flexDirection:"column",rowGap: "15px", alignItems:"center", marginBottom: "40px"}}>
                <Avatar src={character.image} sx={{aspectRatio: "1/1",width: "30%",minWidth: "150px", maxWidth:"300px", height: "auto"}}/>
                <Typography variant="h3">
                    {character.name}
                </Typography>
            </Box>
            <Grid container rowGap={5}>
                <Grid size = {{lg: 2, xs: 0, md: 2, xl: 2, sm: 0}}>

                </Grid>
                <Grid size = {{lg: 5, xs: 12, md: 5, xl: 5, sm: 12}}>
                    <Typography variant="h6" fontWeight={400} color="#8E8E93" sx={{marginBottom: "30px"}}>
                        Informations
                    </Typography>
                    <Stack spacing={2}>
                        <ListElement caption="Gender" value={character.gender}/>
                        <ListElement caption="Status" value={character.status}/>
                        <ListElement caption="Specie" value={character.species}/>
                        <ListElement caption="Origin" value={character.origin.name}/>
                        <ListElement caption="Type" value={character.type.length > 0 ? character.type : "unknown"}/>
                        <ClickableListElement caption="Location" value={character.location.name} onClick={() => {
                            const splitted = character.location.url.split("/");
                            navigate("/locations?target=" + splitted[splitted.length - 1])
                        }}/>
                    </Stack>
                </Grid>
                <Grid size = {{lg: 5, xs: 12, md: 5, xl: 5, sm: 12}}>
                    <Typography variant="h6" fontWeight={400} color="#8E8E93" sx={{marginBottom: "30px"}}>
                        Episodes
                    </Typography>
                    <Stack spacing={2}>
                        {episodes.length > 0 ? (
                            episodes.map((episode) => (
                                <EpisodeListElement name = {episode.name} air_date={episode.air_date} episode={episode.episode} key = {episode.id} onClick = {() => {
                                    navigate("/episodes?target=" + episode.id)
                                }}/>
                            ))
                        ) : "Loading..."}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

function ListElement({caption, value}: {caption: string, value: string}) {
    return (
        <Box sx={{borderBottom: "1px solid #21212133", width: "90%"}}>
            <Typography fontWeight={700} fontSize={16}>
                {caption}
            </Typography>
            <Typography fontWeight={400} fontSize={14}>
                {value}
            </Typography>
        </Box>
    )
}
function ClickableListElement({caption, value, onClick}: {caption: string, value: string, onClick: () => void}) {
    return (
        <Box sx = {{display: "flex", justifyContent: "space-between", alignItems: "center", width:"90%"}}>
            <Box>
                <Typography fontWeight={700} fontSize={16}>
                    {caption}
                </Typography>
                <Typography fontWeight={400} fontSize={14}>
                    {value}
                </Typography>
            </Box>
            <IconButton onClick={onClick}>
                <ArrowForwardIos fontSize="small"/>
            </IconButton>
        </Box>
    )
}

function EpisodeListElement({episode, name, air_date, onClick}: {episode: string, name: string, air_date: string, onClick: () => void}) {
    return <Box sx = {{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBlock:"10px", borderBottom: "1px solid #21212133"}}>
        <Box>
            <Typography fontWeight={700} fontSize={16}>
                {episode}
            </Typography>
            <Typography fontWeight={400} fontSize={14}>
                {name}
            </Typography>
            <Typography fontWeight={500} fontSize={10} letterSpacing={1.5}>
                {air_date}
            </Typography>
        </Box>
        <IconButton onClick={onClick}>
            <ArrowForwardIos fontSize="small"/>
        </IconButton>
    </Box>
}