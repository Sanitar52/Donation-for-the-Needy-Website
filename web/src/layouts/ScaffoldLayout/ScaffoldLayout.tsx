import { Breadcrumbs } from '@mui/material'
import { Link, routes, useMatch, useParams, useLocation } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const currentLocation = useLocation()
  const a = currentLocation.pathname.startsWith('/users') ? 'Users' : 'Institutions'
  const b = currentLocation.pathname.endsWith('/new') ? 'New' : currentLocation.pathname.endsWith('/edit') ? 'Edit' : /\d$/.test(currentLocation.pathname) ? 'Details' : ''
  return (
    <div className="rw-scaffold mt-24">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <Breadcrumbs className="" aria-label="breadcrumb">
          <Link className='text-2xl' to={a == 'Users' ? routes.users() : routes.institutions()}>{a}</Link>
          { b != '' &&  <span className='text-2xl'>{ b }</span>}
        </Breadcrumbs>
        <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
