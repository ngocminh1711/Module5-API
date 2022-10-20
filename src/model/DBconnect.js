import mongoose  from "mongoose";



 class DBconnect {
    async connect() {
        await mongoose.connect('mongodb://localhost:27017/test')
    }
}

export default DBconnect;
