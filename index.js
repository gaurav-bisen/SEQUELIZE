import express from 'express'
import dotenv from "dotenv"
// import db from './models/index.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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