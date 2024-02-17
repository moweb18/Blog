const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 p-5 dark:border-neutral-700">
      <div className="container mx-auto text-center text-sm">
        <p className="text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()}. Modif Website
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
          <p className=" text-slate-500 dark:text-slate-400">
            Source code are licensed under
          </p>
          <a
            href="https://github.com/moweb18/Blog?tab=GPL-3.0-1-ov-file"
            className="text-blue-500 hover:underline"
          >
            GNU GENERAL PUBLIC LICENSE V3
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
