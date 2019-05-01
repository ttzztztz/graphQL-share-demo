import UserSchema from "./schema";
import QueryResolver from "./query";
import MutationResolver from "./mutation";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { authChecker } from "./auth";

const PORT = process.env.PORT || 4000;

(async () => {
    const schema = await buildSchema({
        resolvers: [UserSchema, QueryResolver, MutationResolver],
        authChecker
    });

    const server = new ApolloServer({
        schema,
        playground: true,
        context: req => ({ ...req })
    });

    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
})();
