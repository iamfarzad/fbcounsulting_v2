import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-dark-light py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg mr-3 flex items-center justify-center text-white font-bold">
                FB
              </div>
              <span className="font-display font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                F.B Consulting
              </span>
            </div>
            <p className="text-slate-600 dark:text-gray-400 mb-6">
              AI automation solutions to help your business grow and thrive in the digital age.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6 text-slate-800">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  AI Consulting
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  AI Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6 text-slate-800">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6 text-slate-800">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/insights" className="text-slate-600 hover:text-primary transition-colors">
                  Business Insights
                </Link>
              </li>
              <li>
                <Link href="/literature" className="text-slate-600 hover:text-primary transition-colors">
                  AI Literature
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} F.B Consulting. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

