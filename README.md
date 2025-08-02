# 🎨 Luma's Class - Interactive Learning for Kids

Welcome to **Luma's Class**, a delightful educational web application designed to help children aged 4-8 learn math and alphabets through visual, interactive experiences! 

## 🌟 Features

### 📚 Learning Subjects
- **🧮 Math Adventures**: Visual math problems with pictures (trees, fruits, animals)
  - **Level 1**: Simple counting (1-5 objects)
  - **Level 2**: Basic addition with visual elements
  - **Level 3+**: Subtraction with interactive demonstrations
  
- **🔤 Alphabet Adventures**: Letter recognition and phonics
  - **Level 1**: Identify letters from pictures and words
  - **Level 2**: Match words to letters
  - **Level 3+**: Connect letters with words and sounds

### 🎯 Interactive Features
- **Visual Learning**: Emoji-based questions with animated elements
- **Progress Tracking**: Level progression with encouraging feedback
- **Audio Support**: Text-to-speech for pronunciation help
- **Gamification**: Points, streaks, and achievement celebrations
- **Adaptive Difficulty**: Questions adjust based on performance

### 🤖 AI-Powered Question Generation
- **n8n Integration**: Automated question creation using LLM
- **Dynamic Content**: Fresh questions tailored to child's level
- **Fallback System**: Ensures continuous learning even if AI is unavailable

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun package manager
- n8n instance (for AI question generation)
- OpenAI API key (for LLM integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luma-class
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see Luma's Class in action!

## 🔧 n8n Integration Setup

### Setting up n8n Workflows

1. **Install n8n**
   ```bash
   npm install -g n8n
   ```

2. **Start n8n**
   ```bash
   n8n start
   ```

3. **Import Workflows**
   - Open n8n dashboard (usually `http://localhost:5678`)
   - Import the workflow files from `n8n-workflows/` directory:
     - `lumaclass-math-generator.json` - Math question generator
     - `lumaclass-alphabet-generator.json` - Alphabet question generator

4. **Configure OpenAI Credentials**
   - In n8n, go to Credentials → Add Credential
   - Select "OpenAI API"
   - Add your OpenAI API key
   - Name it "OpenAI API"

5. **Activate Workflows**
   - Math Generator: Webhook endpoint `/generate-math-question`
   - Alphabet Generator: Webhook endpoint `/generate-alphabet-question`

### API Endpoints

#### Math Questions
```http
POST /generate-math-question
Content-Type: application/json

{
  "level": 1,
  "question_type": "counting",
  "difficulty": "easy"
}
```

#### Alphabet Questions
```http
POST /generate-alphabet-question
Content-Type: application/json

{
  "level": 1,
  "question_type": "identify-letter",
  "target_letters": "A,B,C,D,E,F"
}
```

## 🏗️ Project Structure

```
luma-class/
├── src/
│   ├── components/
│   │   ├── ui/                      # ShadCN UI components
│   │   ├── VisualMathQuestion.tsx   # Math question component
│   │   ├── VisualAlphabetQuestion.tsx # Alphabet question component
│   │   ├── ProgressTracker.tsx      # Progress tracking
│   │   └── ChatBubble.tsx           # Luma's chat interface
│   ├── pages/
│   │   ├── Index.tsx                # Main welcome page
│   │   ├── MathLearning.tsx         # Math learning interface
│   │   └── AlphabetLearning.tsx     # Alphabet learning interface
│   └── assets/
│       └── luma-mascot.png          # Luma character
├── n8n-workflows/
│   ├── lumaclass-math-generator.json    # Math n8n workflow
│   └── lumaclass-alphabet-generator.json # Alphabet n8n workflow
└── public/
    └── ...                          # Static assets
```

## 🎨 Visual Design

### Color Scheme
- **Primary**: Blue tones for trust and learning
- **Secondary**: Purple for creativity
- **Accent**: Orange/yellow for energy and fun
- **Warm gradients** for a friendly, inviting atmosphere

### Typography
- **Large, readable fonts** appropriate for young children
- **Clear contrast** for accessibility
- **Playful animations** to maintain engagement

### Visual Elements
- **Emoji-based learning**: 🌳🍎🐝🌸🐣⭐🦋🐧🎈🍓
- **Smooth animations** with CSS transitions
- **Responsive design** for tablets and computers

## 🧠 Learning Philosophy

### Progressive Learning
- **Start Simple**: Begin with basic counting and letter recognition
- **Build Confidence**: Celebrate every success with positive feedback
- **Gradual Complexity**: Introduce new concepts as skills develop
- **Visual Association**: Use pictures to reinforce learning

### Engagement Strategies
- **Immediate Feedback**: Instant responses to maintain focus
- **Gamification**: Points, levels, and streaks for motivation
- **Mascot Interaction**: Luma provides encouragement and guidance
- **Audio Support**: Pronunciation help for alphabet learning

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **ShadCN UI** for consistent components
- **Lucide React** for icons

### Backend/AI
- **n8n** for workflow automation
- **OpenAI GPT-3.5** for question generation
- **REST APIs** for communication

### Features
- **Responsive Design** - works on tablets and computers
- **Web Speech API** - for pronunciation features
- **Local Storage** - to save progress (future enhancement)

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
bun run build
```

### Deploy Options
- **Vercel**: Easy deployment with automatic builds
- **Netlify**: Static site deployment with form handling
- **Docker**: Containerized deployment for custom servers

### n8n Deployment
- **n8n Cloud**: Managed n8n service
- **Self-hosted**: Deploy on your own server
- **Docker**: Containerized n8n deployment

## 🔒 Security & Privacy

### Child Safety
- **No personal data collection**
- **No external tracking**
- **Safe, educational content only**
- **Offline-capable design**

### API Security
- **Environment variables** for API keys
- **CORS protection** for webhooks
- **Input validation** in n8n workflows

## 🤝 Contributing

We welcome contributions to make Luma's Class even better!

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with children (if possible)
5. Submit a pull request

### Areas for Contribution
- **New learning subjects** (shapes, colors, numbers)
- **Additional languages** and localization
- **Accessibility improvements**
- **Performance optimizations**
- **New visual elements** and animations

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **ShadCN** for the beautiful UI components
- **Lucide** for the clean, accessible icons
- **OpenAI** for powering the AI question generation
- **n8n** for the flexible automation platform
- All the young learners who inspire educational innovation!

---

## 📞 Support

If you encounter any issues or have suggestions:

1. **Check the FAQ** in this README
2. **Open an issue** on GitHub
3. **Join our discussions** for community support

Happy learning with Luma! 🌟📚✨
