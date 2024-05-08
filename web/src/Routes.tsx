// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import HeaderLayout from 'src/layouts/HeaderLayout'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import FooterLayout from 'src/layouts/FooterLayout/'

const Routes = () => {
  return (
    <Router>

      <Set wrap={HeaderLayout}>
      <Set wrap={FooterLayout}>
      <Route path="/past-donations" page={PastDonationsPage} name="pastDonations" />
      <Route path="/donation" page={DonationPage} name="donation" />
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Institutions" titleTo="institutions" buttonLabel="New Institution" buttonTo="newInstitution">
        <Route path="/institutions/new" page={InstitutionNewInstitutionPage} name="newInstitution" />
        <Route path="/institutions/{id:Int}/edit" page={InstitutionEditInstitutionPage} name="editInstitution" />
        <Route path="/institutions/{id:Int}" page={InstitutionInstitutionPage} name="institution" />
        <Route path="/institutions" page={InstitutionInstitutionsPage} name="institutions" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/gsm-load-balance" page={GSMLoadBalancePage} name="gsmLoadBalance" />
      </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
