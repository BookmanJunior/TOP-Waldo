import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';
import { ErrorWithStatus } from '../types/ErrorWithStatus';

export default function ErrorElement() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorBody status={error.status} text={error.data} />;
  }

  if (error instanceof Error) {
    return 'status' in error ? (
      <ErrorBody status={(error as ErrorWithStatus).status} text={error.message} />
    ) : (
      <ErrorBody status={500} text={error.message} />
    );
  }
}

interface ErrorBody {
  status?: number;
  text: string;
}

function ErrorBody({ status, text }: ErrorBody) {
  return (
    <div className="self-center text-center ">
      {status && <h1 className="text-[4rem] font-bold">{status}</h1>}
      <h2>{text}</h2>
      <Link
        to={'/'}
        className="my-4 block min-w-[200px] rounded-md border bg-orange-400 px-6 py-2 text-white">
        Go Back
      </Link>
    </div>
  );
}
