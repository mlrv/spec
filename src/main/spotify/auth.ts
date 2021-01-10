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
    showDialog,
    "token"
  )

  return login.loadURL(authorizeURL)
    .then(
      _ => server()
    )
    .then(
      _ => new Promise<string>(
        (resolve, reject) => login.webContents.on(
          'did-navigate', () => {
            const accessTokenOrNone = getAccessTokenIfPresent(
              login.webContents.getURL()
            )

            return accessTokenOrNone
              ? resolve(accessTokenOrNone)
              : reject("ops")
          }
        )
      )
    )
    .then(
      token => {
        spotifyApi.setAccessToken(token)
        console.log(token)
        login.close()

        // return spotifyApi.authorizationCodeGrant(token)
          // .then(
            // data => {
              // spotifyApi.setAccessToken(data.body.access_token)
              // spotifyApi.setRefreshToken(data.body.refresh_token)
            // }
          // )
      }
    )
}

const getAccessTokenIfPresent = (url: string): string | null => {
  const urlParams = new URLSearchParams(url.slice(url.indexOf("#") + 1))
  return urlParams.get("access_token")
}