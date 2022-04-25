import { access, writeFile, readFile, readdir, mkdir } from 'fs/promises'
import { constants } from 'fs'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const name = req?.body?.name
    const desc = req?.body?.description
    if (req.body.token === '' || !name || !desc) {
      res.status(200).json({ ok: false }) // not logged in
      return
    }
    try {
      const username = await readFile(join('tokens', req.body.token)).then(t => t.toString())
      const folderExists = await checkFileExists(join('data', username))
      if (!folderExists) {
        await mkdir(join('data', username))
      }
      const fileName = join('data', username, randomstring(20).replace(/\./g, '_') +'.json')
      const taskFiles = await writeFile(fileName, JSON.stringify({name: name, description: desc}))
      res.status(200).json({ ok: true })
    } catch (e) {
      console.log(e)
      res.status(200).json({ ok: false })
      return
    }
    // res.status(200).json({ok: true, tasks: [{name: 'Good', description: 'It works!'}]})
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