import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function HomePage() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-950 text-white">
            <div className="w-full max-w-md space-y-6">
                <div>
                    <h1 className="text-4xl font-bold">
                        TaskFlow AI
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Reusable Input Component
                    </p>
                </div>

                <Input
                    type="email"
                    placeholder="Enter your email"
                />

                <Input
                    type="password"
                    placeholder="Enter your password"
                />

                <Button>
                    Login
                </Button>
            </div>
        </main>
    )
}

export default HomePage