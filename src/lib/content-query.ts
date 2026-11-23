import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPublishedContent } from "./content.functions";
import { mergeContent, type ContentRow } from "./content-merge";

export const contentQuery = queryOptions({
  queryKey: ["content", "published"],
  queryFn: async () => mergeContent((await getPublishedContent()) as ContentRow[]),
  staleTime: 60_000,
});

export function useSiteContent() {
  return useSuspenseQuery(contentQuery).data;
}
