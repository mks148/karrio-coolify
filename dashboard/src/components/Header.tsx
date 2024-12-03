import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <Link to="/">
        <img 
          src="/logo.svg" 
          alt="TrackPackage" 
          className="h-8 w-auto" 
        />
      </Link>
      // ... rest of header code
    </header>
  );
} 