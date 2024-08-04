import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav>
      <ul className="flex flex-row">
        {pathnames.length > 0 ? (
          <li>
            <Link to="/">Home</Link>
            <span> / </span>
          </li>
        ) : (
          <li>Home</li>
        )}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li className='capitalize font-bold ml-1' key={to}>{value}</li>
          ) : (
            <li className='capitalize font-bold' key={to}>
              <Link to={to}>{value}</Link>
              <span> / </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
