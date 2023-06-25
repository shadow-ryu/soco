"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";
const Page = () => {
  // const [inputName, setInputName] = useState("");
  const { loginToast } = useCustomToasts()
  const router =useRouter()
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async (payload:CreateSubredditPayload) => {
      // const payload: CreateSubredditPayload = {
      //   name: inputData,
      // }

      const { data } = await axios.post('/api/subreddit', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists.',
            description: 'Please choose a different name.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name.',
            description: 'Please choose a name between 3 and 21 letters.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create subreddit.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      reset()
      router.push(`/sr/${data}`)
    },
  })
  const onSubmit=(data:any)=>{
    createCommunity(data)
  }
  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="bg-gray-500 h-px" />
        <form className="flex flex-col gap-6"  onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="text-lg font-medium">Name</p>
            <p className="text-xs pb-2">
              Community names including capitalization cannot be changed.
            </p>
            <div className="relative">
              <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
                sr/
              </p>
              <Input
                type="text"
                {...register("name", { required: true })}
                className="pl-6"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              disabled={isLoading}
              type="button"
              variant="subtle"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              disabled={!watch("name") || watch("name").length <= 2}
              // onClick={() => createCommunity()}
            >
              Create Community
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
