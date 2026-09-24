import useSWR from "swr";
import { API_BASE_URL } from "@/app/constants/apiRoute";

export const useFetchData = (path: string) => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}${path}`,
    fetcher,
  );
  return { data, error, isLoading };
};

export default useFetchData;
