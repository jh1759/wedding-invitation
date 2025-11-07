import { motion } from 'framer-motion'
import { Hero } from './components/Hero'
import { CoupleInfo } from './components/CoupleInfo'
import { InvitationMessage } from './components/InvitationMessage'
import { ScheduleAndVenue } from './components/ScheduleAndVenue'
import { Gallery } from './components/Gallery'
import { RSVPForm } from './components/RSVPForm'
import { CommentSection } from './components/CommentSection'
import { AccountInfo } from './components/AccountInfo'
import { Footer } from './components/Footer'
import { DarkModeToggle } from './components/DarkModeToggle'
import { ScrollToTop } from './components/ScrollToTop'

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

function App() {
  return (
    <div className="min-h-screen">
      <DarkModeToggle />
      <Hero />
      
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <CoupleInfo />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <InvitationMessage />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <ScheduleAndVenue />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <Gallery />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <RSVPForm />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <CommentSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <AccountInfo />
      </motion.div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App

