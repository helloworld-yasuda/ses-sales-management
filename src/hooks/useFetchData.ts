import useSWR from "swr";
import { API_BASE_URL } from "@/app/constants/apiRoute";

export const useFetchData = <T>(path: string, mockData: T[]) => {
  const isApiMode = process.env.NEXT_PUBLIC_API_BASE === "api";
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    isApiMode ? `${API_BASE_URL}${path}` : null,
    fetcher,
  );
  if (!isApiMode) return { data: mockData, error: null, isLoading: false };

  return { data, error, isLoading };
};

export default useFetchData;
