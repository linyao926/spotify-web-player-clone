import { useParams } from "react-router";

export const useGetId = () => {
    let params = useParams();
    const id = params.id;
    return { id };
};