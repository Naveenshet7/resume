export const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^[\d\+\-\(\) ]{10,15}$/;
  return re.test(phone);
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional URLs can be empty
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatUrl = (url: string): string => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getColorClass = (colorTheme: string, isDark: boolean): string => {
  const colors: Record<string, { light: string; dark: string }> = {
    blue: { light: 'bg-blue-500', dark: 'bg-blue-700' },
    green: { light: 'bg-emerald-500', dark: 'bg-emerald-700' },
    purple: { light: 'bg-purple-500', dark: 'bg-purple-700' },
    red: { light: 'bg-red-500', dark: 'bg-red-700' },
    amber: { light: 'bg-amber-500', dark: 'bg-amber-700' },
    teal: { light: 'bg-teal-500', dark: 'bg-teal-700' },
  };

  return colors[colorTheme] ? colors[colorTheme][isDark ? 'dark' : 'light'] : 'bg-gray-500';
};

export const getFontClass = (fontFamily: string): string => {
  const fonts: Record<string, string> = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };

  return fonts[fontFamily] || 'font-sans';
};

export const getFontSizeClass = (fontSize: string): string => {
  const sizes: Record<string, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return sizes[fontSize] || 'text-base';
};

export const getBorderClass = (borderStyle: string): string => {
  const borders: Record<string, string> = {
    rounded: 'rounded-lg',
    sharp: 'rounded-none',
    pill: 'rounded-full',
  };

  return borders[borderStyle] || 'rounded-lg';
};