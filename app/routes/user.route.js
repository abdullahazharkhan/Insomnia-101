import express from "express"
import User from "../models/user.model.js"

const router = express.Router();

// to get all the users
// localhost:3000/api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
        throw new Error(error);
    }
})

// to get a single user of given id
// localhost:3000/api/users/{id}
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
        throw new Error(error);
    }
})

// to add a user
// localhost:3000/api/users
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json(user).status(200);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
        throw new Error(error);
    }
})

// to update a user
// localhost:3000/api/users/{id}
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const updatedUser = await User.findById(id);
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
        throw new Error(error);
    }
})

// to delete a user of given id
// localhost:3000/api/users/{id}
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
        throw new Error(error);
    }
})

export default router;