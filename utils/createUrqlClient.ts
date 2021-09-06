import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "@urql/core";
import { SSRExchange } from "next-urql";
import { ToDo, ToDosDocument, ToDosQuery } from "../generated/graphql";

function sortByDone(a: ToDo, b: ToDo) {
  return Number(b.done) - Number(a.done);
}

function createUrqlClient(ssrExchange: SSRExchange) {
  return {
    url: process.env.NEXT_PUBLIC_SERVER_URL as string,
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            createToDo(result: { createToDo: ToDo }, _args, cache, _info) {
              cache.updateQuery<ToDosQuery>(
                {
                  query: ToDosDocument,
                },
                (data) => {
                  data?.ToDos.push(result.createToDo);
                  data?.ToDos.sort(sortByDone);
                  return data;
                }
              );
            },
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
                    data.ToDos.sort(sortByDone);
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
