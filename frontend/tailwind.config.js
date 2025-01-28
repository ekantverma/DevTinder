import daisyui from 'daisyui';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Custom primary color
        secondary: '#F43F5E', // Custom secondary color
        accent: '#3B82F6', // Custom accent color
        background: '#F9FAFB', // Custom background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add a stylish font
        heading: ['Poppins', 'sans-serif'], // Custom heading font
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
        'elevated': '0 10px 15px rgba(0, 0, 0, 0.2)', // Elevated shadow
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          primary: '#6366F1',
          secondary: '#F43F5E',
          accent: '#3B82F6',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#2094F3',
          success: '#00C851',
          warning: '#FFBB33',
          error: '#FF4444',
        },
      },
      "light", 
      "dark", 
      "cupcake"
    ],
  },
};
