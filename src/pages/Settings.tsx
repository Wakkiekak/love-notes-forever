
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
      variant: "success",
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
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'default' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('default')}
                    >
                      <div className="w-full aspect-square bg-love-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Love</span>
                      </div>
                      {activeTheme === 'default' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Mars Theme */}
                    <div 
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'mars' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('mars')}
                    >
                      <div className="w-full aspect-square bg-mars-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Mars</span>
                      </div>
                      {activeTheme === 'mars' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Ocean Theme */}
                    <div 
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'ocean' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('ocean')}
                    >
                      <div className="w-full aspect-square bg-ocean-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Ocean</span>
                      </div>
                      {activeTheme === 'ocean' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Forest Theme */}
                    <div 
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'forest' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('forest')}
                    >
                      <div className="w-full aspect-square bg-forest-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Forest</span>
                      </div>
                      {activeTheme === 'forest' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Sunset Theme */}
                    <div 
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'sunset' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('sunset')}
                    >
                      <div className="w-full aspect-square bg-sunset-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Sunset</span>
                      </div>
                      {activeTheme === 'sunset' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Midnight Theme */}
                    <div 
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'midnight' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('midnight')}
                    >
                      <div className="w-full aspect-square bg-midnight-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Midnight</span>
                      </div>
                      {activeTheme === 'midnight' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Retro Theme */}
                    <div 
                      className={`relative rounded-lg cursor-pointer transition-all overflow-hidden 
                        ${activeTheme === 'retro' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
                      onClick={() => handleThemeChange('retro')}
                    >
                      <div className="w-full aspect-square bg-retro-gradient"></div>
                      <div className="p-2 text-center">
                        <span className="text-sm font-medium">Retro</span>
                      </div>
                      {activeTheme === 'retro' && (
                        <div className="absolute top-2 right-2 bg-background rounded-full p-0.5">
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
                      className={`p-4 rounded-lg cursor-pointer text-center font-quicksand 
                        ${activeFont === 'quicksand' ? 'bg-primary/10 border border-primary/30' : 'bg-muted hover:bg-muted/80'}`}
                      onClick={() => handleFontChange('quicksand')}
                    >
                      <span className="text-lg">Quicksand</span>
                    </div>
                    
                    {/* Poppins Font */}
                    <div 
                      className={`p-4 rounded-lg cursor-pointer text-center font-poppins 
                        ${activeFont === 'poppins' ? 'bg-primary/10 border border-primary/30' : 'bg-muted hover:bg-muted/80'}`}
                      onClick={() => handleFontChange('poppins')}
                    >
                      <span className="text-lg">Poppins</span>
                    </div>
                    
                    {/* Dancing Script Font */}
                    <div 
                      className={`p-4 rounded-lg cursor-pointer text-center font-dancing 
                        ${activeFont === 'dancing' ? 'bg-primary/10 border border-primary/30' : 'bg-muted hover:bg-muted/80'}`}
                      onClick={() => handleFontChange('dancing')}
                    >
                      <span className="text-lg">Dancing Script</span>
                    </div>
                    
                    {/* Montserrat Font */}
                    <div 
                      className={`p-4 rounded-lg cursor-pointer text-center font-montserrat 
                        ${activeFont === 'montserrat' ? 'bg-primary/10 border border-primary/30' : 'bg-muted hover:bg-muted/80'}`}
                      onClick={() => handleFontChange('montserrat')}
                    >
                      <span className="text-lg">Montserrat</span>
                    </div>
                    
                    {/* Serif Font */}
                    <div 
                      className={`p-4 rounded-lg cursor-pointer text-center font-serif 
                        ${activeFont === 'serif' ? 'bg-primary/10 border border-primary/30' : 'bg-muted hover:bg-muted/80'}`}
                      onClick={() => handleFontChange('serif')}
                    >
                      <span className="text-lg">Serif</span>
                    </div>
                    
                    {/* Fredoka One Font */}
                    <div 
                      className={`p-4 rounded-lg cursor-pointer text-center font-fredoka 
                        ${activeFont === 'fredoka' ? 'bg-primary/10 border border-primary/30' : 'bg-muted hover:bg-muted/80'}`}
                      onClick={() => handleFontChange('fredoka')}
                    >
                      <span className="text-lg">Fredoka</span>
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
