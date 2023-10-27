import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;
            const response = await axios.post('https://your-auth-service.com/login', { username, password });
            res.status(200).json({ user: response.data.user });
        } catch (error) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}