import { TypedResponse } from '@vercel/remix'

type ExtractLoaderData<T extends Promise<TypedResponse>> = Awaited<
  ReturnType<Awaited<T>['json']>
>

export type { ExtractLoaderData }
