interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/sign-in" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </li>
            <li>
              <a href="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
