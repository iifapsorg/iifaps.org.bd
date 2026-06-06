// lib/auth

import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { validateSignin } from "@/validations/auth.validation";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
       
        const error = validateSignin(credentials);
        if (error) throw new Error(error);

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error("No user found with this email");
        if (!user.isActive) throw new Error("Your account has been deactivated");

        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/admin" },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
