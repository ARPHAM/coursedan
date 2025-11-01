export default function NavbarMain() {
  const links = [
    { href: "/link1", label: "Link 1" },
    { href: "/link2", label: "Link 2" },
    { href: "/link3", label: "Link 3" },
  ];

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4 w-full justify-center">
        {links.map((link, index) => (
          <p
            key={link.href}
            className={`${
              index !== 0 ? "border-l border-gray-300 pl-4" : ""
            } text-gray-700 hover:text-gray-900 cursor-pointer`}
          >
            {link.label}
          </p>
        ))}
      </div>
    </div>
  );
}
