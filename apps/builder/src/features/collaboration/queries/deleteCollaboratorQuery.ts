import { sendRequest } from 'utils'

export const deleteCollaboratorQuery = (typebotId: string, userId: string) =>
  sendRequest({
    method: 'DELETE',
    url: `/api/typebots/${typebotId}/collaborators/${userId}`,
  })
