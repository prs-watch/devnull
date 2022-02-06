import {
    Typography,
    List,
    Slide,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { Toot } from "../types/Toot";

type Props = {
    toots: Toot[];
};

export const OutputArea = (props: Props) => {
    return props.toots.length === 0 ? (
        <Typography
            variant="body1"
            sx={{
                padding: "1rem",
                color: "gray",
                fontFamily: "Kiwi Maru",
            }}
        >
            思いの丈をechoして、嫌になったらrm -rfしてくれよ。
        </Typography>
    ) : (
        <List
            sx={{
                padding: "0px",
                overflow: "auto",
                maxHeight: "80vh",
            }}
        >
            {props.toots.map((toot) => {
                return (
                    <>
                        <Slide direction="right" in>
                            <ListItem
                                alignItems="flex-start"
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "whitesmoke",
                                    },
                                }}
                            >
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontFamily: "Kiwi Maru",
                                    }}
                                    primary={toot.text}
                                    secondary={toot.time}
                                />
                            </ListItem>
                        </Slide>
                        <Divider />
                    </>
                );
            })}
        </List>
    );
};
