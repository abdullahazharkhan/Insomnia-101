import express from 'express'
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"


const app = express()

const port = 3000 // port on which the server will be started :: localhost:3000

// middlewares
// for input from url
app.use(express.urlencoded({ extended: true }))
// for json input
app.use(express.json())

// This is the route that is used to access the user routes
// localhost:3000/api/users
app.use("/api/users", userRoute);

// This is the root route
// root route is the route that is accessed when the user visits the website
// localhost:3000/
app.get('/', (req, res) => {
    res.send('INSOMNIA 101');
})

// DB CONNECTION
mongoose.connect(`mongodb+srv://abdullahazharkhan1:itnaSaPassword@postmandemocluster.66fp2nh.mongodb.net/PostmanDemoDb`)
    .then(() => {
        console.log("connected to database");
        // start the server
        app.listen(port, () => {
            console.log(`App started on port ${port}`)
        })
    }).catch((err) => {
        console.log(err)
        throw new Error;
    })