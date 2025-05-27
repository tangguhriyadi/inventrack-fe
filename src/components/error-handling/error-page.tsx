import React from "react";

interface Props {
  reset: () => void;
  message?: string;
}

const ErrorPage: React.FC<Props> = (props) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>

        <div className="text-gray-600">
          {process.env.NEXT_PUBLIC_APP_ENV === "development" && (
            <pre className="text-sm text-red-500 mt-2">
              {props.message ?? "Something went wrong !"}
            </pre>
          )}
        </div>

        <div className="space-x-4">
          <button
            onClick={props.reset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
