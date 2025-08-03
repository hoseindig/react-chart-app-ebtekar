# 📈 React D3 Chart Renderer

A technical frontend test project built with **React** and **D3.js**.  
It dynamically renders multiple charts based on external JSON data input — supporting both single-series and multi-series line charts.

---

## 🚀 Features

- 🧠 **Auto chart-type detection** (single or multi-series)
- 📊 **D3 line chart rendering**
  - Single-series: 1 line
  - Multi-series: 3 colored lines (blue, green, red)
- ⚠️ **Handles `null` values gracefully**
- 🧩 **Modular component structure**
- 🗂️ Dynamic loading of all charts in the dataset
- 📝 Clean, maintainable code (TypeScript)

 

 


## 📥 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/react-d3-chart-renderer.git
cd react-d3-chart-renderer

2. Install dependencies

Using Yarn:

yarn install

Or with npm:

npm install

3. Run the app locally

yarn dev

Then open http://localhost:5173 in your browser.
🧪 Sample Data Format
Single-Series Chart

{
  "title": "Single Series Example",
  "data": [[0, 12], [1, null], [2, 34]]
}

Multi-Series Chart

{
  "title": "Multi Series Example",
  "data": [[0, [10, 20, 30]], [1, [null, 25, 35]], [2, [15, null, 40]]]
}

✅ Test Criteria Checklist

Reads data.json correctly

Automatically detects chart type

Renders charts using D3

Skips null values appropriately

Titles displayed above charts

    Modular, maintainable codebase

🛠️ Built With

    React

    D3.js

    TypeScript

    Vite for fast dev build