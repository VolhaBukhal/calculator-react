import { Link } from 'react-router-dom'

import { PAGE_ROUTES } from '@constants/router'

export const PageNotFound = () => {
  return (
    <>
      <div>Not Found Page</div>
      <button>
        <Link to={PAGE_ROUTES.HOME}>Back to main</Link>
      </button>
    </>
  )
}
