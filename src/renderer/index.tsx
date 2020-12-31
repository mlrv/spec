import * as React from "react"
import * as ReactDOM from "react-dom"
import * as electron from "electron"
import { useScript } from "./hooks/useScript"
import { useEffect } from "react"
import { player } from "../main/spotify/player"

import "./style.scss"

type AppProps = {
  token: string
}

const App = (props: AppProps) => {
  useScript("https://sdk.scdn.co/spotify-player.js")
  useEffect(() => player(props.token)) 

  return <h1>Hello World</h1>
}

const token = electron.remote.getCurrentWindow().accessToken
ReactDOM.render(<App token={token} />, document.getElementById("app"))