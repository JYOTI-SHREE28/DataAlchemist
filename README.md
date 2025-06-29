<<<<<<< HEAD
# Data Alchemist

A smart AI-powered dashboard to upload, validate, edit, and export data for **clients**, **workers**, and **tasks**. It includes:

- Inline editing with validation and AI error correction
- AI rule creation from natural language
- Rule builder and prioritization panel
- Export functionality (CSV + JSON bundle)
- Natural language filtering and future modification capabilities

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/data-alchemist.git
cd data-alchemist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Gemini API key

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_google_generative_ai_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the dashboard.

---

## Features

### Data Upload + Inline Editing

- Upload `.csv` or `.xlsx` files
- Edit directly in the table
- Real-time validation and error highlighting

### AI Fix Suggestions

- Get suggestions for invalid cells using Gemini AI
- One-click apply for fixes

### Rule Builder

- Add rules like `coRun`, `slotRestriction`, `loadLimit`, `phaseWindow`
- Rules are stored in JSON format and downloadable

### Prioritization Panel

- Adjust weights for fairness, fulfillment, workload, etc.
- Export prioritization settings as JSON

### Natural Language Rule Creator _(beta)_

- Convert English sentences to structured rules using Gemini

### Export Bundle

- Export validated data (clients, workers, tasks) as `.csv`
- Export `rules.json` and `prioritization.json`
- All included in a `.zip` package

---

## Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Gemini API (via @google/generative-ai)
- Papaparse, XLSX, FileSaver

---

> Built with to simplify resource planning workflows
=======
# Data Alchemist 🧪

A powerful AI-driven dashboard for seamless data management, validation, and export. Transform your raw data into clean, actionable insights with intelligent automation and intuitive controls.

## ✨ Features

### 📊 Smart Data Management
- **Multi-format Support**: Upload CSV and Excel (.xlsx) files effortlessly
- **Inline Editing**: Edit data directly in an intuitive table interface
- **Real-time Validation**: Instant error detection and highlighting
- **AI-Powered Corrections**: Get intelligent fix suggestions using Google's Gemini AI

### 🤖 Intelligent Rule System
- **Visual Rule Builder**: Create complex rules like `coRun`, `slotRestriction`, `loadLimit`, and `phaseWindow`
- **Natural Language Processing**: Convert plain English descriptions into structured rules *(beta)*
- **Rule Prioritization**: Fine-tune weights for fairness, fulfillment, workload balance, and more
- **JSON Export**: Download rules and prioritization settings for version control

### 🔍 Advanced Data Operations
- **Natural Language Filtering**: Query your data using conversational language
- **Bulk Operations**: Apply changes across multiple records simultaneously
- **Data Validation**: Comprehensive error checking with AI-assisted corrections

### 📦 Export & Integration
- **Multiple Formats**: Export as CSV or JSON with full data integrity
- **Bundle Export**: Get everything in a convenient ZIP package
- **API Ready**: JSON exports are perfect for system integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Generative AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/data-alchemist.git
   cd data-alchemist
   ```

2. **Install dependencies**
   ```bash
   npm install
   
   ```

3. **Configure environment**
   
   Create a `.env.local` file in the project root:
   ```env
   GEMINI_API_KEY=your_google_generative_ai_key_here
   ```
   
   > 💡 Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the dashboard**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Use Cases

- **Project Management**: Manage clients, workers, and tasks with intelligent scheduling
- **Data Cleaning**: Automatically identify and fix data inconsistencies
- **Business Intelligence**: Create custom rules for data processing and analysis
- **Team Coordination**: Balance workloads and optimize resource allocation

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js** | Full-stack React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Gemini AI** | Intelligent data processing and corrections |
| **Papaparse** | CSV parsing and manipulation |
| **XLSX** | Excel file processing |
| **FileSaver.js** | Client-side file downloads |

## 📁 Project Structure

```
data-alchemist/
├── app/                    # Next.js app directory
├── components/             # Reusable UI components
├── lib/                    # Utility functions and API clients
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
└── .env.local             # Environment variables
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google's Gemini AI for intelligent data processing
- The open-source community for amazing libraries and tools
- Contributors who help make this project better

---

<div align="center">
  Made with ❤️ by the Data Alchemist team
</div>
>>>>>>> 1eb248f565caeac5172a4c455439e0ad95b384ab
