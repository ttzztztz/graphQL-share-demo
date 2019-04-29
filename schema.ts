import { ObjectType, Field, Float } from "type-graphql";
import "reflect-metadata";

@ObjectType({ description: "User description" })
class User {
    @Field({ nullable: false })
    username: string;

    @Field({ description: "MD5_salted pwd" })
    password: string;

    @Field(type => User, { nullable: false })
    mentor: User;

    @Field(type => [User])
    friends: User[];

    @Field(type => Float)
    score: number;
}

export default User;
