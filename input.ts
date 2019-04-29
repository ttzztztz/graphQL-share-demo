import { InputType, Field, Float } from "type-graphql";
import User from "./schema";
import { Min, Max } from "class-validator";

@InputType()
class UpdateScoreInput implements Partial<User> {
    @Field()
    username: string;

    @Field(type => Float)
    @Min(0)
    @Max(100)
    score: number;
}

export default UpdateScoreInput;
