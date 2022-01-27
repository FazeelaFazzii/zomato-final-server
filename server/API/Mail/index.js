import express from "express";
import  initializeMailgun  from "../../config/mail.config";

const Router = express.Router();


Router.post("/", async (req, res) => {
    try{
       // const { from, to, subject, text } = req.body.mailData;
        const sendMail = initializeMailgun();
        const data = {
            
            to:"faseelavs.faz@gmail.com",
            subject:"hello",
            text:"mailgun testing"
        };
        await sendMail.messages().send(data);
        return res.status(200).json({ status: "Email has been sent" });
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
    
});
export default Router;