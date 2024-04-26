import { useQuery } from "react-query";
import { uwhalePerWhale } from "@/components/shared/constants";

type Token = {
  denom: string;
  amount: string;
};

export const useFuelSupply = () => {
  const { data } = useQuery('totalSupply', fetchTotalSupply,);

  return data
}
export async function fetchTotalSupply(): Promise<number | null> {
  try {
    const response = await fetch(
      'https://chihuahua-api.polkachu.com/cosmos/bank/v1beta1/supply/by_denom?denom=uhuahua',
    );
    const data = await response.json();

    return data["amount"]["amount"]
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
