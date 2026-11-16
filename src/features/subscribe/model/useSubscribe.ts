import { useMutation } from '@tanstack/react-query'
import { subscribe } from '../api/subscribe'

export const useSubscribe = () => useMutation({ mutationKey: ['subscribe'], mutationFn: subscribe })
