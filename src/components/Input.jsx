export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className="flex flex-col gap-1 w-full text-left">
            {label && (
                <label className="text-sm font-medium text-gray-400">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-cyan-500 ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`} />
            {error && (
                <span className="text-xs text-red-400 font-medium">{error}</span>
            )}
        </div>
    );
}