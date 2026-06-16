"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faArrowRight, faLock } from "@fortawesome/free-solid-svg-icons";
import { signIn, type LoginFormState } from "@/app/admin/actions";

const initialState: LoginFormState = { status: "idle" };

export default function LoginForm({ unauthorized }: { unauthorized?: boolean }) {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-black/60">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@forgestudio.com"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-black/60">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
        {!isPending && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
      </motion.button>

      {state.status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600"
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5 text-base" />
          <span>{state.message}</span>
        </motion.div>
      )}

      {state.status === "idle" && unauthorized && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-black/10 bg-black/[0.03] p-4 text-sm text-black/70"
        >
          <FontAwesomeIcon icon={faLock} className="mt-0.5 text-base" />
          <span>That account does not have admin access. Please sign in with an admin account.</span>
        </motion.div>
      )}
    </form>
  );
}
