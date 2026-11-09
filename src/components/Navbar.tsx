
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building, Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import tmhLogo from '@/assets/tmh-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    // Only handle scrolling if we're on the index page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add a small offset to account for the navbar height
        window.scrollBy(0, -100);
      }
    } else {
      // If not on the index page, navigate to index with the section hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header 
      className="sticky top-0 bg-background/85 backdrop-blur-md border-b border-border shadow-sm py-3 z-50"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={tmhLogo}
              alt="Truckee Meadows Handyman logo"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-11 w-11 object-contain transition-transform duration-300 hover:scale-110 hover:-rotate-3"
            />
            <span className="font-semibold text-lg tracking-tight">Truckee Meadows Handyman</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.45)] transition-all flex items-center gap-1"
          >
            <Building className="h-4 w-4" />
            <span>About Company</span>
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.45)] transition-all"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.45)] transition-all"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.45)] transition-all"
          >
            Contact
          </button>
        </nav>
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline"
                className="px-4 py-2 text-sm font-medium text-primary border-primary hover:bg-primary/10"
                onClick={() => navigate('/auth')}
              >
                Log In
              </Button>
              <Button 
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate('/auth?tab=signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
