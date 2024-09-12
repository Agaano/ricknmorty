import { Grid2 as Grid } from "@mui/material"

function LayoutDataGrid({arr ,Callback, spacing}: {arr: any[], Callback: ({elem}: {elem: any}) => React.ReactNode, spacing: number}) {
    return (
        <Grid container spacing={spacing} sx={{maxWidth:"100%", boxSizing: "border-box"}}>
            {arr.map((el, index) => <Grid key={index} size={{lg: 3, md: 4, sm: 6, xs: 12}}>
                <Callback elem={el}/>
            </Grid>)}
        </Grid>
    )
}

export default LayoutDataGrid;