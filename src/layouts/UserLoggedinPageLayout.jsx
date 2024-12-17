import { Outlet } from 'react-router-dom'

export default function UserLoggedinPageLayout() {
  return (
    <div className="max-w-7xl mx-auto">
        <navbarLogin></navbarLogin>
        <Outlet></Outlet>
    </div>
  )
}
