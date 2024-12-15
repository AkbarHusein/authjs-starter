import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default function Dashboardpage() {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-full">
      <h1 className="text-4xl capitalize font-bold">welcome to dashboard!</h1>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <Button className="bg-rose-600" type="submit">Sign out</Button>
      </form>
    </div>
  )
}
