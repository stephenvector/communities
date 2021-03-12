import { useMemo } from "react";
import useCommunities from "./useCommunities";
import { Community as CommunityType } from "../types";

export default function useCommunity(communityId: string) {
  const { communities, status } = useCommunities();

  const community: null | CommunityType = useMemo(() => {
    if (communityId in communities) return communities[communityId];

    return null;
  }, [communities, communityId]);

  return {
    community,
    status,
  };
}
