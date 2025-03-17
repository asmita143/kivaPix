import React from "react";

interface EventHeaderProps {
  title: string;
  subtitle?: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="font-medium text-lg md:text-xl lg:text-2xl">{title}</h1>
      {subtitle && (
        <p className="text-neutral-600 text-sm md:text-base">{subtitle}</p>
      )}
    </div>
  );
};

export default EventHeader;
