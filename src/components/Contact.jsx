import { useState } from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Contact({ showNotification }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    showNotification('TRANSMISSION SENT SUCCESSFULLY')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 relative min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full z-10">
        <div className="glass-panel p-1 rounded-xl neon-border">
          <div className="bg-black/80 p-6 md:p-12 rounded-lg">
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold mb-2 text-white">INITIATE UPLINK</h2>
            <p className="text-cyber-cyan font-mono text-sm mb-8">STATUS: WAITING FOR INPUT...</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: 'USER_ID (NAME)', type: 'text', key: 'name', placeholder: 'ENTER NAME' },
                { label: 'COMM_CHANNEL (EMAIL)', type: 'email', key: 'email', placeholder: 'ENTER EMAIL' },
              ].map(f => (
                <div key={f.key} className="group">
                  <label className="block text-xs font-mono text-gray-500 mb-1 group-focus-within:text-cyber-cyan transition-colors">
                    {f.label}
                  </label>
                  <input type={f.type} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-cyber-cyan transition-colors font-mono"
                    placeholder={f.placeholder} required />
                </div>
              ))}

              <div className="group">
                <label className="block text-xs font-mono text-gray-500 mb-1 group-focus-within:text-cyber-cyan transition-colors">
                  DATA_PACKET (MESSAGE)
                </label>
                <textarea rows={4} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-cyber-cyan transition-colors font-mono resize-none"
                  placeholder="ENTER MESSAGE" required />
              </div>

              <button type="submit"
                className="w-full py-4 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan font-bold font-orbitron tracking-widest hover:bg-cyber-cyan hover:text-black transition-all duration-300 text-sm md:text-base">
                EXECUTE SEND_PROTOCOL
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute bottom-10 right-4 md:right-10 flex flex-col gap-6 z-20">
        {[
          { Icon: Github, hover: 'hover:text-cyber-cyan', href: '#' },
          { Icon: Linkedin, hover: 'hover:text-blue-400', href: '#' },
          { Icon: Twitter, hover: 'hover:text-cyber-magenta', href: '#' },
        ].map(({ Icon, hover, href }) => (
          <a key={href + Icon.name} href={href}
            className={`text-gray-400 ${hover} hover:scale-125 transition-all duration-300`}>
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </section>
  )
}
