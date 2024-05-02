
import { Link, matchPath, navigate, routes, useMatch } from '@redwoodjs/router';

type HeaderLayoutProps = {
  children?: React.ReactNode
}


const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const isActive = (route) => {
    const matchInfo = useMatch(route);
    return matchInfo.match ? "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:dark:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
  }

  return (
  <>
  <header>
    <nav className="bg-white dark:bg-gray-900 fixed w-full p-2 z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://i.ibb.co/VwpqFY4/Untitled-design-1.pnghttps://i.ibb.co/VwpqFY4/Untitled-design-1.png" className="h-14" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-orange-400">Yellow-Charity</span>
            </Link>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" onClick={() => navigate(routes.donation())}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 pb-3 pt-3 inline-flex items-center font-medium rounded-lg text-sm px-4 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"

    >
      <path d="M4 21h9.62a3.995 3.995 0 003.037-1.397l5.102-5.952a1 1 0 00-.442-1.6l-1.968-.656a3.043 3.043 0 00-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 009.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 00.442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 00.11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 01-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 001.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0016.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0111.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 01.701.292c.189.189.293.44.293.707z" />
    </svg>Donate Now</button>
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
            <a href="/" className={isActive('/')}>Home</a>
          </li>
          <li>
            <a href="/users" className={isActive('/users')}>Users</a>
          </li>
          <li>
            <a href="/institutions" className={isActive('/institutions')}>Institutions</a>
          </li>
          <li>
            <a href="/past-donations" className={isActive('/past-donations')}>Past Donations</a>
          </li>
        </ul>
      </div>
      </div>
    </nav>

    </header>

    <main className='mt-6'>
      {children}
      </main>
    </>
  );
}


export default HeaderLayout;
