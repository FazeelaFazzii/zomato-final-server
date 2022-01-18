import Jwtpassport from 'passport-jwt';


//Database Model
import { UserModel } from "../database/allModels";

const JWTStrategy = Jwtpassport.Strategy;

const ExtractJwt = Jwtpassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoAPP",
};

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async (jwt__payload, done)=>{
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null, false);
                return  done(null, doesUserExist);
            }catch(error){
                throw new Error(error);
            }
        }
    )
    )}