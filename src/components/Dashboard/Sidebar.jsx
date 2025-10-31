// src/components/Dashboard/Sidebar.jsx
import Link from "next/link";

const menuItems = [
  { id: "overview", name: "Dashboard Overview", icon: "📊" },
  { id: "service_requests", name: "Service Requests", icon: "🔧" },
  { id: "clients", name: "Clients", icon: "👥" },
  { id: "contacts", name: "Contacts", icon: "📞" },
  { id: "feed", name: "Feed Posts", icon: "📝" },
  { id: "vendors", name: "Vendor Showcase", icon: "🏢" },
  { id: "analytics", name: "Analytics", icon: "📈" },
  { id: "settings", name: "Settings", icon: "⚙️" }
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 transform transition duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-white text-xl font-semibold">Admin Dashboard</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 text-gray-100 rounded-lg
                  ${activeTab === item.id 
                    ? 'bg-blue-700 text-white' 
                    : 'hover:bg-gray-800'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                A
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs font-medium text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}