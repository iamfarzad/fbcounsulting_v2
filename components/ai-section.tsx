"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot,
  BrainCircuit,
  BarChartIcon as ChartBar,
  CreditCard,
  Database,
  Image,
  LineChart,
  MessageSquare,
  Server,
  ShoppingCart,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const aiTypes = [
  {
    id: "generative",
    title: "Generative AI",
    description: "Creates new content to enhance business operations",
    icon: <BrainCircuit className="h-6 w-6" />,
    examples: [
      {
        name: "Content Generation",
        description: "Creates marketing copy, reports, and business documents",
        example: "GPT for Business",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Visual Assets",
        description: "Creates product images and marketing visuals",
        example: "DALL-E for Marketing",
        icon: <Image className="h-5 w-5" />,
      },
      {
        name: "Data Visualization",
        description: "Transforms complex data into actionable insights",
        example: "AI-Powered Analytics",
        icon: <ChartBar className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Business Intelligence",
    description: "Systems that learn from data to drive business decisions",
    icon: <Server className="h-6 w-6" />,
    applications: [
      "Predictive sales forecasting",
      "Customer behavior analysis",
      "Supply chain optimization",
      "Fraud detection and prevention",
    ],
  },
  {
    id: "business-applications",
    title: "Enterprise AI Solutions",
    description: "AI tools that transform business processes",
    icon: <Bot className="h-6 w-6" />,
    examples: [
      {
        name: "Customer Experience",
        description: "AI-powered chatbots and personalization engines",
        example: "24/7 Customer Support",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Financial Operations",
        description: "Automated accounting and financial forecasting",
        example: "AI-Powered ERP",
        icon: <CreditCard className="h-5 w-5" />,
      },
      {
        name: "Sales & Marketing",
        description: "Lead scoring and campaign optimization",
        example: "Predictive CRM",
        icon: <ShoppingCart className="h-5 w-5" />,
      },
    ],
  },
]

const aiImplementationSteps = [
  "Identify business processes that could benefit from AI",
  "Assess data availability and quality for AI training",
  "Select appropriate AI solutions or development approach",
  "Implement pilot projects to validate business value",
  "Scale successful implementations across the organization",
  "Continuously monitor and improve AI performance",
]

export default function AISection() {
  const [selectedTab, setSelectedTab] = useState("generative")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div className="space-y-8" ref={ref}>
      <Tabs defaultValue="generative" className="w-full" onValueChange={setSelectedTab}>
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <TabsList className="grid w-full max-w-md grid-cols-3 p-1 rounded-full bg-slate-100">
            <TabsTrigger value="generative" className="rounded-full py-2">
              Generative AI
            </TabsTrigger>
            <TabsTrigger value="machine-learning" className="rounded-full py-2">
              Business Intelligence
            </TabsTrigger>
            <TabsTrigger value="business-applications" className="rounded-full py-2">
              Enterprise Solutions
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="generative" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-primary/10 text-primary">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-light">
                      Generative AI for <span className="font-semibold">Business</span>
                    </CardTitle>
                    <CardDescription>
                      Creates new content to enhance business operations and customer experiences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="grid gap-6 md:grid-cols-3">
                  {aiTypes[0].examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                        <div className="h-1 w-full bg-gradient-to-r from-primary/20 to-primary/40" />
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full p-1.5 bg-primary/10 text-primary">{example.icon}</div>
                            <CardTitle className="text-lg font-medium">{example.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-500 mb-3">{example.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                            <p className="text-sm font-medium">Solution: {example.example}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="machine-learning" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-primary/10 text-primary">
                    <LineChart className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-light">
                      Business <span className="font-semibold">Intelligence</span> & Analytics
                    </CardTitle>
                    <CardDescription>Data-driven insights that power strategic business decisions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-sm h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-medium">Business Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {aiTypes[1].applications.map((application, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                              className="flex items-start gap-3"
                            >
                              <div className="rounded-full p-1 bg-primary/10 text-primary mt-0.5">
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              <span>{application}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-sm h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-medium">Business Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100"
                          >
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                              <Database className="h-4 w-4 text-primary" />
                              Data-Driven Decision Making
                            </h3>
                            <p className="text-sm text-slate-500">
                              Replace gut feelings with data-backed insights to improve decision accuracy and business
                              outcomes.
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100"
                          >
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                              <ChartBar className="h-4 w-4 text-primary" />
                              Competitive Advantage
                            </h3>
                            <p className="text-sm text-slate-500">
                              Identify market trends and customer needs faster than competitors to gain market share.
                            </p>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="business-applications" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-primary/10 text-primary">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-light">
                      Enterprise <span className="font-semibold">AI</span> Solutions
                    </CardTitle>
                    <CardDescription>Transforming business processes across departments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-sm h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-medium">Business Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {aiTypes[2].examples.map((example, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                              transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                              className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100"
                            >
                              <h3 className="font-medium mb-1 flex items-center gap-2">
                                <div className="rounded-full p-1 bg-primary/10 text-primary">{example.icon}</div>
                                {example.name}
                              </h3>
                              <p className="text-sm text-slate-500 mb-1">{example.description}</p>
                              <p className="text-sm font-medium">Example: {example.example}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-sm h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-medium">Implementation Strategy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5 mb-6">
                          {aiImplementationSteps.map((step, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                              transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                              className="text-slate-600"
                            >
                              {step}
                            </motion.li>
                          ))}
                        </ol>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full rounded-full">AI Integration Guide</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md border-0 shadow-lg">
                            <DialogHeader>
                              <DialogTitle>Enterprise AI Integration</DialogTitle>
                              <DialogDescription>
                                Connecting AI systems with your existing business infrastructure
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-6">
                              <div className="flex flex-col items-center gap-6">
                                <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100 w-full text-center">
                                  <p className="font-medium">API Integration</p>
                                  <p className="text-sm text-slate-500">
                                    Connects AI solutions with your business systems
                                  </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                  <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100 text-center">
                                    <p className="font-medium">ERP Systems</p>
                                  </div>
                                  <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100 text-center">
                                    <p className="font-medium">CRM Platforms</p>
                                  </div>
                                </div>

                                <p className="text-sm text-slate-500">
                                  APIs allow AI solutions to seamlessly connect with your existing business systems,
                                  enabling data exchange and process automation without disrupting your core
                                  infrastructure.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

