# 🎮 phaser-firebase-game

![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)

A **fast-paced, web-based game** built by the **Error 404 Team** for a school hackathon. 🚀
It leverages a modern web development stack to deliver a smooth, interactive 2D gaming experience right in the browser.

---

## 📚 Project Overview

This project is a powerful combination of game development tools and a cutting-edge frontend stack:

- **Phaser 3**: The robust 2D game framework for rendering and game logic.
- **Vite**: The next-generation frontend tool for lightning-fast development and optimized production builds.
- **Firebase**: Provides reliable cloud services for hosting, authentication, and potentially a real-time database (e.g., Firestore for high scores).
- **Python Tools**: Utility scripts for advanced asset preparation, specifically for generating **normal map atlases** for dynamic lighting effects.

---

## 🚀 Getting Started

### ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher)
- **npm** (v9.x or higher)
- **Python 3** (Required for asset generation tools)
- **Firebase CLI**: Install globally using `npm install -g firebase-tools`

### 📦 Installation

1. **Clone the repository:**
   
   ```bash
   git clone [https://github.com/your-username/phaser-firebase-game.git](https://github.com/your-username/phaser-firebase-game.git)
   cd phaser-firebase-game
   ```

2. **Install JavaScript dependencies:**
   
   ```bash
   npm install
   ```

3. **Install Python dependencies** (if required by your tools):
   
   ```bash
   # Assuming a requirements.txt file exists for Python dependencies
   pip install -r requirements.txt
   ```

4. **Initialize Firebase** (if setting up for the first time):
   
   ```bash
   firebase login
   firebase init
   # During init, make sure to set the Public Directory to 'dist' for hosting
   ```

---

## 🛠️ Available Scripts

Use these npm scripts to manage your development workflow:

| Command                         | Description                                                                                      |
|:------------------------------- |:------------------------------------------------------------------------------------------------ |
| `npm run dev`                   | Starts the local development server with **Hot Module Replacement (HMR)**.                       |
| `npm run build`                 | Compiles and optimizes the project for production, outputting files to the **`dist`** directory. |
| `npm run preview`               | Serves the production-ready build from the `dist` directory locally for final testing.           |
| `npm run deploy`                | Runs the production build and deploys the `dist` folder to **Firebase Hosting**.                 |
| `npm run build:normalmap-atlas` | Executes the Python script to generate the normal map texture atlas.                             |

---

## 🌐 Firebase Deployment

To deploy your game to the live web via Firebase Hosting:

1. **Log in to Firebase:**
   
   ```bash
   firebase login
   ```

2. **Initialize Firebase (if not already):**
   
   ```bash
   firebase init
   ```

3. **Make sure the `public` directory is set to `dist`**

4. **Build and deploy:**
   
   ```bash
   npm run build
   npm run deploy
   ```

---

## 🖼️ Normal Map Atlas Generation

The project includes a utility to create a single texture atlas for all normal maps, which is essential for efficient dynamic lighting in Phaser 3.

**To run the tool:**

```bash
npm run build:normalmap-atlas
```

**Note:** This command executes the Python script located at `./tools/build_normalmapsheet.py`. Make sure your source normal map images are in the expected input directory for the script.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👥 Authors and Contributions

Created with passion by the **Error 404 Team** for a school hackathon.
We welcome contributions! If you have suggestions, bug reports, or want to add a feature, please feel free to:

1. **Fork** the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add an AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.
