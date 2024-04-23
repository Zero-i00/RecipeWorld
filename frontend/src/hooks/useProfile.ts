import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['user'],
		queryFn: () => userService.getUser()
	})

	return { data, isLoading, refetch }
}
