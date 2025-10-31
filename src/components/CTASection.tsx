// components/CTASection.tsx
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 font-['Ubin_Sans']">
          Let's Build Together
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          From homes and offices to large-scale developments — we design with creativity, precision, and purpose.
        </p>
        <Link
          href="/contact"
          className="px-8 py-4 rounded-lg bg-gray-900 text-white text-lg font-semibold hover:bg-gray-700 transition font-['Ubin_Sans']"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
