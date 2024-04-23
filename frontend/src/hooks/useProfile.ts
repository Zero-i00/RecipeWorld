import {useQuery} from "@tanstack/react-query";
import {userService} from "@/services/user.service";

export function useProfile() {
    const {data, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.getUser()
    })

    return {data, isLoading}
}
