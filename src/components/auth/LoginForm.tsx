import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { isAxiosError } from "axios";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
  ArrowRight,
} from "lucide-react";

import {
  AuthNotConfiguredError,
  isAuthConfigured,
  loginUser,
} from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const configured = isAuthConfigured();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!configured) {
      setError(
        "Account services are not available yet. Please contact Bytherix directly."
      );
      return;
    }

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      login(response.token, response.user);

      navigate("/", {
        replace: true,
      });
    } catch (err: unknown) {
      if (err instanceof AuthNotConfiguredError) {
        setError(err.message);
        return;
      }

      const message = isAxiosError(err)
        ? err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to sign in. Please check your credentials and try again."
        : "Unable to sign in. Please check your credentials and try again.";

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : String(message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {!configured && (
        <div
          role="status"
          className="rounded-[9px] border border-amber-400/25 bg-amber-400/[0.07] px-3.5 py-2.5 text-[11px] leading-5 text-amber-200"
        >
          Online accounts are not available yet. You can still reach us at{" "}
          <a
            href="mailto:bytherix1@gmail.com"
            className="underline"
          >
            bytherix1@gmail.com
          </a>
          .
        </div>
      )}
      {/* =====================================================
          EMAIL
      ====================================================== */}

      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-[13px] font-medium text-[#eef3ff]"
        >
          Email Address
        </label>

        <div className="group relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8290a8] transition-colors group-focus-within:text-[#1687ff]" />

          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            className="h-11 w-full rounded-[10px] border border-[#263b61] bg-[#08142d]/80 pl-11 pr-4 text-[13px] text-white outline-none transition-all placeholder:text-[#7886a0] focus:border-[#1687ff]/60 focus:bg-[#0a1935] focus:ring-4 focus:ring-[#1687ff]/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      {/* =====================================================
          PASSWORD
      ====================================================== */}

      <div>
        <label
          htmlFor="login-password"
          className="mb-2 block text-[13px] font-medium text-[#eef3ff]"
        >
          Password
        </label>

        <div className="group relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8290a8] transition-colors group-focus-within:text-[#1687ff]" />

          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={isLoading}
            className="h-11 w-full rounded-[10px] border border-[#263b61] bg-[#08142d]/80 pl-11 pr-12 text-[13px] text-white outline-none transition-all placeholder:text-[#7886a0] focus:border-[#1687ff]/60 focus:bg-[#0a1935] focus:ring-4 focus:ring-[#1687ff]/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((value) => !value)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8290a8] transition-colors hover:text-white"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-[9px] border border-red-400/20 bg-red-500/[0.07] px-3.5 py-2.5 text-[11px] leading-5 text-red-300">
          {error}
        </div>
      )}

      {/* =====================================================
          LOGIN BUTTON
      ====================================================== */}

      <motion.button
        type="submit"
        disabled={isLoading || !configured}
        whileHover={
          isLoading
            ? undefined
            : {
                y: -1,
                scale: 1.005,
              }
        }
        whileTap={
          isLoading
            ? undefined
            : {
                scale: 0.985,
              }
        }
        transition={{
          duration: 0.18,
          ease: "easeOut",
        }}
        className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[9px] bg-gradient-to-r from-[#086cff] via-[#078fe7] to-[#00c77b] text-[14px] font-semibold text-white shadow-[0_8px_25px_rgba(0,130,255,0.22)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_10px_30px_rgba(0,160,255,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Log In
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default LoginForm;