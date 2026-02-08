import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/CarsHelp').then(()=> {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.use('/routes',routes);
app.use(express.json());
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})