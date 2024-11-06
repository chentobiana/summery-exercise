# Monday.com Board Item Viewer

A React application that displays and manages items from a Monday.com board using their GraphQL API. Built with React Query for efficient data fetching and Monday UI React Core components for a consistent look and feel.

## Features

- Displays board items in a table format with the following columns:
  - Name
  - Description
  - Due Date
  - Status (with color-coded chips)
- Auto-refreshes data every 30 seconds
- Ability to delete items
- Responsive loading and error states
- Status indicators using Monday.com's design system

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- A Monday.com account with API access
- A Monday.com board ID

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_API_KEY=your_monday_api_key_here
VITE_BOARD_ID=your_board_id_here
```

> **Note**: To get your API key and Board ID:
> - API Key: Go to Monday.com → Profile → Developers → My access Token 
> - Board ID: Open your Monday.com board → The number in the URL is your board ID

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Technologies Used

- React
- React Query for data fetching and cache management
- Vibe Design System by monday.com for components
- Vite as the build tool
- Monday.com GraphQL API

## Project Structure

- `src/`
  - `api/` - API integration with Monday.com
  - `components/` - React components
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions and constants

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally

## Notes

- The table automatically refreshes every 30 seconds to keep data up to date
- Items can be deleted using the delete icon in the actions column
- Status chips are color-coded based on the item's status:
  - "Working on it" - Yellow
  - "Stuck" - Red
  - "Done" - Green
  - Default - Blue
