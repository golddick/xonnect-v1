import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Heart, Zap, Globe, ArrowRight } from "lucide-react"

const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Join our frontend team to build the next generation of creator tools and community features.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX design sense"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Product Manager - Creator Tools",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Lead the development of innovative tools that empower creators to build and monetize their communities.",
    requirements: ["3+ years product management", "Creator economy experience", "Data-driven mindset"],
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Community Success Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    description: "Help our creator community thrive by providing support, resources, and building relationships.",
    requirements: ["Community management experience", "Excellent communication", "Creator platform knowledge"],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Backend Engineer - Infrastructure",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Build scalable infrastructure to support millions of creators and their communities.",
    requirements: ["Node.js/Python expertise", "Cloud platforms (AWS/GCP)", "Microservices architecture"],
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Design intuitive experiences that make content creation and community building effortless.",
    requirements: ["5+ years UX design", "Figma proficiency", "User research experience"],
    posted: "1 week ago",
  },
  {
    id: 6,
    title: "Marketing Intern",
    department: "Marketing",
    location: "San Francisco, CA",
    type: "Internship",
    description: "Support our marketing team in creator outreach, content creation, and campaign management.",
    requirements: ["Marketing/Communications student", "Social media savvy", "Creative mindset"],
    posted: "4 days ago",
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance plus wellness stipend",
  },
  {
    icon: Zap,
    title: "Growth & Learning",
    description: "Annual learning budget, conference attendance, and internal mentorship programs",
  },
  {
    icon: Globe,
    title: "Remote Flexibility",
    description: "Work from anywhere with flexible hours and home office setup allowance",
  },
  {
    icon: Users,
    title: "Team Culture",
    description: "Regular team events, offsites, and a collaborative, inclusive work environment",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Join the{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Xonnect</span>{" "}
              Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Help us build the future of creator communities. We're looking for passionate individuals who want to
              empower creators and revolutionize digital collaboration.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Work at Xonnect?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're building more than just a platform – we're creating a movement that empowers creators worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 group text-center"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Open Positions</h2>
            <p className="text-xl text-gray-300">
              Find your next opportunity and help shape the future of creator communities
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card
                key={job.id}
                className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
                        <Badge className="bg-red-600 text-white border-red-600">{job.department}</Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {job.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {job.posted}
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">{job.description}</p>

                      <div>
                        <h4 className="font-semibold mb-3 text-white">Key Requirements:</h4>
                        <ul className="text-gray-400 space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <Button className="bg-red-600 hover:bg-red-700 w-full lg:w-auto">
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Don't see a role that fits? We're always looking for talented people.</p>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Culture</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe in creating an environment where everyone can do their best work and grow their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <img
                  src="/diverse-group-of-people-connecting-online.png"
                  alt="Team collaboration"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-white">Collaborative Environment</h3>
                <p className="text-gray-400 leading-relaxed">
                  Work alongside talented individuals who are passionate about empowering creators and building
                  community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <img
                  src="/futuristic-creator-workspace-with-charts-and-analy.png"
                  alt="Innovation workspace"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-white">Innovation First</h3>
                <p className="text-gray-400 leading-relaxed">
                  Push boundaries and experiment with new ideas in a fast-paced, innovation-driven environment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-red-600 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <img
                  src="/creator-taking-a-break-from-computer-in-peaceful-s.png"
                  alt="Work-life balance"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-white">Work-Life Balance</h3>
                <p className="text-gray-400 leading-relaxed">
                  Maintain a healthy balance with flexible schedules, remote work options, and wellness programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join us in building the future of creator communities and digital collaboration.
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-10 py-4 h-auto">
            Explore Opportunities
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
