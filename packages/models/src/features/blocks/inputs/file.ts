import { z } from 'zod'
import { InputBlockType, optionBaseSchema, blockBaseSchema } from '../shared'

export const fileInputOptionsSchema = optionBaseSchema.and(
  z.object({
    isRequired: z.boolean().optional(),
    isMultipleAllowed: z.boolean(),
    labels: z.object({
      placeholder: z.string(),
      button: z.string(),
      clear: z.string().optional(),
      skip: z.string().optional(),
    }),
    sizeLimit: z.number().optional(),
  })
)

export const fileInputStepSchema = blockBaseSchema.and(
  z.object({
    type: z.literal(InputBlockType.FILE),
    options: fileInputOptionsSchema,
  })
)

export const defaultFileInputOptions: FileInputOptions = {
  isRequired: true,
  isMultipleAllowed: false,
  labels: {
    placeholder: `<strong>
      Click to upload
    </strong> or drag and drop<br>
    (size limit: 10MB)`,
    button: 'Upload',
    clear: 'Clear',
    skip: 'Skip',
  },
}

export type FileInputBlock = z.infer<typeof fileInputStepSchema>
export type FileInputOptions = z.infer<typeof fileInputOptionsSchema>
