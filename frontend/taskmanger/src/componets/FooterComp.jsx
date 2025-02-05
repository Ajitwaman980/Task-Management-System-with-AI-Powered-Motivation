import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const FooterComp = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center">
      <p className="p-2 text-xl ">© 2025 Ajit Waman All rights reserved.</p>
      <p>Developed by Ajit Waman</p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://github.com/ajitwaman980"
          target="_blank"
          className="text-white"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/ajit-waman-143692225/"
          target="_blank"
          className="text-white"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://x.com/ajitwaman980"
          target="_blank"
          className="text-white"
        >
          <Twitter size={24} />
        </a>
      </div>
    </footer>
  );
};

export default FooterComp;
