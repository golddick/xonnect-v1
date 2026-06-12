"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Link as LinkIcon, Calendar, Crown } from "lucide-react"

interface User {
  id: string
  fullName: string | null
  email: string
  profileImage: string | null
  userName: string
  phoneNumber?: string | null
  role: string
}

interface StaffMember {
  id: string
  name: string
  role: string
  email?: string
  phone?: string
  bio?: string
  avatar?: string
  facebookUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  websiteUrl?: string
  calendlyUrl?: string
  displayOrder: number
  isActive: boolean
  userId: string
  user: User

}

interface TeamSectionProps {
  maxDisplay?: number
  showSocialLinks?: boolean
  showContactInfo?: boolean
}

const TeamSection = ({ 
  maxDisplay, 
  showSocialLinks = true, 
  showContactInfo = false 
}: TeamSectionProps) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/system-info/team')
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members')
      }
      
      const data = await response.json()
      setStaffMembers(data)
    } catch (error) {
      console.error('Error fetching team members:', error)
      setError('Failed to load team members')
    } finally {
      setIsLoading(false)
    }
  }

  // Filter active staff members and apply max display limit
  const displayMembers = staffMembers
    .filter(staff => staff.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, maxDisplay)

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(maxDisplay || 4)].map((_, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center animate-pulse">
            <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">{error}</p>
        <button 
          onClick={fetchTeamMembers}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (displayMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No team members found</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {displayMembers.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group relative"
        >
          {/* Super Admin Badge */}
          {/* {member.isSuperAdmin && (
            <div className="absolute top-4 right-4 flex items-center space-x-1">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                Super Admin
              </span>
            </div>
          )} */}
          
          {/* Avatar */}
          <div className="relative mb-4">
            <Image
              src={member.avatar || member.user.profileImage || "/placeholder-avatar.jpg"}
              alt={member.name}
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-white/20 group-hover:border-red-500 transition-colors"
            />
          </div>

          {/* Name and Role */}
          <h3 className="text-xl font-bold mb-2">{member.name}</h3>
          <p className="text-red-400 text-sm mb-4">{member.role}</p>

          {/* Bio */}
          {member.bio && (
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {member.bio}
            </p>
          )}

          {/* Contact Info */}
          {showContactInfo && (
            <div className="space-y-2 mb-4">
              {member.email && (
                <div className="flex items-center justify-center text-gray-400 text-sm">
                  <Mail className="w-3 h-3 mr-2" />
                  <a 
                    href={`mailto:${member.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center justify-center text-gray-400 text-sm">
                  <Phone className="w-3 h-3 mr-2" />
                  <a 
                    href={`tel:${member.phone.replace(/[^\d+]/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {member.phone}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Social Links */}
          {showSocialLinks && (
            <div className="flex justify-center space-x-3">
              {member.facebookUrl && (
                <a
                  href={member.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {member.twitterUrl && (
                <a
                  href={member.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {member.instagramUrl && (
                <a
                  href={member.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.websiteUrl && (
                <a
                  href={member.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Website"
                >
                  <LinkIcon className="w-4 h-4" />
                </a>
              )}
              {member.calendlyUrl && (
                <a
                  href={member.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                  aria-label="Calendly"
                >
                  <Calendar className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default TeamSection