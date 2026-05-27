import { useRef, useState } from 'react'

export default function Console({ open, onClose }) {
  const [lines, setLines] = useState([
    { text: 'Welcome to Jarvis Interface...', color: 'text-cyber-cyan' },
    { text: "Type 'help' for available commands.", color: 'text-gray-400' },
  ])
  const [input, setInput] = useState('')
  const outputRef = useRef(null)

  const add = (text, color) => {
    setLines(l => [...l, { text, color }])
    setTimeout(() => {
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
    }, 10)
  }

  const process = (cmd) => {
    add(`> ${cmd}`, 'text-white')
    switch (cmd) {
      case 'help':
        add('COMMANDS: help, projects, skills, contact, clear, date', 'text-cyber-cyan'); break
      case 'projects':
        add('NAVIGATING TO PROJECT LAB...', 'text-cyber-magenta')
        setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 500); break
      case 'skills':
        add('OPENING SKILLS MATRIX...', 'text-cyber-magenta')
        setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 500); break
      case 'contact':
        add('INITIATING UPLINK...', 'text-cyber-magenta')
        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 500); break
      case 'clear':
        setLines([]); break
      case 'date':
        add(new Date().toString(), 'text-yellow-400'); break
      default:
        add('ERROR: UNKNOWN COMMAND', 'text-red-500')
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim()
      if (cmd) process(cmd)
      setInput('')
    }
  }

  return (
    <div id="command-console"
      className={`fixed bottom-0 right-2 md:right-10 w-[92vw] md:w-[400px] h-64 bg-black/90 border border-cyber-cyan rounded-t-lg shadow-[0_-5px_30px_rgba(0,243,255,0.2)] z-50 flex flex-col font-mono ${open ? '' : 'hidden-console'}`}>
      <div className="h-8 bg-cyber-cyan/20 flex justify-between items-center px-4 cursor-default">
        <span className="text-xs text-cyber-cyan">TERMINAL_V1.0</span>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <button onClick={onClose} className="text-white hover:text-red-500 text-xs ml-1">✕</button>
        </div>
      </div>

      <div ref={outputRef} className="flex-grow p-4 overflow-y-auto text-xs space-y-1">
        {lines.map((l, i) => (
          <div key={i} className={l.color}>{l.text}</div>
        ))}
      </div>

      <div className="p-2 border-t border-white/10 flex items-center">
        <span className="text-cyber-magenta mr-2">{'>'}</span>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
          className="bg-transparent w-full text-white focus:outline-none text-sm"
          autoComplete="off" placeholder="type a command..." />
      </div>
    </div>
  )
}
