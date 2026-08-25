import useSWR from "swr";
import type { Rank } from "@/app/types/types";

export type Client = {
  clientId: number;
  clientName: string;
  contactPerson: string;
  primaryDomain: string;
  salesPerson: string;
  clientRank: Rank;
};

const useFetchClients = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8090/api/clients",
    fetcher,
  );
  return { data, error, isLoading };
};

export default useFetchClients;
