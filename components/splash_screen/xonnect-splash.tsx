// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"

// export default function XonnectSplash() {
//   const [isVisible, setIsVisible] = useState(true)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     checkMobile()
//     window.addEventListener("resize", checkMobile)

//     const timer = setTimeout(() => {
//       setIsVisible(false)
//     }, 6000)

//     return () => {
//       clearTimeout(timer)
//       window.removeEventListener("resize", checkMobile)
//     }
//   }, [])

//   if (!isVisible) return null

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden">
//       <div className="absolute inset-0">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={`line-${i}`}
//             className="absolute bg-red-500/10"
//             style={{
//               width: "1px",
//               height: "100%",
//               left: `${(i + 1) * 6.25}%`,
//             }}
//             animate={{
//               opacity: [0.1, 0.3, 0.1],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 md:px-8">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{
//             scale: 1,
//             opacity: 0.2,
//           }}
//           transition={{
//             duration: 1.5,
//             ease: "easeOut",
//           }}
//           className={`absolute ${isMobile ? "w-40 h-40" : "w-64 h-64"} rounded-full bg-red-600 blur-3xl`}
//         />

//         <div className="relative z-20 flex flex-col items-center justify-center">
//           <div className="flex items-center justify-center flex-wrap">
//             {"XONNECT".split("").map((letter, i) => (
//               <motion.span
//                 key={i}
//                 className="inline-block text-foreground font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
//                 style={{
//                   fontFamily: "var(--font-sans)",
//                 }}
//                 initial={{
//                   y: 20,
//                   opacity: 0,
//                 }}
//                 animate={{
//                   y: 0,
//                   opacity: 1,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                   delay: 0.5 + i * 0.1,
//                   ease: "easeOut",
//                 }}
//               >
//                 {letter}
//               </motion.span>
//             ))}
//           </div>

//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
//             className={`${isMobile ? "h-1 mt-3 w-32" : "h-2 mt-4 w-48"} bg-red-600 rounded-full`}
//           />
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 2, ease: "easeOut" }}
//           className={`absolute ${isMobile ? "bottom-20" : "bottom-24"} left-1/2 transform -translate-x-1/2 max-w-xs sm:max-w-sm md:max-w-md`}
//         >
//           <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center break-words tracking-widest uppercase">
//             Bringing the world experience to you
//           </p>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 3 }}
//         className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3"
//       >
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={`dot-${i}`}
//             className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [0.4, 1, 0.4],
//             }}
//             transition={{
//               duration: 1.2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: i * 0.2,
//             }}
//           />
//         ))}
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, delay: 5.2 }}
//         className="absolute inset-0 bg-background pointer-events-none"
//       />
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface XonnectSplashProps {
  onComplete?: () => void
}

export default function XonnectSplash({ onComplete }: XonnectSplashProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
   

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.() // Call the callback when splash is done
    }, 6000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute "
            style={{
              width: "1px",
              height: "100%",
              left: `${(i + 1) * 6.25}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.2,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className={`absolute ${isMobile ? "w-40 h-40" : "w-64 h-64"} rounded-full  blur-3xl`}
        />

        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center flex-wrap">
            {"XONNECT".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-foreground font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                style={{
                  fontFamily: "var(--font-sans)",
                }}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className={`${isMobile ? "h-1 mt-3 w-32" : "h-2 mt-4 w-48"} bg-red-600 rounded-full`}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
          className={`absolute ${isMobile ? "bottom-20" : "bottom-24"} left-1/2 transform -translate-x-1/2 max-w-xs sm:max-w-sm md:max-w-md`}
        >
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center break-words tracking-widest uppercase">
            Bringing the world experience to you
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 5.2 }}
        className="absolute inset-0 bg-background pointer-events-none"
      />
    </div>
  )
}