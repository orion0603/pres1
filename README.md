# Badir Blockchain Presentation

An interactive web-based presentation explaining blockchain technology and the donation platform for Gaza, with a focus on smart contracts and blockchain transparency.

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd badir-blockchain-presentation
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Presentation Controls

- Use the navigation dots on the right side to jump to specific slides
- Use arrow keys (up/down) to navigate between slides
- Click the "Start" button on the landing page to begin the presentation
- On mobile devices, use the arrow buttons in the bottom right corner

## Project Structure

- `/client` - Frontend React application
  - `/src/components/slides` - Individual presentation slides
  - `/src/components/animations` - Animation components
  - `/src/components/ui` - Reusable UI components
- `/server` - Backend Express server for serving the application
- `/shared` - Shared types and schemas used by both frontend and backend

## Technologies Used

- React with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Express.js for the backend server

## Building for Production

To create a production build:

```
npm run build
```

The production build will be created in the `dist` directory.