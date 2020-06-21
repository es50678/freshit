
const resolvers = {
  Query: {
    category(parent, { id }) {
      return {
        name: "Verification/Validation"
      }
    }
  }
}

export = resolvers;
