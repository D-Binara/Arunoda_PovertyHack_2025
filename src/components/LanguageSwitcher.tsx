"use client";

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setLanguage, getLanguage, type Language } from '@/lib/i18n';

const languages = [
  { code: 'en' as Language, name: 'English', native: 'English' },
  { code: 'si' as Language, name: 'Sinhala', native: 'සිංහල' },
  { code: 'ta' as Language, name: 'Tamil', native: 'தமிழ்' },
];

export function LanguageSwitcher() {
  const [current, setCurrent] = useState<Language>('en');

  useEffect(() => {
    setCurrent(getLanguage());
  }, []);

  const handleChange = (lang: Language) => {
    setLanguage(lang);
    setCurrent(lang);
    window.location.reload(); // Reload to apply language
  };

  const currentLang = languages.find(l => l.code === current);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          {currentLang?.native}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={current === lang.code ? 'bg-accent' : ''}
          >
            {lang.native} ({lang.name})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
