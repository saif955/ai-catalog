# AI Catalog

A modern, feature-rich AI agents catalog built with Next.js 15, Redux Toolkit, and shadcn/ui components. Discover and explore intelligent AI agents for your business needs with advanced filtering, search, and state management capabilities.

## ✨ Features

### 🎯 Core Functionality

- **AI Agents Catalog** - Browse and explore 10+ AI agents
- **Advanced Search** - Real-time search by name and description
- **Multi-Filter System** - Filter by status, category, and pricing model
- **Dynamic Sorting** - Sort by name, category, status, or pricing
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 🔍 Filtering & Search

- **Search Bar** - Case-insensitive search across agent names and descriptions
- **Status Filters** - Multiple selection for Active, Beta, and Archived agents
- **Category Filters** - Multiple selection across 8 business categories
- **Pricing Model Filter** - Single selection for Subscription, Per-Use, and Free Tier
- **Clear All Filters** - One-click reset to default state
- **Active Filters Display** - Visual indicators with individual removal options

### 🆕 Server-Side Data Fetching (Next.js App Router)

- **Server-rendered Agents List** - Agents data is fetched on the server at request time using Next.js App Router conventions (async server component)
- **No Client-side Fetching** - All agent data is available on initial page load for SEO and performance
- **Redux Initialization** - Redux state is initialized with server-fetched data

### 🏗️ State Management

- **Redux Toolkit** - Centralized state management
- **Server-Side Data Fetching** - Agents are loaded on the server in `page.tsx` and passed to the client
- **No Client-side Retry** - Error states are static, as data is always fetched server-side
- **Optimized Filtering** - Real-time filtering with performance optimization
- **Type Safety** - Full TypeScript support throughout

### 🎨 User Experience

- **Loading States** - Skeleton loaders during data fetching
- **Error States** - User-friendly error messages with retry options
- **Hover Effects** - Interactive card animations
- **Dark Mode Support** - Automatic theme adaptation
- **Accessibility** - ARIA labels and keyboard navigation

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15** - React framework with App Router and server-side data fetching
- **React 19** - Latest React features and performance improvements
- **TypeScript** - Type-safe development experience

### State Management

- **Redux Toolkit** - Modern Redux with simplified boilerplate
- **React Redux** - React bindings for Redux
- **Async Thunks** - Handling asynchronous operations

### UI Components

- **shadcn/ui** - High-quality, accessible component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions

### Development Tools

- **ESLint** - Code linting and quality enforcement
- **Turbopack** - Fast bundler for development
- **PostCSS** - CSS processing and optimization

### Data Fetching

- **Server Component Fetching** - Agents data is loaded in `page.tsx` using Node.js file system APIs (or can be replaced with an API call)
- **No useEffect or Thunks for Fetching** - All data is available at render time

## 🛠️ Modular UI Components

- **AgentCard** - Renders a single agent card, fully responsive and contained
- **SidebarFilters** - Handles all search and filter UI in a left sidebar
- **ThemeToggle** - Light/dark mode toggle

## 📁 Project Structure

```
ai-catalog/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Main page component
│   │   ├── agents-catalog-client.tsx # Client-side catalog component
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── providers.tsx            # Redux provider wrapper
│   │   └── ui/                      # shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── select.tsx
│   └── lib/
│       ├── store.ts                 # Redux store configuration
│       ├── hooks.ts                 # Typed Redux hooks
│       └── slices/
│           └── agentsSlice.ts       # Agents state management
├── mock-agents.json                 # Sample agent data
├── public/                          # Static assets
└── package.json                     # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-catalog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Data Structure

### Agent Interface

```typescript
interface Agent {
  id: string; // Unique identifier
  name: string; // Agent name
  description: string; // Detailed description
  status: string; // Active, Beta, or Archived
  category: string; // Business category
  pricingModel: string; // Subscription, Per-Use, or Free Tier
}
```

### Sample Data

The application uses `mock-agents.json` containing 10 AI agents across 8 categories:

- **Customer Service** (2 agents)
- **Marketing** (2 agents)
- **Operations** (1 agent)
- **Data Analysis** (1 agent)
- **Development** (1 agent)
- **Human Resources** (1 agent)
- **Finance** (1 agent)
- **Legal** (1 agent)

## 🎯 Key Features Explained

### Redux State Management

- **Centralized State** - All application state in Redux store
- **Async Operations** - Data fetching with loading/error states
- **Optimized Filtering** - Computed filtered results
- **Type Safety** - Full TypeScript integration

### Advanced Filtering

- **Real-time Search** - Instant filtering as you type
- **Multiple Selections** - Choose multiple statuses and categories
- **Combined Filters** - All filters work together seamlessly
- **Visual Feedback** - Clear indication of active filters

### Performance Optimizations

- **Efficient Re-renders** - Only affected components update
- **Memoized Filtering** - Optimized filter calculations
- **Lazy Loading** - Components load when needed
- **Bundle Optimization** - Tree-shaking and code splitting

## 🔧 Customization

### Adding New Agents

1. Update `mock-agents.json` with new agent data
2. Follow the existing data structure
3. The application will automatically detect new categories and options

### Modifying Filters

1. Edit `src/lib/slices/agentsSlice.ts`
2. Update the `filterAndSortAgents` function
3. Add new filter actions as needed

### Styling Changes

1. Modify `src/app/globals.css` for global styles
2. Update component-specific styles in their respective files
3. Use Tailwind CSS classes for rapid styling

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration

### Other Platforms

1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Deploy the `.next` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icons

---

**Built with ❤️ using modern web technologies**
