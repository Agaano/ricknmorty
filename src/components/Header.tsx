import { Close, Menu } from "@mui/icons-material";
import useNavigation from "../hooks/useNavigation";
import { useScreenSize } from "./FilterLayout";
import { Box, Button, Drawer, IconButton, Stack } from "@mui/material";
import { useState } from "react";

export default () => {
    const {navigate} = useNavigation();
    const screenSize = useScreenSize();
    const [burgerOpen, setBurgerOpen] = useState(false);

    return (
        <>
            <div style={{
                width: "100%",
                height: "80px"
            }}/>
            <header style = {{
                width: "100%", 
                backgroundColor: "#fff",
                boxShadow:"0 3px 5px #20202030", 
                height: "60px",
                position: "absolute",
                minWidth: "320px",
                top: 0,
                left: 0,
                zIndex: 1281,
            }}>
                <div style = {{
                    width:"100%",
                    height: "100%",
                    maxWidth: "1280px",
                    minWidth: "320px",
                    marginInline: "auto",
                    paddingInline: "25px",
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <img src="logo.png"/>
                    {screenSize.width > 600 ? <div style = {{display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "25px", fontSize: "18px", color:"#000"}}>
                        <a onClick={(e) => {e.preventDefault(); navigate("/")}} href="/">Characters</a>
                        <a onClick={(e) => {e.preventDefault(); navigate("/locations")}} href="/locations">Locations</a>
                        <a onClick={(e) => {e.preventDefault(); navigate("/episodes")}} href="/episodes">Episodes</a>
                    </div> : 
                        <IconButton onClick={() => setBurgerOpen(prev => !prev)}>
                            {burgerOpen ? <Close/> : <Menu/>}
                        </IconButton>
                    }
                </div>
            </header>
            <Drawer open={burgerOpen} onClose={() => setBurgerOpen(false)} sx={{zIndex: 1}}>
                <Box sx={{width: "100vw", height: "100%", paddingTop: "110px" ,backgroundColor: "#fff", display: "flex", justifyContent: "center", fontSize: "24px"}}>
                    <Stack spacing={6} sx={{textAlign:"center"}}>
                        <a onClick={(e) => {e.preventDefault(); setBurgerOpen(false); navigate("/")}} href="/">Characters</a>
                        <a onClick={(e) => {e.preventDefault(); setBurgerOpen(false); navigate("/locations")}} href="/locations">Locations</a>
                        <a onClick={(e) => {e.preventDefault(); setBurgerOpen(false); navigate("/episodes")}} href="/episodes">Episodes</a>
                    </Stack>
                </Box>
            </Drawer>
        </>
    )
}