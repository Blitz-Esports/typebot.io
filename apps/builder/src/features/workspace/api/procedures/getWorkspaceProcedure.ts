import prisma from '@/lib/prisma'
import { authenticatedProcedure } from '@/utils/server/trpc'
import { TRPCError } from '@trpc/server'
import { Workspace, workspaceSchema } from 'models'
import { z } from 'zod'

export const getWorkspaceProcedure = authenticatedProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/workspaces/{workspaceId}',
      protect: true,
      summary: 'Get workspace',
      tags: ['Workspace'],
    },
  })
  .input(
    z.object({
      workspaceId: z.string(),
    })
  )
  .output(
    z.object({
      workspace: workspaceSchema,
    })
  )
  .query(async ({ input: { workspaceId }, ctx: { user } }) => {
    const workspace = (await prisma.workspace.findFirst({
      where: { members: { some: { userId: user.id } }, id: workspaceId },
    })) as Workspace | null

    if (!workspace)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'No workspaces found' })

    return {
      workspace,
    }
  })
