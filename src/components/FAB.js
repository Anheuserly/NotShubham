import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Info } from "lucide-react";

const FAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fab-container">
      {open && (
        <motion.div
          className="fab-options"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
            <Phone size={24} /> WhatsApp
          </a>
          <a href="/contact">
            <MessageSquare size={24} /> Contact Us
          </a>
          <a href="/about">
            <Info size={24} /> About Us
          </a>
        </motion.div>
      )}
      <motion.button
        className="fab-main"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
      >
        +
      </motion.button>
    </div>
  );
};

export default FAB;
