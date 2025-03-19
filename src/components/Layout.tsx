
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, Book, MessageCircleHeart, Menu, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLove } from '@/lib/LoveContext';
import FloatingHearts from './FloatingHearts';
import { useTheme } from '@/lib/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { hasNewLetterToday } = useLove();
  const { theme, previewTheme } = useTheme();
  
  const activeTheme = previewTheme || theme;

  // Generate background class based on theme
  const getBackgroundClass = () => {
    switch (activeTheme) {
      case 'space':
        return 'bg-gradient-to-br from-[#0B0D2D] via-[#151A45] to-[#0B0D2D]';
      case 'galaxy':
        return 'bg-gradient-to-br from-[#2E1065] via-[#4C1D95] to-[#2E1065]';
      case 'mars':
        return 'bg-gradient-to-br from-[#300A0A] via-[#431109] to-[#2D0C08]';
      case 'ocean':
        return 'bg-gradient-to-br from-[#DBEAFE] via-[#93C5FD] to-[#DBEAFE]';
      case 'forest':
        return 'bg-gradient-to-br from-[#DCFCE7] via-[#86EFAC] to-[#DCFCE7]';
      case 'sunset':
        return 'bg-gradient-to-br from-[#FFEDD5] via-[#FED7AA] to-[#C4B5FD]';
      case 'midnight':
        return 'bg-gradient-to-br from-[#0C1330] via-[#0D1231] to-[#0C1330]';
      case 'retro':
        return 'bg-gradient-to-br from-[#E8E5D7] via-[#ECE6CE] to-[#E8E5D7]';
      default:
        return 'bg-gradient-to-br from-love-100 via-purple-100 to-love-100';
    }
  };

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
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen relative ${getBackgroundClass()}`}>
      {activeTheme === 'default' && <FloatingHearts count={15} />}
      
      <div className="px-4 py-6 max-w-lg mx-auto relative z-10">
        {/* Mobile Navbar */}
        <div className="fixed bottom-0 left-0 w-full bg-card border-t border-border p-2 flex justify-around items-center z-50 lg:hidden">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-colors relative",
                isActive(item.path) 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
              {item.notification && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 bg-sidebar border border-sidebar-border p-4 rounded-xl shadow-md z-50">
          <div className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "p-3 rounded-lg transition-all relative",
                  isActive(item.path) 
                    ? "bg-sidebar-primary/10 text-sidebar-primary shadow-inner" 
                    : "text-sidebar-foreground hover:bg-sidebar-primary/5 hover:text-sidebar-primary"
                )}
                title={item.name}
              >
                {item.icon}
                {item.notification && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-sidebar-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu button for extra content */}
        <div className="fixed top-4 right-4 z-50 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 bg-card rounded-full shadow-md border border-border">
                <Menu size={20} className="text-primary" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-card border-l border-border">
              <div className="flex flex-col space-y-4 mt-8">
                <h3 className="text-xl font-dancing text-primary">Mars & Pim</h3>
                <p className="text-sm text-muted-foreground">A love app just for you ❤️</p>
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
