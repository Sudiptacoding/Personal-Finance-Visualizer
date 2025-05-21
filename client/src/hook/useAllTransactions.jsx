
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAllTransactions = () => {
    const axiosData = useAxios()
    const { isPending, error, data: transaction, refetch } = useQuery({
        queryKey: ['alltransaction'],
        queryFn: () =>
            axiosData.get(`/transactions`)
                .then(res => {
                    return (res?.data)
                })
    })
    return { isPending, error, transaction, refetch }
};

export default useAllTransactions;