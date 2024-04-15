import { useQuery } from 'react-query'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import chain from "../../public/config.json"
import { useCosmWasmClient } from "@/hooks/useCosmwasmClient";
import { foundationAddress } from "@/components/shared/constants";

export const useGetAllSortedEntries = () => {
  const client = useCosmWasmClient();

  return useQuery("useGetAllSortedEntries", () => fetchAllSortedEntries(client, false), {
    enabled: !!client,
  });
};

export const useGetSortedEntriesWithoutFoundation = () => {
  const client = useCosmWasmClient();

  return useQuery("useGetSortedEntriesWithoutFoundation", () => fetchAllSortedEntries(client, true), {
    enabled: !!client,
  });
};

const fetchAllSortedEntries = async (client: CosmWasmClient | undefined, isFoundationExcluded: boolean) => {

  if (!client) {
    return;
  }
  let allEntries: any[]

  let response = await client.queryContractSmart(chain.furnace_contract_address, { leaderboard: { fuel_denom: "factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB", limit: 30 } });
  console.log(response)

  allEntries = [...response["leaderboard"]]

  while (response.length === 30) {
    response = await client.queryContractSmart(chain.furnace_contract_address, {
      leaderboard: {
        fuel_denom: "factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB",
        start_after: response[29][0],
        limit: 30
      }
    });
    allEntries = [...allEntries, ...response["leaderboard"]]
  }
  return isFoundationExcluded ? allEntries.sort((a, b) => b[1] - a[1]).filter((value) => value[0] !== foundationAddress) : allEntries.sort((a, b) => b[1] - a[1])
}
