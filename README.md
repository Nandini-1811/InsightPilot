# InsightPilot

### AI-Powered Business Analytics Platform for D2C Businesses

InsightPilot is a full-stack business analytics platform that transforms raw CSV data into structured, visual, and actionable business insights.

It combines **data ingestion, normalization, profiling, data-quality assessment, capability detection, business analytics, interactive visualizations, and AI-assisted insights** into a single workflow.

The project is designed to explore how modern full-stack engineering and data analytics can work together to make business data easier to understand and act upon.

---

## 🚀 What InsightPilot Does

A typical workflow looks like:

```text
Upload CSV
    ↓
Normalize & Process Data
    ↓
Profile Dataset
    ↓
Assess Data Quality
    ↓
Detect Analytical Capabilities
    ↓
Generate Business Analytics
    ↓
Explore Interactive Visualizations
    ↓
Generate AI-Assisted Insights
```

Instead of requiring users to manually clean a dataset, calculate metrics, and build visualizations, InsightPilot provides an integrated analytics workflow.

---

## ✨ Current Features

### 📁 CSV Upload

Upload a CSV dataset directly through the application.

InsightPilot processes the uploaded data and prepares it for downstream analytics.

---

### 🧹 Data Normalization

Uploaded datasets go through a normalization stage before analysis.

This helps standardize the input data and prepare different dataset structures for analytical processing.

---

### 🔎 Dataset Profiling

InsightPilot analyzes the structure of the uploaded dataset to understand what information is available.

The profiling layer identifies characteristics such as:

* Dataset dimensions
* Available columns
* Data types
* Potential analytical fields
* Dataset structure

This allows the application to understand the capabilities of a dataset before attempting to generate business insights.

---

### 🛡️ Data Quality Assessment

InsightPilot evaluates the quality of uploaded data and surfaces potential limitations.

The system considers factors such as:

* Missing data
* Dataset completeness
* Available fields
* Data reliability
* Analytical limitations

This is important because analytical systems should not assume that every dataset contains enough information to calculate every business metric.

---

### 🧠 Capability Detection

Rather than assuming a fixed schema, InsightPilot analyzes the available dataset to determine what kinds of business analysis can be performed.

For example, a dataset may contain enough information for revenue analysis but not enough information for profitability analysis.

The application can therefore distinguish between:

```text
Available Analysis
        +
Unavailable Analysis
        +
Data Limitations
```

This helps prevent unsupported or misleading metrics from being presented to users.

---

### 📊 Business Health Framework

InsightPilot provides a business-oriented analytical view designed around understanding overall business performance.

The dashboard brings important metrics and analytical signals together into a centralized business health experience.

---

### 📈 Interactive Visualizations

The dashboard provides interactive charts for exploring analytical results.

Supported visualization styles include:

* Bar charts
* Line charts
* Area charts
* Pie charts

Users can also control the amount of data displayed using options such as:

```text
Top 5
Top 10
Top 20
All
```

This makes it easier to focus on the most important entities while still allowing users to explore the complete dataset.

---

### 📋 Analytical Context

InsightPilot provides contextual information around the available data rather than presenting numbers without explanation.

The dashboard communicates data limitations and confidence where appropriate.

This is particularly important for business analytics because **a metric is only useful when the underlying data supports it**.

---

### 🤖 AI-Assisted Insights

InsightPilot integrates Google's Gemini API to provide AI-assisted interpretation of analytical results.

The AI layer is intended to help translate analytical output into more understandable business language.

The long-term architecture separates:

```text
Data & Calculations
        ↓
Deterministic Analytics
        ↓
AI Interpretation
        ↓
Human-readable Business Insights
```

> **Current status:** The AI summary functionality is still being refined and is currently an active development area.

---

### 🔌 Backend API

InsightPilot uses a FastAPI backend to handle data processing and application logic.

The backend exposes API endpoints that can be explored through the API documentation interface.

This allows the project to function as a complete application rather than only a frontend visualization dashboard.

---

## 🏗️ Architecture

The current project is organized into separate frontend and backend applications.

```text
                         ┌───────────────┐
                         │     User      │
                         └───────┬───────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │    Next.js       │
                       │    Frontend      │
                       └────────┬─────────┘
                                │
                           HTTP / API
                                │
                                ▼
                       ┌──────────────────┐
                       │     FastAPI      │
                       │     Backend      │
                       └────────┬─────────┘
                                │
               ┌────────────────┼────────────────┐
               ▼                ▼                ▼
        ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
        │   Pandas    │  │ PostgreSQL  │  │   Gemini    │
        │ Data Engine │  │  Database   │  │     API     │
        └─────────────┘  └─────────────┘  └─────────────┘
               │                │                │
               └────────────────┼────────────────┘
                                ▼
                       ┌──────────────────┐
                       │ Analytics Result │
                       │ + Visualization  │
                       │ + AI Insights    │
                       └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Recharts**
* **Lucide React**

### Backend

* **FastAPI**
* **Python**
* **Pandas**
* **SQLAlchemy**
* **Pydantic**

### Database

* **PostgreSQL**

### AI

* **Google Gemini API**

### API

* **REST API**
* **OpenAPI / Swagger**

---

## 📂 Project Structure

```text
InsightPilot/
│
├── backend/
│   ├── ...
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── ...
│   └── package.json
│
├── README.md
├── .gitignore
└── requirements.txt
```

The application is separated into frontend and backend layers, allowing each part of the system to be developed and maintained independently.

---

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

* Python 3.x
* Node.js
* npm
* PostgreSQL

---

### 1. Clone the repository

```bash
git clone https://github.com/Nandini-1811/InsightPilot.git
cd InsightPilot
```

---

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required environment variables.

Then start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API documentation should be available through the FastAPI Swagger interface.

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Next.js application will then be available locally.

---

## 🔐 Environment Variables

Create the appropriate environment files for the backend and frontend.

Example backend configuration:

```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit API keys, passwords, database credentials, or other secrets to GitHub.

---

## 📊 Example Analytical Workflow

Once a dataset is uploaded:

```text
                 CSV Dataset
                     │
                     ▼
              Data Normalization
                     │
                     ▼
              Dataset Profiling
                     │
                     ▼
             Data Quality Check
                     │
                     ▼
            Capability Detection
                     │
                     ▼
             Business Analytics
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
    Visualizations         Business Health
          │                     │
          └──────────┬──────────┘
                     ▼
              AI-Assisted Insights
```

---

## 🎯 Design Principles

InsightPilot is being developed around several principles.

### 1. Data First

Analytics should be based on the information actually present in the dataset.

### 2. Don't Invent Metrics

If the required data is unavailable, the system should communicate that limitation rather than fabricate a value.

### 3. Explainability

Users should be able to understand where analytical results come from.

### 4. Separation of Concerns

The application separates:

* Data processing
* Analytical computation
* Visualization
* AI interpretation
* API communication

### 5. Graceful Failure

Invalid or unsupported datasets should produce useful feedback instead of unexplained application failures.

---

## 🔮 Roadmap

InsightPilot is currently an MVP and is being actively developed.

### Data Reliability

* [ ] Robust CSV validation
* [ ] Better malformed-file handling
* [ ] Missing-value strategies
* [ ] Duplicate detection
* [ ] Data-type validation
* [ ] Better handling of different CSV schemas
* [ ] Dataset profiling improvements

### Analytics

* [ ] More deterministic KPI calculations
* [ ] Automated trend detection
* [ ] Outlier detection
* [ ] Ranking analysis
* [ ] Chart-level analytical facts
* [ ] KPI calculation explanations

### Processing Pipeline

Introduce explicit processing states:

```text
UPLOADED
    ↓
VALIDATING
    ↓
PROFILING
    ↓
ANALYZING
    ↓
AI_PROCESSING
    ↓
READY
```

The frontend will display the actual backend processing state to the user.

### AI Architecture

Strengthen the separation between numerical analytics and AI interpretation.

```text
Raw Data
   ↓
Analytics Engine
   ↓
Structured Analytical Facts
   ↓
Gemini
   ↓
AI Interpretation
```

The AI layer should interpret calculated facts rather than being responsible for core numerical calculations.

### Persistence & Performance

* [ ] Store analytical results in PostgreSQL
* [ ] Persist AI-generated summaries
* [ ] Introduce dataset hashing
* [ ] Add asynchronous processing
* [ ] Add Redis caching
* [ ] Cache frequently requested analytical results
* [ ] Store processing/job state

### Engineering & Deployment

* [ ] Automated testing
* [ ] Error handling improvements
* [ ] Structured logging
* [ ] Docker
* [ ] Docker Compose
* [ ] Production deployment
* [ ] CI/CD

---

## 🧪 Testing Philosophy

InsightPilot will be tested against more than ideal datasets.

Planned test cases include:

| Dataset                 | Expected Behavior               |
| ----------------------- | ------------------------------- |
| Normal CSV              | Process successfully            |
| Empty CSV               | Clear validation error          |
| Malformed CSV           | Graceful failure                |
| Missing values          | Report and handle appropriately |
| Duplicate rows          | Detect and communicate          |
| Different schema        | Analyze available capabilities  |
| Missing business metric | Explain unavailable analysis    |
| Wrong file type         | Clear unsupported-format error  |
| Large dataset           | Process without crashing        |

The objective is:

> **Valid data should work. Invalid data should fail gracefully. Unsupported analysis should be explained.**

---

## 🔐 AI & Data Integrity

AI is used as an interpretation layer rather than the source of truth for numerical calculations.

The intended architecture is:

```text
                  ┌──────────────────┐
                  │    CSV Dataset   │
                  └────────┬─────────┘
                           ↓
                  ┌──────────────────┐
                  │ Analytics Engine │
                  └────────┬─────────┘
                           ↓
                  ┌──────────────────┐
                  │ Structured Facts │
                  └────────┬─────────┘
                           ↓
                  ┌──────────────────┐
                  │   Gemini API     │
                  └────────┬─────────┘
                           ↓
                  ┌──────────────────┐
                  │ AI Interpretation│
                  └──────────────────┘
```

This approach is intended to improve consistency, transparency, and trust in the analytical results.

---

## 📌 Project Status

**🚧 MVP — Active Development**

Current capabilities include:

* CSV upload
* Data normalization
* Dataset profiling
* Data-quality assessment
* Capability detection
* Business Health Framework
* Interactive analytics dashboard
* Data visualizations
* Backend API
* PostgreSQL integration
* AI integration

The project is currently being evolved toward a more robust, production-oriented analytics platform.

---

## 🌟 Project Vision

InsightPilot aims to become more than a dashboard.

The long-term vision is an analytics platform where:

```text
Messy Business Data
        ↓
Reliable Data Processing
        ↓
Deterministic Analytics
        ↓
Explainable Visualizations
        ↓
AI-Assisted Interpretation
        ↓
Actionable Business Insights
```

The core idea is simple:

> **Make business data easier to explore, understand, and act upon — without hiding the limitations of the underlying data.**

---

## 👩‍💻 Author

**Nandini**

Built as a portfolio project exploring the intersection of:

**Data Analytics × Full-Stack Development × AI**

---

## ⭐ If you find InsightPilot interesting

Feel free to explore the repository, experiment with different datasets, and follow the project's development as it evolves toward a production-ready analytics platform.
