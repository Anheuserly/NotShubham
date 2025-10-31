// src/components/Dashboard/StatsOverview.jsx
export default function StatsOverview({ stats }) {
  const statCards = [
    {
      title: "Total Services",
      value: stats.totalServices,
      icon: "🔧",
      color: "blue"
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: "👥",
      color: "green"
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: "⏱️",
      color: "yellow"
    },
    {
      title: "Completed Requests",
      value: stats.completedRequests,
      icon: "✅",
      color: "indigo"
    },
    {
      title: "Contacts",
      value: stats.totalContacts,
      icon: "📞",
      color: "purple"
    },
    {
      title: "Feed Posts",
      value: stats.totalFeedPosts,
      icon: "📝",
      color: "pink"
    },
    {
      title: "Vendors",
      value: stats.totalVendors,
      icon: "🏢",
      color: "red"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
    red: "bg-red-100 text-red-600"
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${colorClasses[card.color]}`}>
                <span className="text-xl">{card.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}