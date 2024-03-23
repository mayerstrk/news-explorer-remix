import { LoaderFunction } from '@remix-run/node'
import { useParams } from '@remix-run/react'

/**
 * Provides a mechanism to determine if a parameter's value was obtained during server-side rendering
 * or through client-side navigation using `useParams()`. This hook prevents unnecessary renders by
 * only updating the component state when the parameter value changes on the client side. It returns
 * the parameter value and a setter function, alongside a flag indicating if the current render was
 * initiated on the client side.
 *
 * @param {string} paramName The name of the URL parameter to manage.
 * @returns {Array} A tuple containing the parameter value, a setter function for the value,
 * and a boolean flag indicating client-side rendering.
 */

export function useDynamicParam<T extends LoaderFunction>(
  paramName: string,
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const params = useParams()
  const loaderData = useLoaderData<T>()

  const initialValue = loaderData[paramName] || ''

  const [paramValue, setParamValue] = useState(initialValue as string)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (isClient) {
      setParamValue(params[paramName] || '')
    } else {
      setIsClient(true)
    }
  }, [params, paramName, isClient])

  return [paramValue, setParamValue]
}
