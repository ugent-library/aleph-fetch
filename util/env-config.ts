import 'dotenv/config'
import { z } from 'zod'

const envVariables = z.object({
  ALEPH_HOST: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
