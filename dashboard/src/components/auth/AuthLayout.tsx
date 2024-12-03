export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="has-text-centered my-6 pt-5">
          <a 
            href="https://trackpackage.ca" 
            className="is-size-4 has-text-primary has-text-weight-bold"
          >
            TrackPackage
          </a>
        </div>
        {children}
      </div>
    </div>
  );
} 