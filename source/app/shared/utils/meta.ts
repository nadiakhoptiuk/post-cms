import { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { ServerRuntimeMetaDescriptor } from '@react-router/server-runtime/dist/routeModules';

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
