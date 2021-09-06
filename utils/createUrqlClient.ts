import {
  cacheExchange,
  DataFields,
  ResolveInfo,
  Variables,
  Cache,
} from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "@urql/core";
import { SSRExchange } from "next-urql";
import { ToDosDocument, ToDosQuery } from "../generated/graphql";

function invalidate(
  _result: DataFields,
  args: Variables,
  cache: Cache,
  _info: ResolveInfo
) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "ToDos");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "ToDos", fi.arguments);
  });
}

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
            createToDo: invalidate,
            updateDone: invalidate,
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
}

export default createUrqlClient;
