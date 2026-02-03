import express from 'express'
import dotenv from "dotenv"
dotenv.config();
import userRoute from './routes/user.route.js'
import errorHandling from './middlewares/errorHandling.middleware.js';
import httpLogger from './middlewares/httpLogger.middleware.js'

const app = express();
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);


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

//to send mail
// app.get('/email', async (req, res) => {
//     const mail = new Mail();
//     mail.setTo(process.env.EMAIL_TO);
//     mail.setSubject("test email");
//     mail.setText("Hello FROM content");
//     await mail.send();

//     res.send('Email triggered')
// })