// components/sections/TimelineItem.jsx
export default function TimelineItem({ time, title, description, icon }) {
  return (
    <div className="flex gap-4 mb-8 relative">
      {/* Timeline Dot */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
          {icon}
        </div>
        <div className="w-1 h-24 bg-secondary/30 mt-2"></div>
      </div>

      {/* Content */}
      <div className="pb-8">
        <p className="font-bold text-secondary text-sm">{time}</p>
        <h4 className="font-semibold text-lg text-primary leading-tight mt-1">
          {title}
        </h4>
        <p className="text-text-light text-sm mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
