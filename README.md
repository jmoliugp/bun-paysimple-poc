# 🚀 PaySimple Platform POC Monorepo

This monorepo contains a Proof of Concept (POC) for integrating PaySimple into a payment flow using a Node.js server 🖥️ and a React.js frontend 💻. This project aims to demonstrate the capabilities of PaySimple's payment platform as documented [here](https://documentation.paysimple.com/docs/paysimplejs-getting-started).

## 📂 Structure

This monorepo is divided into two main parts:

- `frontend`: A React application that serves as the interface for payment processing.
- `backend`: A Node.js server that handles backend operations such as server-side payment token handling.

### 🌐 Frontend

The frontend is built with React 18 and uses Vite as the build tool. It includes TailwindCSS for styling and is set up with ESLint for code quality.

#### 🛠️ Key Dependencies

- React
- Vite
- TailwindCSS
- ESLint

### ⚙️ Backend

The backend uses Express to serve and handle requests. It is written in TypeScript, and the project is set up to run with Bun, a modern JavaScript runtime like Node.js.

#### 🛠️ Key Dependencies

- Express
- TypeScript

## 🌟 Getting Started

### Prerequisites

- Node.js (LTS version recommended) 📦
- [Bun](https://bun.sh/) for running scripts in the `backend` 🚀
- An internet connection to fetch external dependencies 🌐

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd <monorepo-name>
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   bun install

   # Install backend dependencies
   cd ../backend
   bun install
   ```

### ▶️ Running the Applications

#### 🌐 Frontend

```bash
cd frontend
bun run dev
```

This will start the React application in development mode with hot reloading enabled.

#### ⚙️ Backend

```bash
cd backend
bun run dev
```

This command starts the Express server with Bun, watching for any changes in the `server.ts` file.

## 🔍 Testing the Integration

To test the PaySimple integration:

1. Navigate to `http://localhost:3000` (or the configured port for your React application).
2. Fill out the payment form and submit to see the PaySimple response.

## 🤝 Contributing

Contributions are welcome! Please open a pull request with your proposed changes or improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
