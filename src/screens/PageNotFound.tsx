import { Link } from 'react-router-dom'
import routes from '@constants/router'

const PageNotFound = () => {
  return (
    <>
      <div>Not Found Page</div>
      <button>
        <Link to={routes.HOME_PAGE_ROUTE}>Back to main</Link>
      </button>
    </>
  )
}

export default PageNotFound
