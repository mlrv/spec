import express from "express"
import { SERVER_PORT } from "./env"

export const server = (): Promise<void> => {

  return new Promise(
    (resolve, reject) => {
      const app = express()
      const instance = app.listen(SERVER_PORT)

      app.get("/callback", (_, res) => {
        res.send("")
        instance.close()
        resolve()
      })
    }
  )

}