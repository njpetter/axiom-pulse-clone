import { useQuery } from '@tanstack/react-query';
import { fetchTokens, Token } from '@/lib/api';


export function useTokensQuery() {
return useQuery<Token[]>({
queryKey: ['tokens'],
queryFn: fetchTokens,
staleTime: 5000
});
}