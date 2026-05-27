export default function Notification({ message, visible }) {
  return (
    <div
      className="fixed top-24 right-0 glass-panel border-l-4 border-l-cyber-cyan p-4 pr-8 z-[100] transition-transform duration-300"
      style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}>
      <h4 className="font-orbitron text-sm text-cyber-cyan">SYSTEM ALERT</h4>
      <p className="text-xs text-white mt-1">{message}</p>
    </div>
  )
}
