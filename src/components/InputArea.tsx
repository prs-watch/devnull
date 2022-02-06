import { useEffect, useState } from "preact/hooks";
import {
    Container,
    TextField,
    Stack,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    handleEcho: (text: string) => void;
    handleDialogExecute: () => void;
};

export const InputArea = (props: Props) => {
    const [tootText, setTootText] = useState<string>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleKeyEvent = (e: KeyboardEvent) => {
        if (e.shiftKey) {
            if (e.key === "Enter") {
                document.getElementById("echoButton")!.click();
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTootText(() => e.target.value);
    };

    const handleRm = () => {
        setOpenDialog(true);
    };

    const childHandleEcho = (
        handleEcho: (text: string) => void,
        tootText: string
    ) => {
        handleEcho(tootText);
        setTootText("");
    };

    const childHandleDialogExecute = (handleDialogExecute: () => void) => {
        handleDialogExecute();
        setOpenDialog(false);
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyEvent, false);
    });

    return (
        <Container
            sx={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <TextField
                variant="standard"
                fullWidth
                onChange={handleChange}
                multiline
                value={tootText}
                rows={4}
                placeholder="思いの丈をechoしてくれよ"
                sx={{
                    paddingBottom: "1rem",
                    fontFamily: "Kiwi Maru",
                }}
                inputProps={{
                    style: {
                        fontFamily: "Kiwi Maru",
                    },
                }}
            />
            <Stack spacing={1} direction="row">
                <Button
                    id="echoButton"
                    disabled={tootText ? false : true}
                    variant="contained"
                    color="primary"
                    onClick={() => childHandleEcho(props.handleEcho, tootText)}
                    startIcon={<CreateIcon />}
                >
                    echo
                </Button>
                <Button
                    onClick={handleRm}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                >
                    rm -rf
                </Button>
            </Stack>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogContent
                    sx={{
                        fontFamily: "Kiwi Maru",
                    }}
                >
                    思いの丈は消え去ります。本当に消しますか？
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            childHandleDialogExecute(props.handleDialogExecute)
                        }
                        color="error"
                        sx={{
                            fontFamily: "Kiwi Maru",
                        }}
                    >
                        削除
                    </Button>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        color="primary"
                        sx={{
                            fontFamily: "Kiwi Maru",
                        }}
                    >
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
