const express = require('express');
const app = express();

const router = require("./config/routes.config"); 
app.use(express.json());
app.use('/api', router); 

require('./config/db.config');

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


