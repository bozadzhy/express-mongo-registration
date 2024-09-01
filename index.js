const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

const strt = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bozadzhyf:EG4g0n9Z9Y4npZcn@cluster0.0g2fq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
strt();
