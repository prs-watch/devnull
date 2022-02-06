import { useEffect } from "preact/hooks";
import {
    Typography,
    List,
    Slide,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { Toot } from "../types/Toot";
import ReactMarkdown from "react-markdown";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import ruby from "highlight.js/lib/languages/ruby";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";

type Props = {
    toots: Toot[];
};

hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);

export const OutputArea = (props: Props) => {
    useEffect(() => {
        hljs.initHighlighting();
    });

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
                                    classes={{ root: "markdown-body" }}
                                    primaryTypographyProps={{
                                        fontFamily: "Kiwi Maru",
                                    }}
                                    primary={
                                        <ReactMarkdown>
                                            {toot.text}
                                        </ReactMarkdown>
                                    }
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
