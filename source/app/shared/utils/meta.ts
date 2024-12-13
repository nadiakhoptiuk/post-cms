import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime/dist/routeModules'

export type LoaderDataWithMeta = {
  meta: Partial<ServerRuntimeMetaDescriptor>
}

export type LoaderFunctionWithMeta = (args: LoaderFunctionArgs) => Promise<LoaderDataWithMeta>

export const meta: MetaFunction<LoaderFunctionWithMeta> = ({ data }) => {

  if (!data) {
    return []
  }

  return [
    data.meta,
  ]
}
