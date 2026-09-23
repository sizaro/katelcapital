import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#003F8E] text-white mt-16">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-[#F7C621]">Katel Capital</h2>

          <p className="text-sm text-gray-200 mt-3 leading-relaxed">
            Connecting organizations with reliable professionals and creating
            meaningful career opportunities across Africa.
          </p>

          {/* NEW TAGLINE */}
          <p className="mt-5 text-sm font-medium text-[#F7C621] leading-relaxed">
            Skilled professionals. Faster hiring. Stronger teams.
          </p>
        </div>

        {/* FOR PROFESSIONALS */}
        <div>
          <h3 className="font-semibold text-[#F7C621] mb-3">
            For Professionals
          </h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <button
                onClick={() => navigate("/professionals")}
                className="hover:text-white"
              >
                Find Work
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/pricing")}
                className="hover:text-white"
              >
                Pricing
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-white"
              >
                About Katel
              </button>
            </li>
          </ul>
        </div>

        {/* FOR ORGANIZATIONS */}
        <div>
          <h3 className="font-semibold text-[#F7C621] mb-3">
            For Organizations
          </h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <button
                onClick={() => navigate("/organizations")}
                className="hover:text-white"
              >
                Start Hiring
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/pricing")}
                className="hover:text-white"
              >
                Workforce Pricing
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-white"
              >
                Why Katel
              </button>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-[#F7C621] mb-3">Contact</h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              Email:{" "}
              <a
                href="mailto:talent@katelcapital.net"
                className="hover:text-[#F7C621]"
              >
                talent@katelcapital.net
              </a>
            </li>

            <li>
              Phone:{" "}
              <a
                href="https://wa.me/256788164317"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F7C621]"
              >
                +256788164317 (WhatsApp)
              </a>
            </li>

            <li>Kampala, Uganda</li>
          </ul>

          <div className="flex gap-4 mt-4 text-sm flex-wrap">
            <a
              href="https://www.facebook.com/share/16C3VFjQZPP/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F7C621]"
            >
              Facebook
            </a>

            <a
              href="https://www.linkedin.com/company/katel-capital-ltd/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F7C621]"
            >
              LinkedIn
            </a>

            <a
              href="https://wa.me/256788164317"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F7C621]"
            >
              WhatsApp
            </a>

            <a
              href="https://www.tiktok.com/@katel.capital.ltd?_r=1&_t=ZS-99weCFVEnVl"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F7C621]"
            >
              TikTok
            </a>

            <a
              href="https://www.instagram.com/katelcapital?stkn=MTZhMGZlam93b3BkNA=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F7C621]"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          {/* COPYRIGHT */}
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Katel Capital. All rights reserved.
          </p>

          {/* FOOTER LINKS */}
          <div className="flex gap-6 mt-3 md:mt-0">
            <button className="hover:text-[#F7C621] transition">
              Privacy Policy
            </button>

            <button className="hover:text-[#F7C621] transition">Terms</button>
          </div>
        </div>

        {/* SIZAFORGETECH CREDIT */}
        <div className="text-center pb-5 text-xs text-gray-300 px-4">
          Built & maintained by{" "}
          <a
            href="https://sizaforgetech.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#F7C621] font-semibold hover:underline"
          >
            SizaForgeTech
          </a>
        </div>
      </div>
    </footer>
  );
}
