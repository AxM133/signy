import { useMutation } from '@tanstack/react-query'
import { submitDemoRequest, type DemoRequestPayload } from '../api/submit'

export const useSubmitDemoRequest = () =>
  useMutation({ mutationKey: ['demo-request'], mutationFn: (payload: DemoRequestPayload) => submitDemoRequest(payload) })
