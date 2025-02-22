import { memo } from 'react'
import '../styles/components/Spinner.scss'

export const LoaderComponent = memo(
  ({ ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className="loader" {...props} />
  )
)

export const Loader = memo(LoaderComponent)
