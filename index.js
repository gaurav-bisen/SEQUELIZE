import express from 'express'
import dotenv from "dotenv"
import userRoute from './routes/user.route.js'
import errorHandling from './middlewares/errorHandling.middleware.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//ROUTES
app.use('/api/v1/users', userRoute);


//Error handling middleware
app.use(errorHandling);

//Server running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})


























//to sync model to db

// (async () => {
//     try {
//         await db.sequelize.sync(); //sync all model - (sync only the model whose table not in db)
//         //({force: true})- recreate table forcefully
//         //({alter: true})- if any changes in table it will add new column in table (not recreate)

//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         })
//     } catch (error) {
//         console.log("Error syning db: ", error);
//     }
// })();