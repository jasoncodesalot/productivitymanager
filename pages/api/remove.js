import { rm, readFile } from 'fs/promises'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const id = req?.body?.id
    if (req.body.token === '' || !id) {
      res.status(200).json({ ok: false }) // not logged in
      return
    }
    try {
      const username = await readFile(join('tokens', req.body.token)).then(t => t.toString())
      const taskFiles = await rm(join('data', username, id))
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