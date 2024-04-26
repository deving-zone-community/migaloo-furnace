import {useQuery} from "react-query";
import {uwhalePerWhale} from "@/components/shared/constants";

type Token = {
    denom: string;
    amount: string;
};

export const useFuelSupply = () => {
    const {data} = useQuery('totalSupply', fetchTotalSupply, );

    return data
}
export async function fetchTotalSupply(): Promise<number | null> {
    try {
        const response = await fetch(
            'https://osmosis-api.polkachu.com/cosmos/bank/v1beta1/supply',
        );
        const data = await response.json();

        const uwhale = data.supply.find((item: Token) => item.denom === 'uhuahua');
        return uwhale ? (uwhale.amount/uwhalePerWhale) : null;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
