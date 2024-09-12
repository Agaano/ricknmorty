import { Card, CardActionArea, CardContent } from "@mui/material";
import { EpisodeType } from "../../types/dataTypes";
import { CardCaption, CardTitle } from "../ModTypography";

export default ({episode, onClick}: {episode: EpisodeType, onClick: () => void}) => {
    return (
        <Card sx={{aspectRatio: "240/128", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 2px 5px rgba(0,0,0, 0.4)"}}>
            <CardActionArea sx={{height: "100%"}} onClick={onClick}>
                <CardContent>
                    <CardTitle textAlign="center" text={episode.name}/>
                    <CardCaption textAlign="center" text={episode.air_date}/>
                    <CardCaption textAlign="center" text={episode.episode}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}