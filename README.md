# Universal AI API Hub

A production-style AI API management platform that allows administrators to create, configure, test, document, and monitor reusable AI-powered API connectors.

The platform provides a unified interface for connecting multiple AI providers, defining dynamic inputs, configuring prompts and structured outputs, exposing real HTTP endpoints, and tracking persistent API usage.

## 🚀 Live Application

**Live URL:**  
https://ai-api-hub-pi.vercel.app/

**GitHub Repository:**  
https://github.com/mahiugalemu-tech/ai-api-hub

---

## 🎯 Project Overview

The Universal AI API Hub solves the problem of repeatedly building separate AI integrations for different applications.

Instead, administrators can create reusable AI connectors by configuring:

- API name and description
- AI provider
- AI model
- System instructions / prompt
- Dynamic input fields
- Input validation
- Structured output schema
- API authentication
- Active / disabled status

Each connector automatically exposes a real HTTP API endpoint that can be consumed by external applications.

---

## ✨ Key Features

### Connector Management

Administrators can:

- Create connectors
- Edit connectors
- Enable or disable connectors
- Delete connectors
- Test connectors
- View connector details
- Access generated documentation
- Inspect connector usage statistics

### Multiple AI Providers

The platform currently supports:

- Google Gemini
- Groq

The provider layer uses an adapter architecture so providers can be extended independently.

### Dynamic Input System

Connectors can define different input types:

- Text
- Number
- Boolean
- Image
- File
- JSON

Each input can define:

- Field name
- Type
- Required / optional status
- Description
- Default value where applicable

### Prompt Engine

Every connector has its own configurable instructions.

The platform combines the configured connector instructions with the submitted user input before sending the request to the selected AI provider.

### Structured Outputs

Administrators can define the expected output structure for every connector.

The system parses and normalizes structured AI responses and returns a predictable API format.

Example:

```json
{
  "success": true,
  "data": {},
  "error": null
}
