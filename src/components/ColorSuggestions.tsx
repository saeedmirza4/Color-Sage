import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Shuffle } from 'lucide-react';

interface ColorSuggestionsProps {
  textColor: string;
  backgroundColor: string;
  onColorChange: (type: 'text' | 'background', color: string) => void;
}

export function ColorSuggestions({ textColor, backgroundColor, onColorChange }: ColorSuggestionsProps) {
  const [suggestionsType, setSuggestionsType] = useState<'text' | 'background'>('text');

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // Calculate relative luminance
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  // Generate accessible color variations
  const generateAccessibleColors = (baseColor: string, targetColor: string, targetContrast: number = 4.5) => {
    const baseRgb = hexToRgb(baseColor);
    if (!baseRgb) return [];

    const suggestions = [];
    
    // Generate lighter and darker variations
    for (let i = 0; i < 10; i++) {
      const factor = (i + 1) * 0.1;
      
      // Lighter version
      const lighterR = Math.min(255, baseRgb.r + (255 - baseRgb.r) * factor);
      const lighterG = Math.min(255, baseRgb.g + (255 - baseRgb.g) * factor);
      const lighterB = Math.min(255, baseRgb.b + (255 - baseRgb.b) * factor);
      const lighterHex = rgbToHex(lighterR, lighterG, lighterB);
      
      // Darker version
      const darkerR = Math.max(0, baseRgb.r * (1 - factor));
      const darkerG = Math.max(0, baseRgb.g * (1 - factor));
      const darkerB = Math.max(0, baseRgb.b * (1 - factor));
      const darkerHex = rgbToHex(darkerR, darkerG, darkerB);
      
      const lighterContrast = getContrastRatio(lighterHex, targetColor);
      const darkerContrast = getContrastRatio(darkerHex, targetColor);
      
      if (lighterContrast >= targetContrast) {
        suggestions.push({ color: lighterHex, contrast: lighterContrast });
      }
      
      if (darkerContrast >= targetContrast) {
        suggestions.push({ color: darkerHex, contrast: darkerContrast });
      }
    }

    // Remove duplicates and sort by contrast ratio
    const unique = suggestions.filter((item, index, self) => 
      index === self.findIndex(t => t.color === item.color)
    ).sort((a, b) => b.contrast - a.contrast);

    return unique.slice(0, 6);
  };

  const currentContrast = getContrastRatio(textColor, backgroundColor);
  const needsSuggestions = currentContrast < 4.5;

  const textSuggestions = generateAccessibleColors(textColor, backgroundColor);
  const backgroundSuggestions = generateAccessibleColors(backgroundColor, textColor);

  if (!needsSuggestions) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10">
            <Lightbulb className="h-6 w-6 text-success" />
          </div>
          <h3 className="font-semibold text-success">Great Contrast!</h3>
          <p className="text-sm text-muted-foreground">
            Your color combination meets WCAG accessibility standards.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold">Color Suggestions</h3>
        </div>
        <Badge variant="outline" className="border-warning text-warning">
          Needs Improvement
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        Your current contrast ratio is {currentContrast.toFixed(2)}:1. Try these accessible alternatives:
      </p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={suggestionsType === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSuggestionsType('text')}
          >
            Text Color
          </Button>
          <Button
            variant={suggestionsType === 'background' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSuggestionsType('background')}
          >
            Background
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(suggestionsType === 'text' ? textSuggestions : backgroundSuggestions).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onColorChange(suggestionsType, suggestion.color)}
              className="group p-3 rounded-lg border border-border hover:border-primary transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded border border-border flex-shrink-0"
                  style={{ 
                    backgroundColor: suggestion.color,
                    border: `2px solid ${suggestion.color === '#ffffff' ? '#e5e7eb' : suggestion.color}40`
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono truncate">{suggestion.color}</p>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.contrast.toFixed(1)}:1
                  </p>
                </div>
              </div>
              <Badge 
                variant={suggestion.contrast >= 7 ? 'default' : 'secondary'}
                className={`text-xs ${
                  suggestion.contrast >= 7 
                    ? 'bg-success hover:bg-success/80' 
                    : suggestion.contrast >= 4.5 
                      ? 'bg-info hover:bg-info/80'
                      : ''
                }`}
              >
                {suggestion.contrast >= 7 ? 'AAA' : 'AA'}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}