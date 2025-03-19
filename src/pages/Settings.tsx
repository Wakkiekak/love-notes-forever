
import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const themeOptions = [
  { id: 'default', name: 'Default (Pink/Purple)', icon: '💕' },
  { id: 'space', name: 'Deep Space', icon: '🌌' },
  { id: 'galaxy', name: 'Cosmic Galaxy', icon: '✨' },
  { id: 'mars', name: 'Mars Red', icon: '🔴' },
];

const fontOptions = [
  { id: 'quicksand', name: 'Quicksand', sample: 'quicksand' },
  { id: 'poppins', name: 'Poppins', sample: 'poppins' },
  { id: 'montserrat', name: 'Montserrat', sample: 'montserrat' },
  { id: 'merriweather', name: 'Merriweather', sample: 'serif' },
];

const formSchema = z.object({
  theme: z.string(),
  font: z.string(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const Settings = () => {
  const { theme, font, setTheme, setFont } = useTheme();
  const { toast } = useToast();
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme,
      font,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    setTheme(data.theme);
    setFont(data.font);
    toast({
      title: "Settings saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-dancing font-bold text-love-600 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your experience</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Theme</h2>
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose a color theme</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {themeOptions.map((themeOption) => (
                          <div
                            key={themeOption.id}
                            className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-all ${
                              field.value === themeOption.id
                                ? 'border-love-500 bg-love-50'
                                : 'border-gray-200 hover:border-love-200'
                            }`}
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

            <div className="p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Typography</h2>
              <FormField
                control={form.control}
                name="font"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose a font family</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        {fontOptions.map((fontOption) => (
                          <div
                            key={fontOption.id}
                            className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-all ${
                              field.value === fontOption.id
                                ? 'border-love-500 bg-love-50'
                                : 'border-gray-200 hover:border-love-200'
                            }`}
                            onClick={() => field.onChange(fontOption.id)}
                          >
                            <RadioGroupItem value={fontOption.id} id={`font-${fontOption.id}`} />
                            <div className="flex flex-col">
                              <span className={`font-${fontOption.sample} text-lg`}>{fontOption.name}</span>
                              <span className={`font-${fontOption.sample} text-sm text-gray-500`}>
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

            <Button type="submit" className="w-full love-button flex items-center justify-center">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Settings;
