import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "@urql/core";
import { SSRExchange } from "next-urql";
import { ToDosDocument, ToDosQuery } from "../generated/graphql";

function createUrqlClient(ssrExchange: SSRExchange) {
  return {
    url: process.env.NEXT_PUBLIC_SERVER_URL as string,
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            deleteToDo(_result, args, cache, _info) {
              cache.updateQuery<ToDosQuery>(
                {
                  query: ToDosDocument,
                },
                (data) => {
                  if (data) {
                    data.ToDos = data?.ToDos.filter?.(
                      (todo) => todo.id !== args.id
                    );
                  }
                  return data;
                }
              );
            },
            updateDone(_result, _args, cache, _info) {
              cache.updateQuery<ToDosQuery>(
                {
                  query: ToDosDocument,
                },
                (data) => {
                  if (data) {
                    data.ToDos.sort((a, b) => Number(b.done) - Number(a.done));
                  }
                  return data;
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
}

export default createUrqlClient;
