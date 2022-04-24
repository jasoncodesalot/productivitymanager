import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.token === '') {
      res.status(200).json({ ok: false }) // not logged in
    }
    // if (req.body.username === '') {
    //   res.status(200).json({ ok: false, issue: 'Incorrect Login'})
    //   return
    // } else if (req.body.password === '') {
    //   res.status(200).json({ ok: false, issue: 'Incorrect Login'})
    //   return
    // } else {
    //   const path = join('logins', req.body.username)
    //   try {
    //     const file = await readFile(path)
    //     if (req.body.password === file.toString()) {
    //       res.status(200).json({ ok: true })
    //     }
    //   } catch (e) {
    //     res.status(200).json({ ok: false, issue: 'Incorrect Login'})
    //   }
    }
  } else {
    // Handle any other HTTP method
  }
}