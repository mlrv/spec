import express from "express"
import { SERVER_PORT } from "./env"

export const server = (): Promise<string> => {

  return new Promise(
    (resolve, reject) => {
      const app = express()
      const instance = app.listen(SERVER_PORT)

      app.get("/callback", (req, res) => {
        res.send("")
        instance.close()
        resolve(req.query.code as string) // ?
      })
    }
  )

}