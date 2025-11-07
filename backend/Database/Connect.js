import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        // eslint-disable-next-line no-undef
        return await mongoose.connect(`${process.env.MONGO_URI}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    } catch (err) {
        console.error(`MongoDB connection failed with message : ${err.message}`);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

export default ConnectDB;