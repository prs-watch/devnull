import { render } from "preact";
import { App } from "./app";
// グローバルCSS
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/github.css";
import "./style/main.css";
// fontのグローバルインストール
import "@fontsource/kiwi-maru";
import "@fontsource/amita";

render(<App />, document.body!);
