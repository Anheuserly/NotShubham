// src/components/Dashboard/Header.jsx
export default function Header({ onRefresh, onMenuToggle }) {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={onMenuToggle}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={onRefresh}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}