import { Card, CardActionArea, CardContent } from "@mui/material";
import { LocationType } from "../../types/dataTypes";
import { CardCaption, CardTitle } from "../ModTypography";

export default ({location, onClick}: {location: LocationType, onClick: () => void}) => {
    return (
        <Card sx={{aspectRatio: "240/128", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 2px 5px rgba(0,0,0, 0.4)"}}>
            <CardActionArea sx={{height: "100%"}} onClick={onClick}>
                <CardContent>
                    <CardTitle textAlign="center" text={location.name}/>
                    <CardCaption textAlign="center" text={location.type}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}