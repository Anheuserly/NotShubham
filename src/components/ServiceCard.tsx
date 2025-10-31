import Link from 'next/link';
import React from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl">
        {service.icon}
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{service.title}</h3>
      <p className="mt-2 text-gray-500">{service.description}</p>
      <div className="mt-4">
        <Link 
          href={`/services/${service.id}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Request Service →
        </Link>
      </div>
    </div>
  );
}