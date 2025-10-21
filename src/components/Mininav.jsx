// ...existing code...
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const MiniNav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: "auto" });
  const menuRef = useRef(null); // nav container
  const dropdownRef = useRef(null); // portal dropdown element
  const closeTimer = useRef(null);

  const miniTVRef = useRef(null);
  const sellRef = useRef(null);

  // Close dropdowns if user clicks outside (including portal dropdown)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (menuRef.current && menuRef.current.contains(event.target)) ||
        (dropdownRef.current && dropdownRef.current.contains(event.target))
      ) {
        return;
      }
      setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on scroll/resize to avoid mis-positioned portal
  useEffect(() => {
    const handler = () => setOpenMenu(null);
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const openMenuAt = (menu, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: Math.max(200, rect.width),
    });
    // For hover behavior we want to open the menu (not toggle)
    setOpenMenu(menu);
  };

  const scheduleClose = (delay = 120) => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), delay);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);

  const DropdownPortal = ({ children, style }) => {
    return createPortal(
      <div
        ref={dropdownRef}
        onMouseEnter={cancelClose}
        onMouseLeave={() => scheduleClose(75)}
        style={style}
      >
        {children}
      </div>,
      document.body
    );
  };

  const dropdownBaseClass =
    "bg-white text-black rounded-md shadow-lg z-50 border";

  return (
    <nav
      ref={menuRef}
      className="bg-[#758A93] text-sm px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap text-white"
    >
      {/* All */}
      <button className="flex items-center gap-1 hover:underline cursor-pointer">
        ☰ <span>All</span>
      </button>

      {/* Amazon miniTV Dropdown */}
      <div className="relative">
        <button
          ref={miniTVRef}
          onMouseEnter={() => {
            cancelClose();
            openMenuAt("miniTV", miniTVRef);
          }}
          onMouseLeave={() => scheduleClose()}
          onFocus={() => {
            cancelClose();
            openMenuAt("miniTV", miniTVRef);
          }}
          onBlur={() => scheduleClose()}
          className="flex items-center gap-1 hover:underline cursor-pointer"
        >
          Amazon Home <span className="text-xs">▼</span>
        </button>

        {openMenu === "miniTV" && (
          <DropdownPortal
            style={{
              position: "absolute",
              top: menuPos.top,
              left: menuPos.left,
              minWidth: menuPos.width,
            }}
          >
            <div className={`${dropdownBaseClass}`} style={{ minWidth: 192 }}>
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Smart TVs
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Streaming devices
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Accessories
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Vacuum cleaners
                </li>
              </ul>
            </div>
          </DropdownPortal>
        )}
      </div>

      {/* Sell Dropdown */}
      <div className="relative">
        <button
          ref={sellRef}
          onMouseEnter={() => {
            cancelClose();
            openMenuAt("sell", sellRef);
          }}
          onMouseLeave={() => scheduleClose()}
          onFocus={() => {
            cancelClose();
            openMenuAt("sell", sellRef);
          }}
          onBlur={() => scheduleClose()}
          className="flex items-center gap-1 hover:underline cursor-pointer"
        >
          Kitchen <span className="text-xs">▼</span>
        </button>

        {openMenu === "sell" && (
          <DropdownPortal
            style={{
              position: "absolute",
              top: menuPos.top,
              left: menuPos.left,
              minWidth: menuPos.width + 40,
            }}
          >
            <div className={`${dropdownBaseClass}`} style={{ minWidth: 208 }}>
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Food & Beverage
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Juicers
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Coffee Makers
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Air Fryers
                </li>
              </ul>
            </div>
          </DropdownPortal>
        )}
      </div>

      {/* Other links */}
              <p className="hover:underline cursor-pointer">Home Appliances</p>
        <p className="hover:underline cursor-pointer">Today’s Deals</p>
        <p className="hover:underline cursor-pointer">Mobiles</p>
        <p className="hover:underline cursor-pointer">Customer Service</p>
        <p className="hover:underline cursor-pointer">Prime ▾</p>
        <p className="hover:underline cursor-pointer">Electronics</p>
        <p className="hover:underline cursor-pointer">Fashion</p>
        <p className="hover:underline cursor-pointer">New Releases</p>
        <p className="hover:underline cursor-pointer">Home & Kitchen</p>
    </nav>
  );
};

export default MiniNav;
// ...existing code...

{/* <div className="bg-[#758A93] text-sm px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button className="flex items-center gap-1 hover:underline cursor-pointer">
          <span>☰</span> All
        </button>
        <p className="hover:underline cursor-pointer">Amazon Home</p>
        <p className="hover:underline cursor-pointer">Kitchen</p>
        <p className="hover:underline cursor-pointer">Home Appliances</p>
        <p className="hover:underline cursor-pointer">Today’s Deals</p>
        <p className="hover:underline cursor-pointer">Mobiles</p>
        <p className="hover:underline cursor-pointer">Customer Service</p>
        <p className="hover:underline cursor-pointer">Prime ▾</p>
        <p className="hover:underline cursor-pointer">Electronics</p>
        <p className="hover:underline cursor-pointer">Fashion</p>
        <p className="hover:underline cursor-pointer">New Releases</p>
        <p className="hover:underline cursor-pointer">Home & Kitchen</p>
      </div> */}