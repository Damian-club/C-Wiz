"use client";

import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Assuming Input can be type="color"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch'; // For theme mode toggle

// Helper to convert HSL string to HEX for color input
// HSL format from CSS: "H S% L%" or "H S L"
const hslStringToHex = (hslStr: string): string => {
  try {
    const match = hslStr.match(/(\d+)\s*(\d+)%?\s*(\d+)%?/);
    if (!match) return '#000000'; // Fallback
    let h = parseInt(match[1]);
    let s = parseInt(match[2]) / 100;
    let l = parseInt(match[3]) / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch (e) {
    console.error("Error converting HSL to HEX:", e, "Input:", hslStr);
    return '#000000'; // Fallback
  }
};

// Helper to convert HEX to HSL string for CSS
const hexToHslString = (hex: string): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255; g /= 255; b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0, s = 0, l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return `${h} ${s}% ${l}%`;
};


export default function SettingsPage() {
  const { colors, setColors, resetColors, themeMode, setThemeMode } = useTheme();

  const handleColorChange = (colorName: keyof typeof colors, value: string) => {
    const hslValue = hexToHslString(value);
    setColors(prev => ({ ...prev, [colorName]: hslValue }));
  };

  const handleThemeModeChange = (checked: boolean) => {
    setThemeMode(checked ? 'dark' : 'light');
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Configuración</CardTitle>
          <CardDescription>Personaliza la apariencia de C-Wiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme-mode-switch" className="text-lg font-medium">Modo Temático</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="theme-mode-switch"
                checked={themeMode === 'dark'}
                onCheckedChange={handleThemeModeChange}
              />
              <span>{themeMode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-color" className="text-lg font-medium">Color Primario</Label>
            <Input
              id="primary-color"
              type="color"
              value={hslStringToHex(colors.primary)}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="h-10 w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="background-color" className="text-lg font-medium">Color de Fondo</Label>
             <Input
              id="background-color"
              type="color"
              value={hslStringToHex(colors.background)}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="h-10 w-full"
            />
             <p className="text-xs text-muted-foreground">Nota: Cambiar el fondo puede requerir que se actualice la aplicación para que todos los elementos se actualicen si JavaScript no maneja todos los colores derivados.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accent-color" className="text-lg font-medium">Color de Acento</Label>
             <Input
              id="accent-color"
              type="color"
              value={hslStringToHex(colors.accent)}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="h-10 w-full"
            />
          </div>
          <Button onClick={resetColors} variant="outline" className="w-full">
            Restablecer colores predeterminados
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
