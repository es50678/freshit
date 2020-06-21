import { gql } from 'apollo-server';
import { importSchema } from 'graphql-import';

const typeDefs = gql(importSchema('schema.graphql'));

export default typeDefs;
