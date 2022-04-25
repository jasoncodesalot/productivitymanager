import { writeFile, readFile, readdir } from 'fs/promises'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.token === '') {
      res.status(200).json({ ok: false }) // not logged in
      return
    }
    try {
      const username = await readFile(join('tokens', req.body.token)).then(t => t.toString())
      const folderName = join('data', username)
      const taskFiles = await readdir(folderName)
      const tasks = []
      for (const taskFile of taskFiles) {
        const t = await readFile(join('data', username, taskFile)).then(t => JSON.parse(t))
        t.id = taskFile
        tasks.push(t)
      }
      res.status(200).json({ok: true, tasks})
    } catch (e) {
      res.status(200).json({ ok: false, tasks: [{name: 'An error occurred', description: e.toString() }] })
      return
    }
    // res.status(200).json({ok: true, tasks: [{name: 'Good', description: 'It works!'}]})
  } else {
    // Handle any other HTTP method
  }
}
