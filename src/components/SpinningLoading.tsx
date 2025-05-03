import { useEffect, useState } from "react";

const SpinningLoading = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setVisible(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-sky-500 border-t-transparent" />
    </div>
  );
};

export default SpinningLoading;
