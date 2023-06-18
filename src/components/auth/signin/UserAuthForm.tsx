"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

import { FC, useState } from "react";

// import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "flex justify-center flex-col gap-3 md:flex-row ",
        className
      )}
      {...props}
    >
      <Button isLoading={isLoading} type="button" size="sm" className="w-full">
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
      <Button isLoading={isLoading} type="button" size="sm" className="w-full">
        {isLoading ? null : (
          <Icons.github className="h-4 w-4 mr-2 bg-white rounded-xl border-transparent" />
        )}
        Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
