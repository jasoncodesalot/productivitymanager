import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('received a post request with data: ')
    await writeFile(join('logins', req.body.username), req.body.password)
  } else {
    // Handle any other HTTP method
  }
}