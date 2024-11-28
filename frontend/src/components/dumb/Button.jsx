/* eslint-disable react/prop-types */
export default function Button({ children, onClick, type }) {
    return (
        <>
            <div className="my-auto">
                <button
                    onClick={onClick}
                    type={type || 'button'}
                    className="px-2 py-1 rounded-md text-sm font-bold
                    border-2 border-zinc-400 text-zinc-400 inline-block
                    transition-colors
                    hover:bg-blue-500 hover:border-blue-500 hover:text-white
                    active:bg-blue-700"
                >
                    {children}
                </button>
            </div>
        </>
    )
}