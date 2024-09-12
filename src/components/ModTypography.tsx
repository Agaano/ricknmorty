import { Typography } from "@mui/material";

export function CardTitle({text, textAlign, ...args}: {text: string, textAlign: "left" | "center"}) {
    return (
        <Typography variant="h5" fontWeight={500} textAlign={textAlign} {...args}>
            {text}
        </Typography>
    )
}

export function CardCaption({text, textAlign, ...args}: {text: string, textAlign: "left" | "center"}) {
    return (
        <Typography variant="h6" fontWeight={400} textAlign={textAlign} {...args}>
            {text}
        </Typography>
    )
}
