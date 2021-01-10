import SpotifyWebApi from "spotify-web-api-node"
import { BrowserWindow } from "electron"
import * as superagent from "superagent"
import { server } from "./server"
import { SCOPES, STATE } from "./env"

const showDialog = true

export const auth = (spotifyApi: SpotifyWebApi): Promise<void> => {
  const login = new BrowserWindow({
    modal: true
  })

  const authorizeURL = spotifyApi.createAuthorizeURL(
    SCOPES,
    STATE,
    showDialog
  )

  return login.loadURL(authorizeURL)
    .then(
      _ => server()
    )
    .then(
      token => {
        login.close()

        return superagent
          .post('localhost:8000/spotify/auth')
          .send({ token })
          .then(
            data => {
              spotifyApi.setAccessToken(data.body.accessToken)
              spotifyApi.setRefreshToken(data.body.refreshToken)
            }
          )
      }
    )
}