import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material"
import { CharacterType } from "../../types/dataTypes"
import { CardCaption, CardTitle } from "../ModTypography"
export default ({character, onClick}: {character: CharacterType, onClick: () => void}) => {
    return (
        <Card>
            <CardActionArea onClick={() => {onClick()}}>
                <CardMedia 
                    component="img"
                    sx={{aspectRatio:"240/168"}}
                    image={character.image}
                />
                <CardContent>
                    <CardTitle textAlign="left" text={character.name}/>
                    <CardCaption textAlign="left" text={character.species}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}