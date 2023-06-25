"use client";

import { useCustomToasts } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { Button } from "../ui/Button";

interface SubscribeProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}
const SubscribeLeaveToggle = (props: SubscribeProps) => {
  const { isSubscribed, subredditId, subredditName } = props;
  const { loginToast } = useCustomToasts();
  const router = useRouter();
  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            title: "No Subscription.",
            description: "You are not join thisSubreddit",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not create subreddit.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Subscribed!",
        variant:"success",
        description: `You are now subscribed to r/${subredditName}`,
      });
    },
  });
  const { mutate: unsubscribe, isLoading: isUnSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      };

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Error",
        description: err.response?.data as string,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Unsubscribed!",
        description: `You are now unsubscribed from/${subredditName}`,
      });
    },
  });

  return (
    <div className="my-3">
      {isSubscribed ? (
        <Button
          variant="outline"
          className="w-full "
          isLoading={isUnSubLoading}
          disabled={isUnSubLoading}
          onClick={() => unsubscribe()}
        >
          Leave the community
        </Button>
      ) : (
        <Button
          variant="default"
          className="w-full "
          isLoading={isSubLoading}
          disabled={isSubLoading}
          onClick={() => subscribe()}
        >
          Join the community
        </Button>
      )}
    </div>
  );
};

export default SubscribeLeaveToggle;
