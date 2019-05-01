import { Resolver, Query, Arg, FieldResolver, Root, Authorized } from "type-graphql";
import User from "./schema";
import { MongoClient, ObjectID } from "mongodb";

@Resolver(of => User)
class UserResolver {
    @Query(returns => User)
    @Authorized()
    async findUser(@Arg("username", { nullable: false }) username: string): Promise<Partial<User>> {
        const client = await MongoClient.connect("mongodb://localhost:27017/demo", {
            useNewUrlParser: true
        });

        const db = client.db("demo");
        try {
            const userResult: User = await db.collection("user").findOne({
                username: username
            });

            const result: Partial<User> = Object.entries(userResult).reduce((prev, [k, v]) => {
                if (k !== "password") {
                    return {
                        ...prev,
                        [k]: v
                    };
                } else {
                    return prev;
                }
            }, {});

            return result;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
        return new User();
    }

    @FieldResolver()
    async mentor(@Root() user: User): Promise<User> {
        const client = await MongoClient.connect("mongodb://localhost:27017/demo", {
            useNewUrlParser: true
        });
        const db = client.db("demo");
        try {
            const userResult: User = await db.collection("user").findOne({
                _id: new ObjectID(user.mentor as any)
            });

            return userResult;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
        return new User();
    }
}

export default UserResolver;
