import useSWR from "swr";

export type Member = {
  memberId: number;
  memberName: string;
  mainSkills: Array<string>;
  offerRate: number;
  experienceYears: number;
  statuses: string;
  skillSheetUrl: string;
};

const useFetchMembers = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8090/api/members",
    fetcher,
  );
  return { data, error, isLoading };
};

export default useFetchMembers;
