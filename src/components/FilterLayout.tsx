import { FilterList, Search } from "@mui/icons-material";
import { Box, Button, Grid2 as Grid, InputAdornment, MenuItem, Modal, OutlinedInput, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

export default ({filters, search}: {filters: (() => React.ReactNode)[], search: React.ReactNode}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const screenSize = useScreenSize();
    const defaultSize = {lg: 3, md: 4, sm: 6, xs: 12}

    return (
        <>
            <Grid container spacing={2} sx={{maxWidth:"100%", boxSizing: "border-box", marginBottom:"50px"}}>
                {filters.length > 0 ? (
                    <Grid size={defaultSize}>
                        {search}
                    </Grid>
                ) : (
                    <>
                        <Grid size = {{lg: 3, md: 4, sm: 0, xs: 0}}/>
                        <Grid size = {{lg: 6, md: 4, sm: 12, xs: 12}}>
                            {search}
                        </Grid>
                    </>
                )}
                {filters.length > 0 && screenSize.width < 600 ? (
                    <Grid size={defaultSize}>
                        <Button
                            fullWidth 
                            variant="contained" 
                            startIcon={
                                <FilterList/>
                            }
                            endIcon={
                                <FilterList htmlColor="#00000000"/>
                            }
                            sx = {{
                                backgroundColor: "#E3F2FD", 
                                color: "#2196F3", 
                                justifyContent: "space-between", 
                                paddingBlock: "10px"
                            }}
                            onClick={() => setModalOpen(true)}
                        >
                            ADVANCED FILTERS
                        </Button>
                    </Grid>
                    ) : (
                        filters.map((El) => (
                            <Grid size={defaultSize}>
                                <El/>
                            </Grid>
                        ))
                    )
                }
            </Grid>
            {filters.length > 0 && <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx = {{
                    position: 'absolute' as 'absolute',
                    insetInline: "30px",
                    top: '50%',
                    transform: 'translate(0, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Stack spacing={2}>
                        {filters.map((El, index) => (
                            <El key={index}/>
                        ))}
                    </Stack>
                </Box>
            </Modal>}
        </>
    )
}

export function useScreenSize() {
    const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
    useEffect(() => {
        const handleResize = () => setSize({width: window.innerWidth, height: window.innerHeight})
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    })
    return size;
}



export function ModSelect({arr, value, onChange}: {arr: {value: string, text: string}[], value: string, onChange: (e: any) => void}) {
    return (
        <Select
            value={value}
            onChange={onChange}
            fullWidth
            displayEmpty
            sx={{textAlign: "start"}}
        >
            {arr.length > 0 && arr.map((el, index) => (
                <MenuItem value={el.value} key={index}>{el.text}</MenuItem>
            ))}
        </Select>
    )
}

export function SearchInput({value, onChange}: {value: string, onChange: (e:string) => void}) {
    return (
        <OutlinedInput
            id="filter-by-name"
            placeholder="Filter by name..."
            fullWidth
            startAdornment={
                <InputAdornment position="start">
                    <Search/>
                </InputAdornment>
            }
            value={value}
            onChange={(e) => {onChange(e.target.value)}}
        />
    )
}