import pino from 'pino'
import fs from 'fs'
import path from 'path'

const logPath = path.join(process.cwd(), 'logs'); //current working directory

if(!fs.existsSync(logPath)){ // if not exists create it
    fs.mkdirSync(logPath);
}

const logger = pino(
    {
      level: 'info'
    },
    pino.destination({ 
      dest: path.join(logPath, 'app.log'), // where the logs are written
      sync: false // logs written asynchronously
    })
  );
  
  export default logger;