import { useEffect, useState } from "preact/hooks";
import {
    Container,
    CssBaseline,
    Grid,
    Typography,
    Divider,
} from "@mui/material";
import { InputArea } from "./components/InputArea";
import { OutputArea } from "./components/OutputArea";

import localforage from "localforage";
import * as UUID from "uuid";
import { Toot } from "./types/Toot";

// indexedDBのグローバルconfig
localforage.config({
    driver: localforage.INDEXEDDB,
    name: "devnull",
    storeName: "devnull",
    version: 1.0,
    description: "独言を保存するDB",
});

// Utilメソッド
const __getTime = (): string => {
    const date = new Date();
    return (
        date.getFullYear() +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2) +
        "." +
        date.getMilliseconds()
    );
};

export function App() {
    const [toots, setToots] = useState<Toot[]>([]);

    useEffect(() => {
        localforage.getItem<Toot[]>("toots").then((toots) => {
            setToots(toots || []);
        });
    }, [setToots]);

    const handleEcho = (text: string) => {
        const id = UUID.v4();
        const time = __getTime();

        const toot = {
            id: id,
            text: text,
            time: time,
        };

        const currentToots = [...toots, toot];
        setToots(currentToots);

        localforage.setItem("toots", currentToots);
    };

    const handleDialogExecute = () => {
        setToots([]);
        localforage.removeItem("toots");
    };

    return (
        <Container
            sx={{
                height: "100%",
            }}
        >
            <CssBaseline />
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        bgcolor: "black",
                    }}
                >
                    <Typography
                        variant="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "Amita",
                            color: "white",
                        }}
                    >
                        /dev/null
                    </Typography>
                </Grid>
                <Grid
                    container
                    sx={{
                        height: "90vh",
                    }}
                >
                    <Grid item xs={12}>
                        <InputArea
                            handleEcho={handleEcho}
                            handleDialogExecute={handleDialogExecute}
                        />
                        <Divider textAlign="center">
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: "Kiwi Maru",
                                }}
                            >
                                LTL
                            </Typography>
                        </Divider>
                        <OutputArea toots={toots} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
