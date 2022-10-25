const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection Success Mongo");
}).catch((e) => {
    console.log("no Connection")
})