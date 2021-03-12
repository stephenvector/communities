import { useContext } from "react";
import { CommunitiesContext } from "../contexts";

export default function useCommunities() {
  return useContext(CommunitiesContext);
}
