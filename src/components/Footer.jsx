import React from "react";

export default function Footer() {
  const columns = [
    {
      title: "Get to Know Us",
      links: ["About Amazon", "Careers", "Press Releases", "Amazon Science"],
    },
    {
      title: "Connect with Us",
      links: ["Facebook", "Twitter", "Instagram"],
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell on Amazon",
        "Sell under Amazon Accelerator",
        "Protect and Build Your Brand",
        "Amazon Global Selling",
        "Supply to Amazon",
        "Become an Affiliate",
        "Fulfilment by Amazon",
        "Advertise Your Products",
        "Amazon Pay on Merchants",
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        "Your Account",
        "Returns Centre",
        "Recalls and Product Safety Alerts",
        "100% Purchase Protection",
        "Amazon App Download",
        "Help",
      ],
    },
  ];

  return (
    <footer className="mt-12">
      {/* Back to top */}
      <div className="w-full bg-slate-700 text-center text-white py-3 cursor-pointer hover:bg-slate-600">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-medium"
        >
          Back to top
        </button>
      </div>

      {/* Main footer */}
      <div className="bg-[#17212a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <nav aria-label="Footer" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-white text-lg font-semibold mb-4">{col.title}</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:underline hover:text-white"
                        onClick={(e) => e.preventDefault()}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}