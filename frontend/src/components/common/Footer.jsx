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
          <h2 className="text-2xl font-bold text-[#F7C621]">
            Katel Capital
          </h2>

          <p className="text-sm text-gray-200 mt-3 leading-relaxed">
            Connecting organizations with reliable professionals and
            creating meaningful career opportunities across Africa.
          </p>
        </div>

        {/* FOR PROFESSIONALS */}
        <div>
          <h3 className="font-semibold text-[#F7C621] mb-3">
            For Professionals
          </h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <button onClick={() => navigate("/professionals")} className="hover:text-white">
                Find Work
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/services")} className="hover:text-white">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/contact")} className="hover:text-white">
                Join Network
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
              <button onClick={() => navigate("/organizations")} className="hover:text-white">
                Start Hiring
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/services")} className="hover:text-white">
                Workforce Solutions
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/pricing")} className="hover:text-white">
                Pricing
              </button>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-[#F7C621] mb-3">
            Contact
          </h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li>Email: support@katelcapital.com</li>
            <li>Phone: +256 XXX XXX XXX</li>
            <li>Kampala, Uganda</li>
          </ul>

          <div className="flex gap-4 mt-4 text-sm">
            <a href="#" className="hover:text-[#F7C621]">Facebook</a>
            <a href="#" className="hover:text-[#F7C621]">LinkedIn</a>
            <a href="#" className="hover:text-[#F7C621]">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">

          {/* LEFT */}
          <p>
            © {new Date().getFullYear()} Katel Capital. All rights reserved.
          </p>

          {/* CENTER / RIGHT LINKS */}
          <div className="flex gap-6 mt-2 md:mt-0">

            <button className="hover:text-[#F7C621]">
              Privacy Policy
            </button>

            <button className="hover:text-[#F7C621]">
              Terms
            </button>

          </div>
        </div>

        {/* SIZAFORGETECH CREDIT */}
        <div className="text-center pb-4 text-xs text-gray-300">
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