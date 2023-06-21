"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

import { FC, useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
 
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    github: false
  });
  const handleLogin = async (provider:string) => {
    try {
      setLoadingStates((prevState) => ({
        ...prevState,
        [provider]: true
      }));
      await signIn(provider);
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error logging in with ${provider}`,
        variant: "destructive",
      });
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [provider]: false
      }));
    }
  };
  

  return (
    <div
      className={cn(
        "flex justify-center flex-col gap-3 md:flex-row ",
        className
      )}
      {...props}
    >
      <Button
        isLoading={loadingStates.google}
        type="button"
        size="sm"
        disabled={loadingStates.google}
        onClick={()=>handleLogin('google')}
        className="w-full"
      >
        {loadingStates.google ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
      <Button
       isLoading={loadingStates.github}
        type="button"
        size="sm"
        className="w-full"
        disabled={loadingStates.github}
        onClick={()=>handleLogin('github')}
      >
        {loadingStates.github ? null : (
          <Icons.github className="h-4 w-4 mr-2 bg-white rounded-xl border-transparent" />
        )}
        Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
