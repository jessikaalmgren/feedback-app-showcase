import '@styles/globals.css'
import strings from '@utils/strings'
import FeatureProviders from '@components/Providers/FeatureProvider'
import BoardProviders from '@components/Providers/BoardProvider'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'Feedback Board',
  description: 'Dummy web-app with feedback boards.',
}

export default function RootLayout({ children }) {
  return (
    <BoardProviders>
      <FeatureProviders>
        <html lang="en">
          <body>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              {children}
              <Analytics />
            </main>
            <a href="https://github.com/jessikaalmgren" target="_blank">
              <div className="fixed bottom-0 right-0 text-xs text-gray-800 bg-neutral-100 p-4 border-l-2 border-t-2 border-gray-900 border-dashed rounded-tl-lg hover:bg-neutral-200">
                {strings.footer.madeBy}
              </div>
            </a>
          </body>
        </html>
      </FeatureProviders>
    </BoardProviders>
  )
}
