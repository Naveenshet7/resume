import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeCustomizer: React.FC = () => {
  const { state, updateTheme, toggleDarkMode } = useResume();
  const { themeOptions, isDarkMode } = state;

  const colorOptions = [
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
    { name: 'Red', value: 'red' },
    { name: 'Amber', value: 'amber' },
    { name: 'Teal', value: 'teal' },
    { name: 'Custom', value: 'custom' },
  ];

  const fontOptions = [
    { name: 'Sans Serif', value: 'sans' },
    { name: 'Serif', value: 'serif' },
    { name: 'Monospace', value: 'mono' },
    { name: 'Cursive', value: 'cursive' },
    { name: 'Fantasy', value: 'fantasy' },
    { name: 'System UI', value: 'system-ui' },
  ];

  const fontSizeOptions = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' },
  ];

  const layoutOptions = [
    { name: 'Modern', value: 'Modern' },
    { name: 'Classic', value: 'Classic' },
    { name: 'Compact', value: 'Compact' },
  ];

  const borderOptions = [
    { name: 'Rounded', value: 'rounded' },
    { name: 'Sharp', value: 'sharp' },
    { name: 'Pill', value: 'pill' },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Customize Design</h3>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Color Theme
          </label>
          <div className="grid grid-cols-7 gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateTheme({ colorTheme: option.value })}
                className={`w-full h-8 rounded-full border-2 transition-all ${
                  themeOptions.colorTheme === option.value
                    ? 'border-black dark:border-white scale-110'
                    : 'border-transparent scale-100'
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    option.value === 'custom'
                      ? 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500'
                      : option.value === 'blue'
                      ? 'bg-blue-500'
                      : option.value === 'green'
                      ? 'bg-emerald-500'
                      : option.value === 'purple'
                      ? 'bg-purple-500'
                      : option.value === 'red'
                      ? 'bg-red-500'
                      : option.value === 'amber'
                      ? 'bg-amber-500'
                      : 'bg-teal-500'
                  }`}
                ></div>
              </button>
            ))}
          </div>
          {themeOptions.colorTheme === 'custom' && (
            <div className="mt-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                Custom Color
              </label>
              <input
                type="color"
                value={themeOptions.customColor || '#3B82F6'}
                onChange={(e) => updateTheme({ customColor: e.target.value })}
                className="w-full h-8 rounded-md cursor-pointer"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Font Family
          </label>
          <select
            value={themeOptions.fontFamily}
            onChange={(e) => updateTheme({ fontFamily: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {fontOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Font Size
          </label>
          <select
            value={themeOptions.fontSize}
            onChange={(e) => updateTheme({ fontSize: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {fontSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Custom Font Size (px)
          </label>
          <input
            type="number"
            value={themeOptions.customFontSize || 16}
            onChange={(e) => updateTheme({ customFontSize: parseInt(e.target.value, 10) })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="8"
            max="72"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Layout Style
          </label>
          <select
            value={themeOptions.layoutStyle}
            onChange={(e) =>
              updateTheme({ layoutStyle: e.target.value as 'Modern' | 'Classic' | 'Compact' })
            }
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {layoutOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Border Style
          </label>
          <select
            value={themeOptions.borderStyle}
            onChange={(e) => updateTheme({ borderStyle: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {borderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Section Spacing (px)
          </label>
          <input
            type="number"
            value={themeOptions.sectionSpacing || 16}
            onChange={(e) => {
              const newSpacing = parseInt(e.target.value, 10);
              console.log('Updating sectionSpacing to:', newSpacing);
              updateTheme({ sectionSpacing: newSpacing });
            }}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Line Height
          </label>
          <input
            type="number"
            value={themeOptions.lineHeight || 1.5}
            onChange={(e) => updateTheme({ lineHeight: parseFloat(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
            max="3"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Left/Right Margin (px)
          </label>
          <input
            type="number"
            value={themeOptions.marginHorizontal || 20}
            onChange={(e) => updateTheme({ marginHorizontal: parseInt(e.target.value, 10) })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Top/Bottom Margin (px)
          </label>
          <input
            type="number"
            value={themeOptions.marginVertical || 20}
            onChange={(e) => updateTheme({ marginVertical: parseInt(e.target.value, 10) })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Space Between Entries (px)
          </label>
          <input
            type="number"
            value={themeOptions.entrySpacing || 10}
            onChange={(e) => updateTheme({ entrySpacing: parseInt(e.target.value, 10) })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            max="50"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;