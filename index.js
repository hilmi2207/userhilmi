const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passwordHash = require('password-hash')


const port = 3000

const user = [
    { 
        id: 1,
        nama: 'Hilmi',
        npm: '1815',
        password: 'asdf'
    }
]


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read user
app.get('/user', (req, res) => {
    res.json(user)
})

// read user
app.get('/user/:id', (req, res) =>  {
    let result = null;

    for (let i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            result = user[i]
        }
    }

    if (!result) {
        res.sendStatus(404)
    } else {
        res.json(result)
    }
})

// create user
app.post('/user', (req, res) => {
    const{id, nama, npm, password}=req.body;
    const hashPass = passwordHash.generate(password)
    user.push({
        id,
        nama,
        npm,
        password: hashPass
    })

    res.json({ message: 'data created' })
})

// update todo
app.patch('/user/:id', (req, res) => {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            const{nama, password} = req.body
            const hashPass = passwordHash.generate(password)
            user[i].password = hashPass
            user[i].nama = nama
            
            
        }
    }

    res.json({ message: 'data updated' })
})

// delete todo
app.delete('/user/:id', (req, res) => {
    let index = null;

    for (let i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            index = [i]
        }
    }

    user.splice(index, 1)

    res.json({ message: 'data deleted' })
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})