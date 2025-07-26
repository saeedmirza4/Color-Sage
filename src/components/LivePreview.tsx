import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LivePreviewProps {
  textColor: string;
  backgroundColor: string;
}

export function LivePreview({ textColor, backgroundColor }: LivePreviewProps) {
  const previewStyles = {
    color: textColor,
    backgroundColor: backgroundColor,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <Badge variant="outline">Real-time</Badge>
      </div>

      <div className="grid gap-4">
        {/* Typography Samples */}
        <Card className="p-6" style={previewStyles}>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              Heading Level 1
            </h1>
            <h2 className="text-2xl font-semibold">
              Heading Level 2
            </h2>
            <h3 className="text-xl font-medium">
              Heading Level 3
            </h3>
            <p className="text-base leading-relaxed">
              This is a paragraph of normal text to demonstrate readability with the current color combination. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-sm">
              This is smaller text that might be used for captions or secondary information.
            </p>
          </div>
        </Card>

        {/* Interactive Elements */}
        <Card className="p-6" style={previewStyles}>
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Interactive Elements</h4>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                style={{ 
                  backgroundColor: textColor, 
                  color: backgroundColor,
                  borderColor: textColor 
                }}
                className="hover:opacity-90"
              >
                Primary Button
              </Button>
              
              <Button 
                variant="outline"
                style={{ 
                  color: textColor,
                  borderColor: textColor 
                }}
                className="hover:opacity-90"
              >
                Outline Button
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Form Label
              </label>
              <input
                type="text"
                placeholder="Input field placeholder"
                className="w-full px-3 py-2 border rounded-md"
                style={{ 
                  color: textColor,
                  backgroundColor: backgroundColor,
                  borderColor: textColor + '40'
                }}
              />
            </div>
          </div>
        </Card>

        {/* Navigation & Cards */}
        <Card className="p-6" style={previewStyles}>
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Navigation & Links</h4>
            
            <nav className="flex gap-6">
              <a href="#" className="hover:underline font-medium">
                Home
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Services
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </nav>

            <div className="mt-6">
              <div 
                className="p-4 rounded-lg border"
                style={{ borderColor: textColor + '20' }}
              >
                <h5 className="font-medium mb-2">Card Component</h5>
                <p className="text-sm">
                  This demonstrates how cards and containers would appear with your color selection.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Status Messages */}
        <Card className="p-6" style={previewStyles}>
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Status Messages</h4>
            
            <div className="space-y-3">
              <div 
                className="p-3 rounded border-l-4"
                style={{ borderLeftColor: '#10b981', backgroundColor: textColor + '10' }}
              >
                <p className="text-sm">Success: Operation completed successfully!</p>
              </div>
              
              <div 
                className="p-3 rounded border-l-4"
                style={{ borderLeftColor: '#f59e0b', backgroundColor: textColor + '10' }}
              >
                <p className="text-sm">Warning: Please review your input.</p>
              </div>
              
              <div 
                className="p-3 rounded border-l-4"
                style={{ borderLeftColor: '#ef4444', backgroundColor: textColor + '10' }}
              >
                <p className="text-sm">Error: Something went wrong.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}