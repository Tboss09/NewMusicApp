import fs from 'fs'

const data = {
 songName: 'tayo',
 text: 'tayo',
}

fs.writeFile('file.txt', data, err => {
 err && console.log(err)
 console.log("file create success")
})


import fs from 'fs'

fs.readFile('file.txt', 'utf-8', (err, data) => {
    const newData = JSON.parse(data)
    const  {author,songName} = newData
 console.log(author)
})
