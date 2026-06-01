// components/ui/Badge.jsx
export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-text',
  };

  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-full text-xs font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
