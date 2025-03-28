
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sparkles, ArrowRight, Code, Palette, Zap } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email')
})

type FormData = z.infer<typeof formSchema>

const features = [
  {
    icon: Code,
    title: 'AI-Powered Development',
    description: 'Write beautiful code faster than ever'
  },
  {
    icon: Palette,
    title: 'Beautiful by Default',
    description: 'Create stunning interfaces effortlessly'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant responses, real-time updates'
  }
]

export default function App() {
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    const emails = JSON.parse(localStorage.getItem('waitlist') || '[]')
    setWaitlistCount(emails.length)
  }, [])

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const emails = JSON.parse(localStorage.getItem('waitlist') || '[]')
    if (!emails.includes(data.email)) {
      emails.push(data.email)
      localStorage.setItem('waitlist', JSON.stringify(emails))
      setWaitlistCount(emails.length)
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen gradient-bg text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[800px] mx-auto"
      >
        <div className="text-center space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-blue-500 font-medium bg-blue-500/10 w-fit mx-auto px-5 py-2.5 rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Meet Blink
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-400 max-w-[600px] mx-auto leading-relaxed">
              The world's first AI engineer that builds beautiful and functional apps in seconds
            </p>
          </motion.div>
        </div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-[520px] mx-auto mb-16"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder:text-zinc-500 text-lg input-glow"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 text-left">{errors.email.message}</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-8 rounded-xl bg-blue-600 text-white font-medium inline-flex items-center justify-center gap-2 hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-lg glow"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <p className="text-sm text-zinc-500 mt-4 text-center">
              Join {waitlistCount.toLocaleString()} developers waiting to try Blink
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[520px] mx-auto p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 text-center mb-16"
          >
            <p className="text-blue-400 font-medium text-lg">
              You're on the waitlist! We'll notify you when Blink is ready.
            </p>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="feature-card p-8 rounded-2xl border border-white/[0.08] text-center hover:border-white/[0.12] transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}