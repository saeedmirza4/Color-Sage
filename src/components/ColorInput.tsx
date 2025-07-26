import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  id: string;
}

export function ColorInput({ label, value, onChange, id }: ColorInputProps) {
  const [hexInput, setHexInput] = useState(value);
  const [isValidHex, setIsValidHex] = useState(true);

  // Validate hex color
  const validateHex = (hex: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(hex);
  };

  useEffect(() => {
    setHexInput(value);
    setIsValidHex(validateHex(value));
  }, [value]);

  const handleHexChange = (newHex: string) => {
    setHexInput(newHex);
    const isValid = validateHex(newHex);
    setIsValidHex(isValid);
    
    if (isValid) {
      onChange(newHex);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setHexInput(newColor);
    setIsValidHex(true);
    onChange(newColor);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-base font-semibold">
          {label}
        </Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 hover:bg-secondary"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <Input
            id={id}
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#000000"
            className={`font-mono ${!isValidHex ? 'border-destructive' : ''}`}
          />
          {!isValidHex && (
            <p className="text-sm text-destructive mt-1">
              Please enter a valid hex color (e.g., #000000)
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={handleColorPickerChange}
              className="sr-only"
              id={`${id}-picker`}
            />
            <label
              htmlFor={`${id}-picker`}
              className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-border cursor-pointer transition-all hover:scale-105 hover:shadow-soft"
              style={{ backgroundColor: value }}
            >
              <Palette className="h-5 w-5 text-white drop-shadow-sm" />
            </label>
          </div>
          
          <div className="flex-1">
            <div
              className="h-12 rounded-lg border-2 border-border shadow-soft"
              style={{ backgroundColor: value }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}