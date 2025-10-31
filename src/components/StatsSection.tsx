
// components/StatsSection.tsx
export default function StatsSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <div className="text-5xl font-extrabold mb-3 font-['Ubin_Sans']">500+</div>
            <p className="text-gray-300">Projects Completed</p>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3 font-['Ubin_Sans']">10+</div>
            <p className="text-gray-300">Years of Experience</p>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3 font-['Ubin_Sans']">98%</div>
            <p className="text-gray-300">Client Satisfaction</p>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3 font-['Ubin_Sans']">24/7</div>
            <p className="text-gray-300">Support & Consultation</p>
          </div>
        </div>
      </div>
    </section>
  );
}