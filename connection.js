var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://adithyanb38:techcode2005@cluster3.czrtib0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3")
.then(()=>{
    console.log("connected to db");
})
    .catch((error)=>{
        console.log(error)
    }
);


