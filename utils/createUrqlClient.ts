import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "@urql/core";
import { SSRExchange } from "next-urql";

function createUrqlClient(ssrExchange: SSRExchange) {
  return {
    url: process.env.NEXT_PUBLIC_SERVER_URL as string,
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            deleteToDo: (_result, args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "ToDos"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "ToDos", fi.arguments);
              });
            },
            createToDo: (_result, args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "ToDos"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "ToDos", fi.arguments);
              });
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
