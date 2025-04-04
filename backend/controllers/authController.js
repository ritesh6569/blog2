// import User from '../models/User.js';

// export const registerUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const user = new User({ username, email, password });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering user' });
//     }
// };
import bcrypt from 'bcrypt';
import User from '../models/User.js';




export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("Registration Request:", req.body);

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Error registering user' });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user });
    } 
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
