//Libararies
import express from 'express';
import passport from 'passport';

//Database Model
import { ReviewModel } from '../../database/allModels';

const Router = express.Router();

/*
* Route    /:resid
* Des       GET all reviews for a particular restaurant
* Params    resid
* Access    Public
* Method    GET
*/
Router.get("/:resid", async(req,res) => {
    try{
        const {resid} = req.params;
        const reviews = await ReviewModel.find({ restaurants: resid })
        return res.json({ reviews });
    }catch(error){
        return res.status(500).json({ error:error.message });
    }
})

/*
* Route    /new
* Des       POST: adding new food/restaurant review and rating
* Params    none
* Access    Private
* Method    POST
*/

Router.post("/new", passport.authenticate("jwt"), async (req, res) =>{
    try{
        const {_id} =req.session.passport.user._doc;
        const { reviewData } = req.body;
        await ReviewModel.create({ ...reviewData, user:_id });
        return res.json({ reviews:"Review created successfully" });
    }catch(error){
        return res.status(500).json({ error:error.message });
    }
})

/*
* Route    /delete
* Des       delete a specific review
* Params    _id
* Access    Public
* Method    DELETE
*/

Router.delete('/delete/:id', async(req,res) =>{
    try{
        const {_id} = req.params;

        await ReviewModel.findByIdAndDelete(_id);
        return res.json({ review: "Review deleted successfully" })

    }catch(error){
        return res.status(500).json({ error:error.message });
    }
})
export default Router;