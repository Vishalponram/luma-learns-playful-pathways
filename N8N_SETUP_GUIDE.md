# 🤖 n8n Setup Guide for Luma's Class

This guide will help you set up n8n workflows to generate AI-powered questions for Luma's Class.

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ **OpenAI API Key** (from https://platform.openai.com/api-keys)
- ✅ **n8n installed** (locally or cloud)
- ✅ **Node.js 18+** for local n8n installation

## 🚀 Quick Start

### Option 1: Local n8n Installation

1. **Install n8n globally**
   ```bash
   npm install -g n8n
   ```

2. **Start n8n**
   ```bash
   n8n start
   ```

3. **Access n8n**
   - Open your browser to `http://localhost:5678`
   - Create your first user account

### Option 2: n8n Cloud (Recommended for beginners)

1. Visit [n8n.cloud](https://n8n.cloud)
2. Sign up for a free account
3. Create a new workflow

## 📥 Import Workflows

### Step 1: Download Workflow Files
The workflow files are located in the `n8n-workflows/` directory:
- `lumaclass-math-generator.json`
- `lumaclass-alphabet-generator.json`

### Step 2: Import into n8n

1. **In n8n dashboard:**
   - Click **"New"** → **"Import from file"**
   - Upload `lumaclass-math-generator.json`
   - Repeat for `lumaclass-alphabet-generator.json`

2. **Alternative method:**
   - Copy the JSON content from the files
   - Click **"New"** → **"Import from URL or text"**
   - Paste the JSON content

## 🔐 Configure OpenAI Credentials

### Step 1: Create OpenAI Credential

1. **In n8n:**
   - Go to **Settings** → **Credentials**
   - Click **"Add new credential"**
   - Search for **"OpenAI"**
   - Select **"OpenAI API"**

2. **Configure the credential:**
   - **Name**: `OpenAI API` (must match exactly)
   - **API Key**: Your OpenAI API key
   - Click **"Save"**

### Step 2: Link Credentials to Workflows

1. **Open Math Generator workflow**
2. **Click on "Generate Question with LLM" node**
3. **In the credentials dropdown, select "OpenAI API"**
4. **Repeat for Alphabet Generator workflow**

## ⚡ Activate Workflows

### Math Question Generator

1. **Open the workflow**
2. **Click the "Active" toggle** in the top right
3. **Note the webhook URL** (usually `http://localhost:5678/webhook/math-questions`)

### Alphabet Question Generator

1. **Open the workflow**
2. **Click the "Active" toggle** in the top right
3. **Note the webhook URL** (usually `http://localhost:5678/webhook/alphabet-questions`)

## 🧪 Test the Workflows

### Test Math Generator

```bash
curl -X POST http://localhost:5678/webhook/generate-math-question \
  -H "Content-Type: application/json" \
  -d '{
    "level": 1,
    "question_type": "counting",
    "difficulty": "easy"
  }'
```

**Expected Response:**
```json
{
  "id": "math_1234567890_abc123",
  "question": "Count the trees! How many do you see?",
  "visual_element": "🌳",
  "left_count": 3,
  "right_count": 0,
  "correct_answer": 3,
  "explanation": "Great job counting! Keep practicing!",
  "difficulty_level": 1,
  "question_type": "counting",
  "subject": "mathematics",
  "target_age": "4-8 years",
  "generated_at": "2024-01-15T10:00:00.000Z"
}
```

### Test Alphabet Generator

```bash
curl -X POST http://localhost:5678/webhook/generate-alphabet-question \
  -H "Content-Type: application/json" \
  -d '{
    "level": 1,
    "question_type": "identify-letter",
    "target_letters": "A,B,C,D,E,F"
  }'
```

## 🔗 Connect to Luma's Class

### Option 1: Local Development

If running both n8n and Luma's Class locally:

1. **Update API endpoints in your React app:**
   ```typescript
   const N8N_BASE_URL = 'http://localhost:5678/webhook';
   
   // Math questions
   const mathResponse = await fetch(`${N8N_BASE_URL}/generate-math-question`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ level, question_type: 'counting' })
   });
   
   // Alphabet questions
   const alphabetResponse = await fetch(`${N8N_BASE_URL}/generate-alphabet-question`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ level, question_type: 'identify-letter' })
   });
   ```

### Option 2: Production Setup

For production deployment:

1. **Deploy n8n** to a cloud service (Railway, Heroku, etc.)
2. **Update environment variables** in Luma's Class:
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
   ```

## 🛠️ Workflow Customization

### Modify Question Types

**Math Generator - Edit the LLM prompt:**
```
Level 1: Simple counting (1-5 objects)
Level 2: Addition (numbers 1-4)
Level 3+: Subtraction (numbers 1-8)
Level 4: Multiplication (2x2, 3x3) // Add new level
```

**Alphabet Generator - Add new question types:**
```
Level 4: spell-word (spell simple words)
Level 5: rhyming-words (find words that rhyme)
```

### Adjust Visual Elements

**Edit the emoji list in prompts:**
```
Use visual elements (emojis for objects like 🌳🍎🐝🌸🐣⭐🦋🐧🎈🍓🎯🏀🌻🦜)
```

### Modify Difficulty Levels

**In the "Extract Parameters" node:**
```javascript
{
  "name": "max_count",
  "value": "={{ $json.level <= 2 ? 5 : ($json.level <= 4 ? 10 : 15) }}"
}
```

## 🚨 Troubleshooting

### Common Issues

**1. "OpenAI API credential not found"**
- Ensure credential name is exactly "OpenAI API"
- Verify the API key is correct and has credits

**2. "Webhook not responding"**
- Check if workflow is activated (toggle should be green)
- Verify the webhook URL matches your requests

**3. "CORS errors in browser"**
- Add CORS headers in the "Return Response" node:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```

**4. "Fallback questions always used"**
- Check OpenAI API quota and billing
- Verify the LLM prompt is generating valid JSON

### Debug Mode

**Enable execution logging:**
1. In workflow settings, turn on "Save execution progress"
2. Check execution logs for detailed error information

### Test Individual Nodes

**Manual testing:**
1. Click on any node
2. Click "Execute Node" to test independently
3. Check the output in the right panel

## 📊 Monitoring & Analytics

### Track Usage

**Add logging node after LLM generation:**
```javascript
// Log usage statistics
const stats = {
  timestamp: new Date().toISOString(),
  level: $json.difficulty_level,
  subject: $json.subject,
  success: !$json.fallback_used
};

console.log('Question Generated:', stats);
return [{ json: $json }];
```

### Performance Optimization

**Implement caching:**
1. Add a database node to store generated questions
2. Check cache before calling OpenAI
3. Implement cache expiration logic

## 🔄 Updates & Maintenance

### Regular Tasks

**Weekly:**
- Check OpenAI API usage and costs
- Review workflow execution logs
- Test webhook endpoints

**Monthly:**
- Update n8n to latest version
- Review and optimize prompts
- Analyze question generation patterns

### Backup Strategy

**Export workflows regularly:**
1. Select each workflow
2. Click **"Download"** to save JSON files
3. Store in version control

## 📞 Support & Resources

### Documentation
- [n8n Documentation](https://docs.n8n.io/)
- [OpenAI API Documentation](https://platform.openai.com/docs)

### Community
- [n8n Community Forum](https://community.n8n.io/)
- [n8n Discord Server](https://discord.gg/XdGWCaH)

### Getting Help
- Check n8n workflow execution logs first
- Search the community forum for similar issues
- Create detailed bug reports with workflow exports

---

🎉 **Congratulations!** You now have AI-powered question generation for Luma's Class!

For any issues specific to Luma's Class integration, please check the main README.md file or open an issue in the repository.