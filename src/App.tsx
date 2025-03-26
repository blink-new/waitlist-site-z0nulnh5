
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sparkles, ArrowRight, Check } from 'lucide-react'

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
    // Get stored emails count
    const emails = JSON.parse(localStorage.getItem('waitlist') || '[]')
    setWaitlistCount(emails.length)
  }, [])

  const onSubmit = async (data: FormData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const emails = JSON.parse(localStorage.getItem('waitlist') || '[]')
    if (!emails.includes(data.email)) {
      emails.push(data.email)
      localStorage.setItem('waitlist', JSON.stringify(emails))
      setWaitlistCount(emails.length)
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-zinc-800 text-zinc-200 mb-8"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Coming Soon
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6"
        >
          Something Amazing is Coming
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-zinc-400 mb-12"
        >
          Join {waitlistCount.toLocaleString()} others on the waitlist for early access.
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className="w-full px-6 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? (
                'Joining...'
              ) : (
                <>
                  Join Now
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-green-500 font-medium"
          >
            <Check className="w-5 h-5" />
            You're on the list! We'll be in touch soon.
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}