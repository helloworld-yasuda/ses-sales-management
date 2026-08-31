import useSWR from "swr";

export const useFetchData = (path: string) => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8090/api/${path}`,
    fetcher,
  );
  return { data, error, isLoading };
};

export default useFetchData;
