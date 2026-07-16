'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { AuthShell } from '@/components/auth/auth-shell'
import { FormInput } from '@/components/form/FormInput'
import { FormWrapper } from '@/components/form/FormWrapper'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SignInSchema, type SignInDto } from '@/lib/validations/auth'

const DEFAULT_VALUES: SignInDto = { email: '', password: '' }

export default function SignInPage() {
  const router = useRouter()

  async function handleSignIn(data: SignInDto) {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const body = (await res.json()) as { message?: string }
      toast.error(body?.message ?? 'Sign-in failed. Please try again.')
      return
    }

    toast.success('Signed in successfully!')
    router.push('/')
  }

  return (
    <AuthShell
      title="Sign in"
      description="Enter your email and password to continue."
      footer={
        <div className="space-y-2 text-sm">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
          <p>
            Forgot your password?{' '}
            <Link href="/auth/reset-password" className="font-medium text-primary underline-offset-4 hover:underline">
              Reset it
            </Link>
          </p>
        </div>
      }
    >
      <FormWrapper
        schema={SignInSchema}
        defaultValues={DEFAULT_VALUES}
        onSubmit={handleSignIn}
        className="space-y-4"
      >
        {({ formState: { isSubmitting, isValid } }) => (
          <>
            <FormInput<SignInDto>
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              description="The email you registered with."
            />

            <FormInput<SignInDto>
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <Button type="submit" className="w-full" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
          </>
        )}
      </FormWrapper>
    </AuthShell>
  )
}
