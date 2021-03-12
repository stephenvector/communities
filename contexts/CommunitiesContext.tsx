import { createContext } from "react";
import { Community, FetchStatus } from "../types";

type CommunitiesContextValue = {
  communities: Record<string, Community>;
  status: FetchStatus;
};

const DEFAULT_CONTEXT_VALUE: CommunitiesContextValue = {
  communities: {},
  status: "initial",
};

const CommunitiesContext = createContext(DEFAULT_CONTEXT_VALUE);

export default CommunitiesContext;
