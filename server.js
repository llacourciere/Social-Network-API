const mongoose = require('mongoose');
const express = require('express')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(PORT, () => console.log(`You are now connected to http://localhost:${PORT}`))