"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Briefcase, BarChart3, Users } from "lucide-react"

const employeeRoleChanges = [
  {
    from: "Following established processes",
    to: "Contributing to process innovation",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    from: "Passive information consumption",
    to: "Active collaboration and knowledge sharing",
    icon: <Users className="h-5 w-5" />,
  },
  {
    from: "Waiting for direction",
    to: "Self-management and initiative",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    from: "Manager's responsibility",
    to: "Shared accountability and ownership",
    icon: <BarChart3 className="h-5 w-5" />,
  },
]

const leaderRoleChanges = [
  {
    from: "Command and control management",
    to: "Facilitation and empowerment",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    from: "Technical expertise focus",
    to: "Strategic guidance and team development",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    from: "Top-down communication",
    to: "Open dialogue and collaborative decision-making",
    icon: <Users className="h-5 w-5" />,
  },
  {
    from: "Operational oversight",
    to: "Strategic vision and continuous improvement",
    icon: <BarChart3 className="h-5 w-5" />,
  },
]

export default function RolesSection() {
  const [selectedTab, setSelectedTab] = useState("employee")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref}>
      <Tabs defaultValue="employee" className="w-full" onValueChange={setSelectedTab}>
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 p-1 rounded-full bg-slate-100">
            <TabsTrigger value="employee" className="rounded-full py-2">
              Team Member Role
            </TabsTrigger>
            <TabsTrigger value="leader" className="rounded-full py-2">
              Leadership Role
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="employee" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-light">
                  Evolution of <span className="font-semibold">Team Member</span> Roles
                </CardTitle>
                <CardDescription>How employee roles are transforming in modern business environments</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {employeeRoleChanges.map((change, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex flex-col p-6 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="rounded-full p-2 bg-primary/10 text-primary">{change.icon}</div>
                        <h3 className="font-medium">Transition {index + 1}</h3>
                      </div>

                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg w-full">
                          <p>{change.from}</p>
                        </div>

                        <div className="relative w-8 h-8">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-0.5 h-full bg-slate-200"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ArrowRight className="text-primary bg-white rounded-full p-1" />
                          </div>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg w-full font-medium">
                          <p>{change.to}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="leader" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-light">
                  Evolution of <span className="font-semibold">Leadership</span> Roles
                </CardTitle>
                <CardDescription>How management approaches are changing in the digital business era</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {leaderRoleChanges.map((change, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex flex-col p-6 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="rounded-full p-2 bg-primary/10 text-primary">{change.icon}</div>
                        <h3 className="font-medium">Transition {index + 1}</h3>
                      </div>

                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg w-full">
                          <p>{change.from}</p>
                        </div>

                        <div className="relative w-8 h-8">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-0.5 h-full bg-slate-200"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ArrowRight className="text-primary bg-white rounded-full p-1" />
                          </div>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg w-full font-medium">
                          <p>{change.to}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

