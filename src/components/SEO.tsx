"use client";
import React from "react";
import Script from "next/script";

export default function SEO() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ARC 11 ARCHITECT",
    url: "https://www.arcelevenarchitect.com",
    image: "https://www.arcelevenarchitect.com/amcmep-icon.png",
    logo: "https://www.arcelevenarchitect.com/amcmep-icon.png",
    telephone: "+91-85273-78555",
    email: "arcelevenarchitect@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "House No. 535, Second Floor, Left Side, Khasra No. 60, 128-D21, Chattarpur Pahadi",
      addressLocality: "New Delhi",
      postalCode: "110074",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5068707,
      longitude: 77.1847125,
    },
    founder: {
      "@type": "Person",
      name: "Shashank Saini",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-85273-78555",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    hasPart: [
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/about", name: "About Us" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/contact", name: "Contact Us" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/portfolio", name: "Portfolio" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/blog", name: "Blog" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/journal", name: "Journal" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/services", name: "Services" },
    ],
    sameAs: [
      "https://www.instagram.com/arc11studio_/",
      "https://koloapp.in/delhi/architects/shashank-saini--delhi",
      "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/?originalSubdomain=in",
      "https://www.facebook.com/profile.php?id=61578009358525",
    ],
    serviceType: [
      "Architecture Design",
      "Interior Design",
      "Construction",
      "Sustainable Architecture",
      "Consultation",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does ARC 11 ARCHITECT provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide architectural design, interior solutions, construction, and consultation services across Delhi NCR.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide consultation for projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ARC 11 ARCHITECT provides professional consultation for residential and commercial projects.",
        },
      },
      {
        "@type": "Question",
        name: "Where are you located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are based in Delhi NCR and serve clients across the region.",
        },
      },
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ARC 11 ARCHITECT",
    url: "https://www.arcelevenarchitect.com",
    logo: "https://www.arcelevenarchitect.com/amcmep-icon.png",
    sameAs: [
      "https://www.instagram.com/arc11studio_/",
      "https://koloapp.in/delhi/architects/shashank-saini--delhi",
      "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/?originalSubdomain=in",
      "https://www.facebook.com/profile.php?id=61578009358525",
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.arcelevenarchitect.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://www.arcelevenarchitect.com/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: "https://www.arcelevenarchitect.com/contact",
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Architecture & Interior Design",
    provider: {
      "@type": "LocalBusiness",
      name: "ARC 11 ARCHITECT",
      url: "https://www.arcelevenarchitect.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Delhi NCR, India",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.arcelevenarchitect.com/services",
      priceCurrency: "INR",
      price: "Consultation-based",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <Script
        id="ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}