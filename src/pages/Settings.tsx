
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Save, Undo, Eye, Moon, Sun, Volume2, Volume1, BellRing, Languages, Palette } from 'lucide-react';

const themeOptions = [
  { id: 'default', name: 'Default', description: 'Pink/Purple', icon: '💕' },
  { id: 'space', name: 'Deep Space', description: 'Dark blue theme', icon: '🌌' },
  { id: 'galaxy', name: 'Galaxy', description: 'Purple cosmic', icon: '✨' },
  { id: 'mars', name: 'Mars', description: 'Red/orange', icon: '🔴' },
  { id: 'ocean', name: 'Ocean', description: 'Blue/teal', icon: '🌊' },
  { id: 'forest', name: 'Forest', description: 'Green/brown', icon: '🌲' },
  { id: 'sunset', name: 'Sunset', description: 'Orange/purple', icon: '🌅' },
  { id: 'midnight', name: 'Midnight', description: 'Dark blue/purple', icon: '🌃' },
  { id: 'retro', name: 'Retro', description: 'Vintage colors', icon: '📼' },
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
  autoTranslate: z.boolean().optional(),
  highContrast: z.boolean().optional(),
  fontScale: z.number().min(80).max(150),
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
      animationSpeed: parseInt(localStorage.getItem('animationSpeed') || '50'),
      darkMode: localStorage.getItem('darkMode') === 'true',
      notificationsEnabled: localStorage.getItem('notificationsEnabled') === 'true',
      soundEffects: localStorage.getItem('soundEffects') === 'true',
      autoTranslate: localStorage.getItem('autoTranslate') === 'true',
      highContrast: localStorage.getItem('highContrast') === 'true',
      fontScale: parseInt(localStorage.getItem('fontScale') || '100'),
    },
  });

  useEffect(() => {
    return () => {
      setPreviewTheme(null);
      setPreviewFont(null);
    };
  }, [setPreviewTheme, setPreviewFont]);

  const watchedTheme = form.watch('theme');
  const watchedFont = form.watch('font');
  const watchedDarkMode = form.watch('darkMode');
  const watchedSoundEffects = form.watch('soundEffects');
  
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

  useEffect(() => {
    if (watchedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [watchedDarkMode]);
  
  useEffect(() => {
    if (watchedSoundEffects && hasUnsavedChanges) {
      playUISound('click');
    }
  }, [watchedTheme, watchedFont, watchedSoundEffects, hasUnsavedChanges]);
  
  const playUISound = (type: 'click' | 'success' | 'notification') => {
    if (!watchedSoundEffects) return;
    
    const audioMap = {
      click: new Audio('/sounds/click.mp3'),
      success: new Audio('/sounds/success.mp3'),
      notification: new Audio('/sounds/notification.mp3')
    };
    
    audioMap[type].volume = 0.3;
    audioMap[type].play().catch(e => console.error("Audio play failed:", e));
  };

  const onSubmit = (data: SettingsFormValues) => {
    setTheme(data.theme);
    setFont(data.font);
    
    localStorage.setItem('darkMode', data.darkMode ? 'true' : 'false');
    localStorage.setItem('soundEffects', data.soundEffects ? 'true' : 'false');
    localStorage.setItem('animationSpeed', data.animationSpeed.toString());
    localStorage.setItem('notificationsEnabled', data.notificationsEnabled ? 'true' : 'false');
    localStorage.setItem('autoTranslate', data.autoTranslate ? 'true' : 'false');
    localStorage.setItem('highContrast', data.highContrast ? 'true' : 'false');
    localStorage.setItem('fontScale', data.fontScale.toString());
    
    saveSettings();
    setHasUnsavedChanges(false);
    
    if (data.soundEffects) {
      playUISound('success');
    }
    
    toast({
      title: "Settings saved",
      description: "Your appearance preferences have been updated.",
    });
    
    if (data.notificationsEnabled) {
      requestNotificationPermission();
    }
  };
  
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Notifications Enabled', {
              body: 'You will now receive notifications for new love letters.',
              icon: '/favicon.ico'
            });
          }
        });
      } else if (Notification.permission === 'granted') {
        new Notification('Settings Updated', {
          body: 'Your settings have been saved successfully!',
          icon: '/favicon.ico'
        });
      }
    }
  };
  
  const cancelPreview = () => {
    form.reset({
      theme,
      font,
      animationSpeed: parseInt(localStorage.getItem('animationSpeed') || '50'),
      darkMode: localStorage.getItem('darkMode') === 'true',
      notificationsEnabled: localStorage.getItem('notificationsEnabled') === 'true',
      soundEffects: localStorage.getItem('soundEffects') === 'true',
    });
    setPreviewTheme(null);
    setPreviewFont(null);
    setHasUnsavedChanges(false);
    document.documentElement.classList.remove('dark');
  };

  const getThemeCardClass = (themeId: string) => {
    const isActive = (previewTheme || theme) === themeId;
    
    let bgClass = 'bg-white';
    
    if (themeId === 'space') {
      bgClass = 'bg-[#151A45] text-white';
    } else if (themeId === 'galaxy') {
      bgClass = 'bg-[#4C1D95] text-white';
    } else if (themeId === 'mars') {
      bgClass = 'bg-[#300A0A] text-amber-100';
    } else if (themeId === 'ocean') {
      bgClass = 'bg-[#BAE6FD] text-[#0c4a6e]';
    } else if (themeId === 'forest') {
      bgClass = 'bg-[#BBF7D0] text-[#14532d]';
    } else if (themeId === 'sunset') {
      bgClass = 'bg-gradient-to-r from-orange-400 to-purple-400 text-white';
    } else if (themeId === 'midnight') {
      bgClass = 'bg-[#0D1231] text-indigo-100';
    } else if (themeId === 'retro') {
      bgClass = 'bg-[#E8E5D7] text-[#5E4C3E]';
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
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (watchedSoundEffects) playUISound('click');
                        }}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {themeOptions.map((themeOption) => (
                          <div
                            key={themeOption.id}
                            className={`relative flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all ${getThemeCardClass(themeOption.id)} h-16 w-full`}
                            onClick={() => {
                              field.onChange(themeOption.id);
                              if (watchedSoundEffects) playUISound('click');
                            }}
                          >
                            <RadioGroupItem value={themeOption.id} id={`theme-${themeOption.id}`} />
                            <div className="flex flex-col max-w-[75%]">
                              <div className="flex items-center">
                                <span className="text-lg mr-1">{themeOption.icon}</span>
                                <span className="font-medium text-sm">{themeOption.name}</span>
                              </div>
                              <span className="text-xs opacity-75 truncate">{themeOption.description}</span>
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
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (watchedSoundEffects) playUISound('click');
                        }}
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
                            onClick={() => {
                              field.onChange(fontOption.id);
                              if (watchedSoundEffects) playUISound('click');
                            }}
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
                          onValueChange={(values) => {
                            field.onChange(values[0]);
                            setHasUnsavedChanges(true);
                            if (watchedSoundEffects) playUISound('click');
                          }}
                          className="py-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fontScale"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex justify-between">
                        <FormLabel className="text-card-foreground">Font Size</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value}%</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={80}
                          max={150}
                          step={5}
                          defaultValue={[field.value]}
                          onValueChange={(values) => {
                            field.onChange(values[0]);
                            document.documentElement.style.fontSize = `${values[0]}%`;
                            setHasUnsavedChanges(true);
                            if (watchedSoundEffects) playUISound('click');
                          }}
                          className="py-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
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
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setHasUnsavedChanges(true);
                            if (watchedSoundEffects) playUISound('click');
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="highContrast"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Palette className="mr-2 h-4 w-4" />
                          High Contrast
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Enhance contrast for better readability
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setHasUnsavedChanges(true);
                            if (watchedSoundEffects) playUISound('click');
                          }}
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
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setHasUnsavedChanges(true);
                            if (watchedSoundEffects) playUISound('click');
                            if (checked) {
                              requestNotificationPermission();
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
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
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setHasUnsavedChanges(true);
                            if (checked) {
                              playUISound('click');
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="autoTranslate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Languages className="mr-2 h-4 w-4" />
                          Auto-Translate
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Auto-translate messages to your preferred language
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setHasUnsavedChanges(true);
                            if (watchedSoundEffects) playUISound('click');
                          }}
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
                onClick={() => watchedSoundEffects && playUISound('click')}
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
