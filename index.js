const express = require('express');
const {connectDB} = require('./config/db');
const cors=require('cors')
const bodyParser = require('body-parser')
const authroute= require('./routes/auth')
const userrouter= require('./routes/user')
const productrouter=require('./routes/product')
const refresh=require('./routes/refresh')
const multer  = require('multer')
const path=require('path')


const app = express( );


app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authroute);
app.use('/api/products', productrouter);
app.use('/api/users',userrouter);
app.use('/api/refresh',refresh)
app.use('/images',express.static(path.join(__dirname,'images')))

 const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"images"))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+""+Date.now()+""+file.originalname+".png")
        console.log(file.fieldname)

    }
})
const images = multer({ storage:storage })

app.post('/images', images.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(req.file.filename)
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.status(201).json({ imageUrl });
});

connectDB()
const PORT= 8001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));