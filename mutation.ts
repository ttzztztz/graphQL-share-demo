import { Resolver, Query, Arg, Mutation } from "type-graphql";
import User from "./schema";
import { MongoClient } from "mongodb";
import UpdateScoreInput from "./input";

@Resolver()
class ScoreResolver {
    @Mutation()
    UpdateScoreInput(){
        
    }
}

export default ScoreResolver;
