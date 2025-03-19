
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Save, Undo, Eye, Moon, Sun, Volume2, Volume1, BellRing } from 'lucide-react';

const themeOptions = [
  { id: 'default', name: 'Default (Pink/Purple)', icon: '💕' },
  { id: 'space', name: 'Deep Space', icon: '🌌' },
  { id: 'galaxy', name: 'Cosmic Galaxy', icon: '✨' },
  { id: 'mars', name: 'Mars Red', icon: '🔴' },
  { id: 'ocean', name: 'Ocean Blue', icon: '🌊' },
  { id: 'forest', name: 'Forest Green', icon: '🌲' },
];

const fontOptions = [
  { id: 'quicksand', name: 'Quicksand', sample: 'quicksand' },
  { id: 'poppins', name: 'Poppins', sample: 'poppins' },
  { id: 'montserrat', name: 'Montserrat', sample: 'montserrat' },
  { id: 'dancing', name: 'Dancing Script', sample: 'dancing' },
  { id: 'serif', name: 'Merriweather', sample: 'serif' },
];

const formSchema = z.object({
  theme: z.string(),
  font: z.string(),
  animationSpeed: z.number().min(0).max(100),
  darkMode: z.boolean().optional(),
  notificationsEnabled: z.boolean().optional(),
  soundEffects: z.boolean().optional(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const Settings = () => {
  const { 
    theme, 
    font, 
    setTheme, 
    setFont, 
    previewTheme,
    previewFont,
    setPreviewTheme,
    setPreviewFont,
    saveSettings
  } = useTheme();
  
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme,
      font,
      animationSpeed: 50,
      darkMode: false,
      notificationsEnabled: true,
      soundEffects: false,
    },
  });

  // Reset preview when component unmounts
  useEffect(() => {
    return () => {
      setPreviewTheme(null);
      setPreviewFont(null);
    };
  }, [setPreviewTheme, setPreviewFont]);

  // Watch for form value changes to update preview
  const watchedTheme = form.watch('theme');
  const watchedFont = form.watch('font');
  
  // Update previews when form values change
  useEffect(() => {
    if (watchedTheme !== theme) {
      setPreviewTheme(watchedTheme);
      setHasUnsavedChanges(true);
    } else if (previewTheme) {
      setPreviewTheme(null);
    }
  }, [watchedTheme, theme, previewTheme, setPreviewTheme]);
  
  useEffect(() => {
    if (watchedFont !== font) {
      setPreviewFont(watchedFont);
      setHasUnsavedChanges(true);
    } else if (previewFont) {
      setPreviewFont(null);
    }
  }, [watchedFont, font, previewFont, setPreviewFont]);

  const onSubmit = (data: SettingsFormValues) => {
    setTheme(data.theme);
    setFont(data.font);
    saveSettings();
    setHasUnsavedChanges(false);
    
    toast({
      title: "Settings saved",
      description: "Your appearance preferences have been updated.",
    });
  };
  
  const cancelPreview = () => {
    form.reset({
      theme,
      font,
      animationSpeed: 50,
      darkMode: false,
      notificationsEnabled: true,
      soundEffects: false,
    });
    setPreviewTheme(null);
    setPreviewFont(null);
    setHasUnsavedChanges(false);
  };

  // Get background class based on current theme (for previewing card backgrounds)
  const getThemeCardClass = (themeId: string) => {
    const isActive = (previewTheme || theme) === themeId;
    
    let bgClass = 'bg-white';
    
    if (themeId === 'space') {
      bgClass = 'bg-[#151A45] text-white';
    } else if (themeId === 'galaxy') {
      bgClass = 'bg-[#4C1D95] text-white';
    } else if (themeId === 'mars') {
      bgClass = 'bg-[#FCA5A5] text-[#7c2d12]';
    } else if (themeId === 'ocean') {
      bgClass = 'bg-[#BAE6FD] text-[#0c4a6e]';
    } else if (themeId === 'forest') {
      bgClass = 'bg-[#BBF7D0] text-[#14532d]';
    }
    
    return `${bgClass} ${
      isActive 
        ? 'ring-2 ring-primary ring-offset-2' 
        : 'border border-gray-200 hover:border-primary/50'
    }`;
  };

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-dancing font-bold text-primary mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="p-6 bg-card rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Theme</h2>
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-card-foreground">Choose a color theme</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {themeOptions.map((themeOption) => (
                          <div
                            key={themeOption.id}
                            className={`flex items-center space-x-2 p-4 rounded-lg cursor-pointer transition-all ${getThemeCardClass(themeOption.id)}`}
                            onClick={() => field.onChange(themeOption.id)}
                          >
                            <RadioGroupItem value={themeOption.id} id={`theme-${themeOption.id}`} />
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{themeOption.icon}</span>
                              <span>{themeOption.name}</span>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="p-6 bg-card rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Typography</h2>
              <FormField
                control={form.control}
                name="font"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-card-foreground">Choose a font family</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        {fontOptions.map((fontOption) => (
                          <div
                            key={fontOption.id}
                            className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-all bg-card ${
                              field.value === fontOption.id
                                ? 'border-primary bg-primary/5'
                                : 'border-muted hover:border-primary/50'
                            }`}
                            onClick={() => field.onChange(fontOption.id)}
                          >
                            <RadioGroupItem value={fontOption.id} id={`font-${fontOption.id}`} />
                            <div className="flex flex-col">
                              <span className={`font-${fontOption.sample} text-lg text-card-foreground`}>
                                {fontOption.name}
                              </span>
                              <span className={`font-${fontOption.sample} text-sm text-muted-foreground`}>
                                The quick brown fox jumps over the lazy dog
                              </span>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="p-6 bg-card rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Display & Accessibility</h2>
              
              <div className="space-y-6">
                {/* Animation Speed */}
                <FormField
                  control={form.control}
                  name="animationSpeed"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex justify-between">
                        <FormLabel className="text-card-foreground">Animation Speed</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value}%</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={10}
                          defaultValue={[field.value]}
                          onValueChange={(values) => field.onChange(values[0])}
                          className="py-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Dark Mode */}
                <FormField
                  control={form.control}
                  name="darkMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Moon className="mr-2 h-4 w-4" />
                          Dark Mode
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Use dark mode for lower eye strain
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="p-6 bg-card rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Notifications & Sound</h2>
              
              <div className="space-y-4">
                {/* Notifications */}
                <FormField
                  control={form.control}
                  name="notificationsEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <BellRing className="mr-2 h-4 w-4" />
                          Notifications
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications for new love letters
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Sound Effects */}
                <FormField
                  control={form.control}
                  name="soundEffects"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Volume2 className="mr-2 h-4 w-4" />
                          Sound Effects
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Play sound effects when interacting with the app
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              {hasUnsavedChanges && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={cancelPreview}
                  className="flex-1"
                >
                  <Undo className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
              
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Settings;
