"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink, Terminal, Server, Database, Download } from "lucide-react"

const llmPlatforms = [
  {
    id: "lmstudio",
    name: "LM Studio",
    description: "A platform for running language models (LLM) locally on your own computer.",
    website: "https://lmstudio.ai/",
    icon: <Server className="h-6 w-6" />,
    features: [
      "User-friendly graphical interface",
      "Local execution without internet",
      "Full control over data security",
      "Easy model management",
    ],
    models: [
      {
        name: "Phi-4 (Microsoft)",
        description:
          "A compact and efficient model optimized for high performance on limited machine resources. It's well-suited for text generation, code assistance, and automated conversations.",
      },
      {
        name: "Llama 3 (Meta)",
        description:
          "A more powerful and comprehensive model, optimized for advanced text understanding, translation, chatbot development, and analysis of complex datasets.",
      },
    ],
    pros: [
      "Intuitive and user-friendly interface",
      "Easy to get started with",
      "Works for both beginners and experienced users",
    ],
    cons: [],
  },
  {
    id: "anythingllm",
    name: "AnythingLLM",
    description:
      "A platform that lets you connect large language models (LLM) to your own documents, data, and workflows.",
    website: "https://anythingllm.com/",
    icon: <Database className="h-6 w-6" />,
    features: [
      "Integrate your own data from documents and databases",
      "Use local language models like Llama, Mistral, or Phi-4",
      "Use cloud-based language models like OpenAI",
      "Combine multiple methods with hybrid solutions",
      "Build customized AI tools for business use",
    ],
    pros: [
      "Flexibility and customization options",
      "Full control over downloading and administration",
      "Ideal for tailored AI solutions",
    ],
    cons: ["More advanced and less intuitive interface", "Can be challenging for beginners"],
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "A flexible and minimalist platform for running language models locally using terminal commands.",
    website: "https://ollama.com/",
    icon: <Terminal className="h-6 w-6" />,
    features: [
      "Simple installation and use via terminal",
      "Support for a wide range of language models",
      "Optimized for fast local execution",
      "Integration with Python scripts",
      "Possibility for customization and development of your own models",
    ],
    pros: [
      "Lightweight solution without the need for a GUI",
      "Efficient execution of LLMs on your machine",
      "Ideal for developers and technical users",
    ],
    cons: ["No graphical user interface – CLI only (text-based interface)", "Can be more difficult for beginners"],
  },
]

export default function LocalLLMSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl font-light mb-4">
          Local <span className="font-semibold">LLM Platforms</span>
        </h2>
        <p className="text-slate-600">
          Explore these platforms for running language models locally on your own machine, with full control over data
          security and performance.
        </p>
      </motion.div>

      <Tabs defaultValue="lmstudio" className="w-full">
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-3 p-1 rounded-full bg-slate-100">
            {llmPlatforms.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id} className="rounded-full py-2 flex items-center gap-2">
                {platform.icon}
                <span className="hidden sm:inline">{platform.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        {llmPlatforms.map((platform, index) => (
          <TabsContent key={platform.id} value={platform.id} className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">{platform.icon}</div>
                    <div>
                      <CardTitle className="text-2xl font-light">
                        {platform.name} <span className="font-semibold">LLM Platform</span>
                      </CardTitle>
                      <CardDescription>{platform.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Features</h3>
                      <ul className="space-y-2">
                        {platform.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: 0.1 * idx + 0.4 }}
                            className="flex items-start gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary/60 mt-2" />
                            <span className="text-slate-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {platform.id === "lmstudio" && platform.models && (
                        <div className="mt-8">
                          <h3 className="text-lg font-medium mb-4">Examples of Language Models</h3>
                          <div className="space-y-4">
                            {platform.models.map((model, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.1 * idx + 0.6 }}
                                className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100"
                              >
                                <h4 className="font-medium mb-2">{model.name}</h4>
                                <p className="text-sm text-slate-600">{model.description}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="bg-slate-50 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-medium mb-4">Pros and Cons</h3>

                        {platform.pros.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Advantages</h4>
                            <ul className="space-y-2">
                              {platform.pros.map((pro, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                                  transition={{ duration: 0.3, delay: 0.1 * idx + 0.4 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                                  <span className="text-slate-700">{pro}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {platform.cons.length > 0 && (
                          <div>
                            <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Disadvantages</h4>
                            <ul className="space-y-2">
                              {platform.cons.map((con, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                                  transition={{ duration: 0.3, delay: 0.1 * idx + 0.6 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                                  <span className="text-slate-700">{con}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        className="flex justify-center"
                      >
                        <Button
                          className="rounded-full gap-2"
                          size="lg"
                          onClick={() => window.open(platform.website, "_blank")}
                        >
                          <Download className="h-4 w-4" />
                          Download {platform.name}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

