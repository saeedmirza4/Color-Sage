import { useState } from 'react';
import { ColorInput } from '@/components/ColorInput';
import { ContrastChecker } from '@/components/ContrastChecker';
import { LivePreview } from '@/components/LivePreview';
import { ColorSuggestions } from '@/components/ColorSuggestions';
import { WCAGInfo } from '@/components/WCAGInfo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Palette, Eye, Shield, ArrowDown } from 'lucide-react';

const Index = () => {
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleColorChange = (type: 'text' | 'background', color: string) => {
    if (type === 'text') {
      setTextColor(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const scrollToWCAG = () => {
    document.getElementById('wcag-guidelines')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ColorSage</h1>
                <p className="text-sm text-muted-foreground">Accessible Color Palette Checker</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={scrollToWCAG}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <ArrowDown className="h-4 w-4 mr-2" />
                What is WCAG 2.1?
              </Button>
              <ThemeToggle />
              <Badge variant="outline" className="border-primary text-primary">
                WCAG 2.1 Compliant
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Title Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                WCAG 2.1 Compliant
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
                Design with
                <span className="block text-primary">Accessibility in Mind</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ensure your color combinations meet accessibility standards with real-time WCAG 2.1 compliance checking, intelligent suggestions, and live previews.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Live Preview</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">WCAG 2.1 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Smart Suggestions</span>
              </div>
            </div>
          </div>

          {/* Color Controls */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <ColorInput
              label="Text Color"
              value={textColor}
              onChange={setTextColor}
              id="text-color"
            />
            <ColorInput
              label="Background Color"
              value={backgroundColor}
              onChange={setBackgroundColor}
              id="background-color"
            />
          </div>

          {/* Analysis Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <ContrastChecker
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
              <ColorSuggestions
                textColor={textColor}
                backgroundColor={backgroundColor}
                onColorChange={handleColorChange}
              />
            </div>
            
            <div className="lg:col-span-2">
              <LivePreview
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </div>
          </div>
          
          {/* WCAG Guidelines Section */}
          <div className="mt-16">
            <WCAGInfo />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span className="font-semibold">ColorSage</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with accessibility in mind. Helping designers create inclusive experiences.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 ColorSage. Compliant with WCAG 2.1 AA/AAA standards.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
