# 📧 Smart Email Reply Generator
A web-based AI-powered tool that generates professional email replies using Google Gemini API. Built with Spring Boot and React.

## Features
- Generate professional email replies using Gemini API
- Supports different tones like formal, friendly, or professional
- REST API with POST endpoint (`/api/email/generate`)
- Frontend built using React and Vite
- CORS enabled for smooth frontend-backend integration

## Tech Stack
- **Backend:** Spring Boot, WebClient, Java 17
- **Frontend:** React, Vite, JavaScript
- **AI Integration:** Gemini API (Google Generative Language)
- **Build Tools:** Maven, npm

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/abilashini593/smart-email-assistant.git
cd smart-email-assistant

Start the Backend(SpringBoot)
cd email-writer-sb
mvn spring-boot:run

Start the Frontend(React)
cd ../email-writer-sb/email-writer-react
npm install
npm run dev

Once both frontend and backend servers are running:

## 🚀 Usage Instructions

Once both frontend and backend servers are running:

1. Open your browser and go to:  
   `http://localhost:5173`

2. Enter the **original email content** into the textbox.

3. (Optional) Select a **tone** like `Professional`, `Friendly`, etc.

4. Click the **"Generate Reply"** button.

5. The app will send a request to the backend, which uses the **Gemini API** to generate a smart reply.

6. The AI-generated response will appear below.

7. Click **"Copy to Clipboard"** to copy the reply for use in your email.

## 📸 Demo Screenshot

![App Screenshot](https://github.com/user-attachments/assets/49343a4f-a5d9-4be6-a5ee-73cbaa85aa69)

