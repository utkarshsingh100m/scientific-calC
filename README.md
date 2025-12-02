# Scientific Calculator

A modern, feature-rich scientific calculator with a stunning glassmorphic design and calculation history tracking.

![Scientific Calculator](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## ✨ Features

- **Complete Scientific Functions**: sin, cos, tan, log, ln, square root, power, factorial
- **Mathematical Constants**: π (pi) and e (Euler's number)
- **Advanced Operations**: Parentheses support, percentage calculations, power operations
- **Calculation History**: Track and review your previous calculations with timestamps
- **Keyboard Support**: Full keyboard input support for faster calculations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphic design with smooth animations and gradient backgrounds
- **Dark Theme**: Eye-friendly dark theme with vibrant accent colors

## 🚀 Live Demo

Once deployed, your calculator will be available at: `https://your-project-name.vercel.app`

## 💻 Local Development

### Prerequisites

No build tools or dependencies required! This is a pure HTML/CSS/JavaScript project.

### Running Locally

1. **Option 1: Direct File Opening**

   - Simply open `index.html` in your web browser

2. **Option 2: Local Server (Recommended)**

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have npx)
   npx serve .
   ```

   Then open `http://localhost:8000` in your browser

## 📦 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Navigate to Project Directory**

   ```bash
   cd "c:\Users\utkar\OneDrive\Documents\Programming\GitHub Projects\Scintific CalC"
   ```

3. **Deploy**

   ```bash
   vercel
   ```

   Follow the prompts:

   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? Enter a name or press Enter for default
   - In which directory is your code located? **.**
   - Want to override the settings? **N**

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Scientific Calculator"
   git remote add origin https://github.com/yourusername/scientific-calculator.git
   git push -u origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to the main branch will automatically deploy to production
   - Pull requests will create preview deployments

## 🎮 Usage

### Basic Operations

- Click number buttons or use your keyboard
- Use operator buttons (+, -, ×, ÷) for basic arithmetic
- Press `=` or `Enter` to calculate

### Scientific Functions

- **Trigonometry**: sin, cos, tan (input in degrees)
- **Logarithms**: log (base 10), ln (natural log)
- **Powers**: x², x³, xʸ (custom power)
- **Other**: √ (square root), x! (factorial)

### Keyboard Shortcuts

- **Numbers**: 0-9
- **Operators**: +, -, \*, /
- **Decimal**: .
- **Equals**: Enter or =
- **Clear**: Escape or C
- **Backspace**: Backspace
- **Parentheses**: ( and )
- **Percentage**: %

### Special Features

- **Ans**: Recalls the last calculated result
- **History**: View all previous calculations with timestamps
- **Clear History**: Remove all history entries

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, glassmorphism, and animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **Google Fonts**: Inter font family for clean typography

## 📁 Project Structure

```
Scintific CalC/
├── index.html          # Main HTML file (entry point)
├── calculator.css      # Styles and design tokens
├── calculator.js       # Calculator logic and event handlers
├── vercel.json        # Vercel deployment configuration
├── package.json       # Project metadata
└── README.md          # This file
```

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradient Animations**: Smooth, animated background gradients
- **Micro-interactions**: Hover effects and button animations
- **Color-coded Buttons**: Different colors for numbers, operators, and functions
- **Responsive Grid**: Adapts to different screen sizes

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created by **UTKARSH**

---

**Enjoy calculating! 🧮✨**
