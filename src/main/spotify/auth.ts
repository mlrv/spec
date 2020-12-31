import SpotifyWebApi from "spotify-web-api-node"
import { BrowserWindow } from "electron"
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

        return spotifyApi.authorizationCodeGrant(token)
          .then(
            data => {
              spotifyApi.setAccessToken(data.body.access_token)
              spotifyApi.setRefreshToken(data.body.refresh_token)
            },
            err => {
              console.error(`Error getting access token. Got ${JSON.stringify(err)}`);
            }
          )
      }
    )
}