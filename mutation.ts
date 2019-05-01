import { Resolver, Arg, Mutation, Float, Int } from "type-graphql";
import User from "./schema";
import { MongoClient } from "mongodb";

@Resolver(of => User)
class ScoreResolver {
    @Mutation(type => Int)
    async UpdateScore(@Arg("username") username: string, @Arg("score", type => Float) score: number): Promise<number> {
        const client = await MongoClient.connect("mongodb://localhost:27017/demo", {
            useNewUrlParser: true
        });
        const db = client.db("demo");
        try {
            const result = await db.collection("user").updateOne(
                {
                    username: username
                },
                {
                    $set: {
                        score: score
                    }
                }
            );
            return result.modifiedCount;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
        return 0;
    }
}

export default ScoreResolver;
