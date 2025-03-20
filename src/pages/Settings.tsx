import React, { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/hooks/use-sound';

const fontSizeOptions = [
  { value: '85', label: 'Small' },
  { value: '100', label: 'Medium' },
  { value: '115', label: 'Large' },
];

const Settings: React.FC = () => {
  const { theme, font, setTheme, setFont, previewTheme, previewFont, setPreviewTheme, setPreviewFont, saveSettings } = useTheme();
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontScale') || '100');
  const { toast } = useToast();
  const { playSound } = useSound();
  
  const handleThemeChange = (newTheme: string) => {
    playSound('click');
    setPreviewTheme(newTheme);
  };
  
  const handleFontChange = (newFont: string) => {
    playSound('click');
    setPreviewFont(newFont);
  };
  
  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('fontScale', newSize);
    playSound('click');
  };
  
  const handleSaveSettings = () => {
    saveSettings();
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully!",
      variant: "default",
    });
    
    playSound('success');
  };
  
  const cancelPreview = () => {
    setPreviewTheme(null);
    setPreviewFont(null);
    playSound('click');
  };
  
  const getColorForTheme = (themeName: string) => {
    switch (themeName) {
      case 'default': return 'bg-love-gradient';
      case 'mars': return 'bg-mars-gradient';
      case 'ocean': return 'bg-ocean-gradient';
      case 'forest': return 'bg-forest-gradient';
      case 'sunset': return 'bg-sunset-gradient';
      case 'midnight': return 'bg-midnight-gradient';
      case 'retro': return 'bg-retro-gradient';
      case 'pastel': return 'bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200';
      default: return 'bg-love-gradient';
    }
  };
  
  const getFontLabel = (fontName: string) => {
    switch (fontName) {
      case 'quicksand': return 'Quicksand';
      case 'poppins': return 'Poppins';
      case 'dancing': return 'Dancing Script';
      case 'montserrat': return 'Montserrat';
      case 'serif': return 'Serif';
      case 'fredoka': return 'Fredoka One';
      case 'mono': return 'Roboto Mono';
      default: return 'Default';
    }
  };
  
  const activeTheme = previewTheme || theme;
  const activeFont = previewFont || font;
  
  const showSaveButton = previewTheme !== null || previewFont !== null;
  
  return (
    <Layout>
      <div className="container max-w-4xl mt-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Default Love Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'default' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('default')}
                    >
                      <div className="theme-box-preview bg-love-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Love</span>
                      </div>
                      {activeTheme === 'default' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Mars Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'mars' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('mars')}
                    >
                      <div className="theme-box-preview bg-mars-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Mars</span>
                      </div>
                      {activeTheme === 'mars' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Ocean Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'ocean' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('ocean')}
                    >
                      <div className="theme-box-preview bg-ocean-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Ocean</span>
                      </div>
                      {activeTheme === 'ocean' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Forest Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'forest' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('forest')}
                    >
                      <div className="theme-box-preview bg-forest-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Forest</span>
                      </div>
                      {activeTheme === 'forest' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Sunset Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'sunset' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('sunset')}
                    >
                      <div className="theme-box-preview bg-sunset-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Sunset</span>
                      </div>
                      {activeTheme === 'sunset' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Midnight Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'midnight' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('midnight')}
                    >
                      <div className="theme-box-preview bg-midnight-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Midnight</span>
                      </div>
                      {activeTheme === 'midnight' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Retro Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'retro' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('retro')}
                    >
                      <div className="theme-box-preview bg-retro-gradient"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Retro</span>
                      </div>
                      {activeTheme === 'retro' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Pastel Theme */}
                    <div 
                      className={`theme-box ${activeTheme === 'pastel' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('pastel')}
                    >
                      <div className="theme-box-preview bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200"></div>
                      <div className="theme-box-label">
                        <span className="text-sm font-medium">Pastel</span>
                      </div>
                      {activeTheme === 'pastel' && (
                        <div className="theme-box-check">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Font Style</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Quicksand Font */}
                    <div 
                      className={`font-box font-quicksand ${activeFont === 'quicksand' ? 'active' : ''}`}
                      onClick={() => handleFontChange('quicksand')}
                    >
                      <span className="text-lg">Quicksand</span>
                    </div>
                    
                    {/* Poppins Font */}
                    <div 
                      className={`font-box font-poppins ${activeFont === 'poppins' ? 'active' : ''}`}
                      onClick={() => handleFontChange('poppins')}
                    >
                      <span className="text-lg">Poppins</span>
                    </div>
                    
                    {/* Dancing Script Font */}
                    <div 
                      className={`font-box font-dancing ${activeFont === 'dancing' ? 'active' : ''}`}
                      onClick={() => handleFontChange('dancing')}
                    >
                      <span className="text-lg">Dancing Script</span>
                    </div>
                    
                    {/* Montserrat Font */}
                    <div 
                      className={`font-box font-montserrat ${activeFont === 'montserrat' ? 'active' : ''}`}
                      onClick={() => handleFontChange('montserrat')}
                    >
                      <span className="text-lg">Montserrat</span>
                    </div>
                    
                    {/* Serif Font */}
                    <div 
                      className={`font-box font-serif ${activeFont === 'serif' ? 'active' : ''}`}
                      onClick={() => handleFontChange('serif')}
                    >
                      <span className="text-lg">Serif</span>
                    </div>
                    
                    {/* Fredoka One Font */}
                    <div 
                      className={`font-box font-fredoka ${activeFont === 'fredoka' ? 'active' : ''}`}
                      onClick={() => handleFontChange('fredoka')}
                    >
                      <span className="text-lg">Fredoka</span>
                    </div>
                    
                    {/* Roboto Mono Font */}
                    <div 
                      className={`font-box font-mono ${activeFont === 'mono' ? 'active' : ''}`}
                      onClick={() => handleFontChange('mono')}
                    >
                      <span className="text-lg">Roboto Mono</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="accessibility" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Font Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {fontSizeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`px-4 py-2 rounded-md transition-all ${
                          fontSize === option.value 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                        onClick={() => handleFontSizeChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {showSaveButton && (
              <div className="flex justify-end gap-2 mt-6 border-t pt-4">
                <Button variant="outline" onClick={cancelPreview}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings}>
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
