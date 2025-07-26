import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Users } from 'lucide-react';

export const WCAGInfo = () => {
  return (
    <section id="wcag-guidelines" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">About WCAG 2.1 Guidelines</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Understanding web accessibility standards and why they matter for creating inclusive digital experiences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* What is WCAG */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">What is WCAG?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <strong className="text-foreground">WCAG</strong> stands for Web Content Accessibility Guidelines. 
              These are international standards developed by the W3C to make web content more accessible to people with disabilities.
            </p>
            <p className="text-muted-foreground">
              Version 2.1 is the current standard that provides comprehensive guidelines for creating inclusive digital experiences.
            </p>
          </CardContent>
        </Card>

        {/* Why It Matters */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Why It Matters</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Over 1 billion people worldwide live with some form of disability. Poor color contrast can make content 
              impossible to read for people with visual impairments, color blindness, or aging-related vision changes.
            </p>
            <p className="text-muted-foreground">
              Good contrast benefits everyone, especially in bright sunlight or low-light conditions.
            </p>
          </CardContent>
        </Card>

        {/* Contrast Ratio */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Contrast Ratio</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Contrast ratio measures the difference in luminance between text and background colors. 
              It's calculated as a ratio from 1:1 (no contrast) to 21:1 (maximum contrast).
            </p>
            <p className="text-muted-foreground">
              Higher ratios mean better readability and accessibility for users with visual impairments.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Levels Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">WCAG 2.1 Compliance Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Level</th>
                  <th className="text-left py-3 px-4 font-semibold">Contrast Ratio</th>
                  <th className="text-left py-3 px-4 font-semibold">Text Size</th>
                  <th className="text-left py-3 px-4 font-semibold">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="border-warning text-warning">
                      AA
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-mono">4.5:1</td>
                  <td className="py-4 px-4 text-muted-foreground">Normal text</td>
                  <td className="py-4 px-4 text-muted-foreground">
                    Minimum standard for most websites. Required for legal compliance in many jurisdictions.
                  </td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="border-info text-info">
                      AA Large
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-mono">3:1</td>
                  <td className="py-4 px-4 text-muted-foreground">18pt+ or bold 14pt+</td>
                  <td className="py-4 px-4 text-muted-foreground">
                    Relaxed standard for large text like headings and prominent UI elements.
                  </td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="border-success text-success">
                      AAA
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-mono">7:1</td>
                  <td className="py-4 px-4 text-muted-foreground">Normal text</td>
                  <td className="py-4 px-4 text-muted-foreground">
                    Enhanced standard for better readability. Recommended for healthcare, finance, and critical applications.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};