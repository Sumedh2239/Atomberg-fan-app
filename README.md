# Atomberg Fan Control (Mock App)

A modern, responsive mock application for controlling Atomberg smart fans. Built with a sleek UI inspired by premium smart home dashboards, featuring dark mode, animations, and interactive controls. This app simulates fan management with power toggling, speed adjustment, and real-time status updates.

## Features

- **User Authentication**: Mock login with API key and refresh token.
- **Fan Dashboard**: Grid view of connected fans with status indicators.
- **Interactive Controls**: Modal-based controls for power and speed (1-5 levels).

## Tech Stack

- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Styling**: Tailwind CSS with custom animations
- **Icons**: SVG-based fan illustrations

## Project Structure

```
mock_fan_app/
├── backend/            # Node.js server
│   ├── server.js
│   └── package.json
└── frontend/           # Original frontend files
    ├── index.html
    └── script.js
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/mock-fan-app.git
cd mock-fan-app
```

### Run Locally

1. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Run the Backend Server**:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

3. **Open Frontend**:
   - Open `index.html` in your browser (or serve with `python -m http.server` in the root directory).
   - !!! Do not open the `index.html` in main folder open the file in `frontend\index.html` in your browser.
4. **Test the App**:
   - Use demo credentials: API Key `demo_api_key`, Refresh Token `demo_refresh_token`.
   - Connect to load fans.
   - Toggle power and adjust speed.

## Usage

1. **Login**: Enter demo API credentials and click "Connect".
2. **View Fans**: See a grid of fans with status (ON/OFF) and speed.
3. **Control Fans**: Click a fan card to open a modal.
   - Toggle power (ON/OFF).
   - Adjust speed with the slider (1-5).
4. **Theme Toggle**: Use the sun icon in the nav to switch themes.
5. **Responsive**: Works on mobile (modal slides from bottom).

## API Endpoints

- `GET /v1/get_access_token`: Mock authentication.
- `GET /v1/get_list_of_devices`: Fetch fan list.
- `POST /v1/send_command`: Send control commands.

## Limitations

- **Mock Data**: All data is simulated; no real hardware integration.
- **Local Only**: Designed for local development; not optimized for production deployment.

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Commit changes.
4. Push and create a PR.

## License

This project is for demonstration purposes. Feel free to modify and use.

## Demo Credentials

- **API Key**: `demo_api_key`
- **Refresh Token**: `demo_refresh_token`

Enjoy controlling your mock Atomberg fans! 🚀
