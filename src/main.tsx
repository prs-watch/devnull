import { render } from "preact";
import { App } from "./app";
// グローバルCSS
import "./style/main.css";
// fontのグローバルインストール
import "@fontsource/kiwi-maru";
import "@fontsource/amita";

render(<App />, document.body!);
