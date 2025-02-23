import React from "react";

interface ResponsiveTextProps {
  text: string;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ text }) => {
  return (
    <p className="text-sm md:text-base lg:text-sm xl:text-m 2xl:text-m">
      {text}
    </p>
  );
};

export default ResponsiveText;
