import { useEffect, useState } from "preact/hooks";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import localforage from "localforage";
import * as UUID from "uuid";

// 独言型
type Toot = {
  id: string;
  text: string;
  time: string;
};

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
  const [tootText, setTootText] = useState<string>("");
  const [toots, setToots] = useState<Toot[]>([]);

  // 初期化
  useEffect(() => {
    localforage.getItem<Toot[]>("toots").then((toots) => {
      setToots(toots || []);
    });
  }, [setToots]);

  // 値のアップデート
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTootText((tootText) => e.target.value);
  };

  const handleEcho = () => {
    const id = UUID.v4();
    const time = __getTime();

    // 今回の独言
    const toot = {
      id: id,
      text: tootText,
      time: time,
    };

    // 独言集に追加
    const currentToots = [...toots, toot];
    setToots(currentToots);

    // indexedDBに保存
    localforage.setItem("toots", currentToots);

    // 入力欄をクリア
    setTootText("");
  };

  const handleRm = () => {
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
            bgcolor: "gray",
          }}
        >
          <Typography
            variant="h2"
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
          spacing={3}
          sx={{
            height: "90vh",
            paddingTop: "1rem",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              padding: "1rem",
              borderRight: "1px solid gray",
            }}
          >
            <TextField
              fullWidth
              onChange={handleChange}
              multiline
              value={tootText}
              rows={4}
              sx={{
                paddingBottom: "1rem",
              }}
            />
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                color="primary"
                onClick={handleEcho}
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
          </Grid>
          <Grid item xs={8}>
            {toots.length === 0 ? (
              <Typography
                variant="body1"
                sx={{
                  padding: "1rem",
                  color: "gray",
                  fontFamily: "Kiwi Maru",
                }}
              >
                /dev/nullへのechoがされていないです。
                思いの丈をechoして、嫌になったらrm -rfして下さい。
              </Typography>
            ) : (
              <List
                sx={{
                  padding: "0px",
                  overflow: "auto",
                  maxHeight: "80vh",
                }}
              >
                {toots.map((toot) => {
                  return (
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{
                          fontFamily: "Kiwi Maru",
                        }}
                        primary={toot.text}
                        secondary={toot.time}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
