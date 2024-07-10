const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin@1234', salt);

        const newAdmin = new Admin({
            username: 'admin',
            password: hashedPassword,
        });

        await newAdmin.save();
        console.log('Admin user created');
        mongoose.disconnect();
    })
    .catch(err => console.log(err));
