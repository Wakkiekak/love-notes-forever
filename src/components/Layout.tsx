
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, Book, MessageCircleHeart, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLove } from '@/lib/LoveContext';
import FloatingHearts from './FloatingHearts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { hasNewLetterToday } = useLove();

  const navItems = [
    { name: 'Home', path: '/', icon: <Heart size={20} /> },
    { 
      name: 'Letters', 
      path: '/letters', 
      icon: <MessageCircleHeart size={20} />,
      notification: hasNewLetterToday
    },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Journal', path: '/journal', icon: <Book size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-100 via-purple-100 to-love-100 relative">
      <FloatingHearts count={15} />
      
      <div className="px-4 py-6 max-w-lg mx-auto relative z-10">
        {/* Mobile Navbar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-love-200 p-2 flex justify-around items-center z-50 lg:hidden">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-colors relative",
                isActive(item.path) 
                  ? "text-love-600 font-medium" 
                  : "text-gray-500 hover:text-love-500"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
              {item.notification && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-love-500 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 bg-white border border-love-200 p-4 rounded-xl shadow-md z-50">
          <div className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "p-3 rounded-lg transition-all relative",
                  isActive(item.path) 
                    ? "bg-love-100 text-love-600 shadow-inner" 
                    : "text-gray-500 hover:bg-love-50 hover:text-love-500"
                )}
                title={item.name}
              >
                {item.icon}
                {item.notification && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-love-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu button for extra content */}
        <div className="fixed top-4 right-4 z-50 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 bg-white rounded-full shadow-md border border-love-200">
                <Menu size={20} className="text-love-500" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <div className="flex flex-col space-y-4 mt-8">
                <h3 className="text-xl font-dancing text-love-600">Mars & Pim</h3>
                <p className="text-sm text-gray-600">A love app just for you ❤️</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <div className="pb-20 lg:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
