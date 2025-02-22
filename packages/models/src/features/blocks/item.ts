import { z } from 'zod'
import { itemBaseSchema } from './shared'
import { buttonItemSchema } from './inputs'
import { conditionItemSchema } from './logic'

export type ItemIndices = {
  blockIndex: number
  groupIndex: number
  itemIndex: number
}
const itemSchema = buttonItemSchema.or(conditionItemSchema)

export type ItemBase = z.infer<typeof itemBaseSchema>
export type Item = z.infer<typeof itemSchema>
