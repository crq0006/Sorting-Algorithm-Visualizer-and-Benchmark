# Sorting Algorithm Visualizer and Benchmark

## Project Overview

This project is an interactive sorting algorithm visualizer and benchmarking application developed using JavaScript and React.

The application demonstrates how different sorting algorithms operate by visually representing their execution and comparing their performance across various datasets.

The project implements five sorting algorithms:

- Bubble Sort
- Insertion Sort
- Selection Sort
- Merge Sort
- Quick Sort

### Key Features

- Real-time visualization of sorting algorithms.
- Color-coded comparisons, swaps, and sorted elements.
- Adjustable array sizes, value ranges, and animation speeds.
- Side-by-side comparison of two sorting algorithms.
- Automated performance benchmarking.
- Performance charts comparing execution times and algorithm efficiency.

## Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript | Core programming language |
| React | Frontend framework and UI management |
| Vite | Development environment and build tool |
| HTML5 Canvas | Sorting visualization |
| Chart.js | Benchmark data visualization |
| Git / GitHub | Version control and collaboration |

## Repository Structure

```text
Sorting-Algorithm-Visualizer-and-Benchmark/
│
├── public/
│
├── src/
│   ├── algorithms/
│   ├── data/
│   ├── benchmarking/
│   ├── visualization/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
├── vite.config.js
├── .gitignore
└── README.md
```

### Directory Descriptions

**public/**

Contains static assets that are served directly by the application, such as images and other resources.

**src/algorithms/**

Contains the implementations of the five sorting algorithms. Each algorithm is maintained in its own JavaScript file.

**src/data/**

Contains functions responsible for generating and preparing datasets. This includes random, sorted, reverse-sorted, and duplicate-containing arrays.

**src/benchmarking/**

Contains the benchmarking and performance measurement logic. Responsible for recording execution times, collecting algorithm metrics, and verifying sorting results.

**src/visualization/**

Contains the logic responsible for rendering and animating the sorting process. Handles the visual representation of array elements, comparisons, swaps, and completed positions.

**src/components/**

Contains reusable React components that make up the application's interface, including controls, algorithm selectors, comparison panels, and benchmark charts.

**src/App.jsx**

The main React application component. Responsible for assembling the different components and managing application-level state.

**src/main.jsx**

The application's entry point. Initializes React and renders the main application.

**src/App.css and src/index.css**

Contain styling rules for the application and its individual components.

## Installation

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate into the project directory:

```bash
cd Sorting-Algorithm-Visualizer-and-Benchmark
```

3. Install project dependencies:

```bash
npm install
```

## Running the Application

Start the local development server:

```bash
npm run dev
```

Vite will provide a local URL (typically `http://localhost:5173`) where the application can be accessed through a web browser.

To stop the development server, press `Ctrl + C` in the terminal.

## Building for Production

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Development Notes

- Keep sorting algorithm implementations separate from visualization logic.
- Benchmarking should measure algorithm execution independently of animation delays.
- Use identical copies of datasets when comparing algorithms.
- Validate algorithm outputs to ensure sorting correctness.
- Keep components modular and reusable.

## Team Members

- Team Member 1: Laila Alkhatib - Primary developer for the Algorithm Manipulation Engine, tracking timers, and
backend performance metrics collection. Assist with report writing.
- Team Member 2: Emily Godinez-Martinez - Primary developer for the UI Layout & Animation Module, setting up
state transitions and color cues. Lead video recording compiler.
- Team Member 3: Cash Quigley - Primary developer for the Data Processing suite, chart generation logic, and
repository manager. Lead documentation and report coordinator.

## Project Status

Currently in development. Features and documentation will be updated as implementation progresses.