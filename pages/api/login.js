import { writeFile, readFile, access, mkdir } from 'fs/promises'
import { constants } from 'fs'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.username === '') {
      res.status(200).json({ ok: false, issue: 'Incorrect Login'})
      return
    } else if (req.body.password === '') {
      res.status(200).json({ ok: false, issue: 'Incorrect Login'})
      return
    } else {
      const folderExists = await checkFileExists(join('data', req.body.username))
      if (!folderExists) {
        await mkdir(join('data', req.body.username))
        await writeFile(join('data', req.body.username, 'example.json'), JSON.stringify({name: 'This is an example task', description: 'To add more tasks, use the create task button below'}))
      }
      const path = join('logins', req.body.username)
      try {
        const file = await readFile(path)
        if (req.body.password === file.toString()) {
          const token = randomstring(50)
          res.status(200).json({ ok: true, token })
          writeFile(join('tokens', token), req.body.username)
        }
      } catch (e) {
        res.status(200).json({ ok: false, issue: 'Incorrect Login'})
      }
    }
  } else {
    // Handle any other HTTP method
  }
}

function randomstring(L) {
  var s = '';
  var randomchar = function() {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) return n; //1-10
    if (n < 36) return String.fromCharCode(n + 55); //A-Z
    return String.fromCharCode(n + 61); //a-z
  }
  while (s.length < L) s += randomchar();
  return s;
}

async function checkFileExists(file) {
  return await access(file, constants.F_OK)
           .then(() => true)
           .catch(() => false)
}