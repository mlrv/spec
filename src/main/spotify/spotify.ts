import SpotifyWebApi from "spotify-web-api-node"
import { CLIENT_ID, REDIRECT_URI } from "./env"

export const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI
})