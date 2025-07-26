import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Copy, Info } from 'lucide-react';
import { toast } from 'sonner';

interface ContrastResult {
  ratio: number;
  aaPass: boolean;
  aaaPass: boolean;
  aaLargePass: boolean;
  aaaLargePass: boolean;
}

interface ContrastCheckerProps {
  textColor: string;
  backgroundColor: string;
}

export function ContrastChecker({ textColor, backgroundColor }: ContrastCheckerProps) {
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

  const contrastRatio = getContrastRatio(textColor, backgroundColor);
  
  const result: ContrastResult = {
    ratio: contrastRatio,
    aaPass: contrastRatio >= 4.5,
    aaaPass: contrastRatio >= 7,
    aaLargePass: contrastRatio >= 3,
    aaaLargePass: contrastRatio >= 4.5,
  };

  const copyContrastInfo = async () => {
    const info = `Contrast Ratio: ${result.ratio.toFixed(2)}:1
Text: ${textColor}
Background: ${backgroundColor}
WCAG AA Normal: ${result.aaPass ? 'PASS' : 'FAIL'}
WCAG AAA Normal: ${result.aaaPass ? 'PASS' : 'FAIL'}
WCAG AA Large: ${result.aaLargePass ? 'PASS' : 'FAIL'}
WCAG AAA Large: ${result.aaaLargePass ? 'PASS' : 'FAIL'}`;

    try {
      await navigator.clipboard.writeText(info);
      toast.success('Contrast info copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle2 className="h-4 w-4 text-success" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    );
  };

  const getStatusBadge = (passed: boolean, level: string) => {
    return (
      <Badge 
        variant={passed ? "default" : "destructive"}
        className={passed ? "bg-success hover:bg-success/80" : ""}
      >
        {level} {passed ? 'PASS' : 'FAIL'}
      </Badge>
    );
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contrast Analysis</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyContrastInfo}
          className="h-8 w-8 p-0 hover:bg-secondary"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center space-y-2">
        <div className="text-3xl font-bold text-primary">
          {result.ratio.toFixed(2)}:1
        </div>
        <p className="text-sm text-muted-foreground">Contrast Ratio</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium">Normal Text</h4>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            {getStatusBadge(result.aaPass, 'AA')}
            {getStatusBadge(result.aaaPass, 'AAA')}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium">Large Text</h4>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            {getStatusBadge(result.aaLargePass, 'AA')}
            {getStatusBadge(result.aaaLargePass, 'AAA')}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            WCAG 2.1 Guidelines
          </p>
          <ul className="space-y-1 text-xs ml-6">
            <li>• AA Normal: 4.5:1 minimum</li>
            <li>• AAA Normal: 7:1 minimum</li>
            <li>• Large Text: 18pt+ or 14pt+ bold</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}