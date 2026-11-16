import { useMutation } from '@tanstack/react-query'
import { sendMessage } from '../api/send'

export const useSendMessage = () => useMutation({ mutationKey: ['send-message'], mutationFn: sendMessage })
