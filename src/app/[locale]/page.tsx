'use client'
import { Trans } from '@lingui/react/macro'
import { LangSwitcher } from '~/components/lang-switcher'
import { ThemeSwitcher } from '~/components/theme-switcher'
import { signIn, signOut, useSession } from '~/lib/auth-client'
import Counter from '../components/counter'
import { HeroHeader } from './components/header'

export default function Page() {
  const { data } = useQuery(orpc.hi.queryOptions())
  const { data: session } = useSession()

  return (
    <div className='flex min-h-screen flex-col'>
      <HeroHeader />
      <main className='flex flex-1 flex-col items-center justify-center gap-y-4'>
        <motion.div
          className='size-16 rounded-md border bg-blue-600'
          whileHover={{ scale: 1.1, rotate: '360deg' }}
        />
        <Counter />

        <p>{data}</p>

        <p>{session?.user.name}</p>

        {!session ? (
          <button
            type='button'
            onClick={() =>
              signIn.social({
                provider: 'github',
                callbackURL: '/dashboard',
              })
            }
          >
            <Trans>Sign in</Trans>
          </button>
        ) : (
          <button type='button' onClick={() => signOut()}>
            <Trans>Sign out</Trans>
          </button>
        )}
        <ThemeSwitcher />
        <LangSwitcher />
      </main>
    </div>
  )
}
