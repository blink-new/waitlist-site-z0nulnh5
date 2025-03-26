
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email')
})

type FormData = z.infer<typeof formSchema>

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[640px] mx-auto text-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] text-white">
            Join the waitlist
          </h1>
          <p className="text-lg text-zinc-400">
            Be the first to experience something new
          </p>
        </motion.div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className="w-full h-12 px-4 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder:text-zinc-400"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 text-left">{errors.email.message}</p>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-6 rounded-lg bg-white text-black font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Join Now
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <p className="text-sm text-zinc-400 mt-4">
              Join {waitlistCount.toLocaleString()} others waiting in line
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-4 rounded-lg border border-green-500/20 bg-green-500/10"
          >
            <p className="text-green-500 font-medium">
              You're on the waitlist! We'll notify you when we launch.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}