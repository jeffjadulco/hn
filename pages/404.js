import Link from "next/link";
import { SEO } from '../src/components/seo'

export default function Custom404() {
  return (
    <>
      <SEO title="404: Page not found" description="" />
      <div className="min-h-screen container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-gray-700">404</h1>
        <Link href="/">
          <a className="inline-flex items-center hover:bg-gray-800 rounded-sm py-1 pr-2 text-xs sm:text-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              Go back
            </a>
        </Link>
      </div>
    </>
  )
}
