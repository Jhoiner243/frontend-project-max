export type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    arg: string | FetchArgs;
    extra: unknown;
    endpoint: string;
    type: "query" | "mutation";
    forced: boolean | undefined;
  }
) => Headers | void;
