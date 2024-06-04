'use server'
import { signIn } from "@/auth"

export const SignIn = async (provider: string) => {
    return await signIn(provider, {
        callbackUrl: '/'
      });
}