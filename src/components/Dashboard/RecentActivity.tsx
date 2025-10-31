// src/components/Dashboard/RecentActivity.jsx
export default function RecentActivity({ activities }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <p className="text-gray-500 mt-1">Latest service requests and activities</p>
      </div>
      
      <div className="p-6">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent activity found.
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.$id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {activity.name ? activity.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {activity.name || "Unknown User"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(activity.$createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">
                    {activity.serviceType || "Service"} - {activity.city || "Unknown location"}
                  </p>
                  
                  <div className="mt-2 flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status || "unknown"}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ₹{activity.amount || "0"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}