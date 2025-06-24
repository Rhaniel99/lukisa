import React from "react";
import { Link, Head } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


const Home: React.FC = () => {
    return (
        <>
            {/* O componente Head do Inertia gerencia a tag <title> da página */}
            <Head title="Bem-vindo" />

            {/* Container principal para centralizar o conteúdo na tela */}



    {/* <Card className="w-full max-w-md mx-auto bg-lukisa-cream border-lukisa-light shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="Lukisa" width={60} height={60} />
        </div>
        <CardTitle className="text-2xl font-bold text-lukisa-dark">Welcome to Lukisa</CardTitle>
        <CardDescription className="text-lukisa-medium">Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lukisa-dark">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-lukisa-medium" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-white border-lukisa-light focus:border-lukisa-dark"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lukisa-dark">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-lukisa-medium" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 bg-white border-lukisa-light focus:border-lukisa-dark"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-lukisa-medium hover:text-lukisa-dark"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-lukisa-medium">
                Remember me
              </Label>
            </div>
            <button
              type="button"
              onClick={() => handleViewChange("forgot-step1")}
              className="text-sm text-lukisa-dark hover:text-lukisa-accent underline transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-lukisa-dark hover:bg-lukisa-accent text-lukisa-cream transition-all duration-200"
          >
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-lukisa-light" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-lukisa-cream px-2 text-lukisa-medium">Or continue with</span>
          </div>
        </div>

        <SocialButtons />

        <div className="text-center">
          <span className="text-lukisa-medium">Don't have an account? </span>
          <button
            onClick={() => handleViewChange("register")}
            className="text-lukisa-dark hover:text-lukisa-accent underline font-medium transition-colors"
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card> */}



            {/* <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Bem-vindo à Aplicação Lukisa
                    </h1>

                    <Link
                        href={route("form.login")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Login
                    </Link>

                    <br />

                    <Link
                        href={route("form.signup")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Signup
                    </Link>

                    <br />

                    <Link
                        href={route("form.forgot")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Forgot
                    </Link>
                </div>
            </div> */}
        </>
    );
};

export default Home;
