import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.username === '') {
      res.status(200).json({ ok: false, issue: "Can't make an account with an empty username"})
      return
    } else if (req.body.password === '') {
      res.status(200).json({ ok: false, issue: "Can't make an account with an empty password"})
      return
    } else {
      const path = join('logins', req.body.username)
      try {
        await readFile(path)
        res.status(200).json({ ok: false, issue: "Can't make an account with an already used username"})
      } catch (e) {
        // console.log(e)
        if (e.code === 'ENOENT') {
          res.status(200).json({ ok: true })
          await writeFile(path, req.body.password)
        }
      }
    }
  } else {
    // Handle any other HTTP method
  }
}