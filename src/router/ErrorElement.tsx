import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

export default function ErrorElement() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="self-center text-center ">
        <h1 className="text-[4rem] font-bold">{error.status}</h1>
        <h2>{error.data}</h2>
        <Link to={'/'} className="my-4 block rounded-md border bg-orange-400 px-6 py-2 text-white">
          Return
        </Link>
      </div>
    );
  }
}
