"use client";
import {
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoorClosedIcon, X } from "lucide-react";
import Image from "next/image";
import { type } from "os";

import React, { useMemo, useState } from "react";
import ColorPicker from "./page-component/Colorpicker";
import Profile from "./page-component/profile";
interface UserProfile {
  bannerColor: string;
  bannerBorder: string;
  background: string;
  textColor: string;
  userTitleColor: string;
  bannerImage?: any | undefined;
}
interface UserPost {
  bannerColor: string;
  bannerBorder: string;
  background: string;
  textColor: string;
  userTitleColor: string;
  likeIcon?: any | undefined;
  shareIcon?: any | undefined;
  commentIcon?: any | undefined;
}

interface InitialState {
  profile: UserProfile;
  post: UserPost;
}
const initial: InitialState = {
  profile: {
    bannerColor: "#0000",
    bannerBorder: "#000",
    background: "rgba(1,1,1,1)",
    textColor: "#fff",
    userTitleColor: "#fff",
    bannerImage: undefined,
  },
  post: {
    bannerColor: "#0000",
    bannerBorder: "#000",
    background: "rgba(1,1,1,1)",
    textColor: "#fff",
    userTitleColor: "#fff",
    likeIcon: undefined,
    shareIcon: undefined,
    commentIcon: undefined,
  },
};
let ProfileSchema = {
  colorSchema: [
    {
      key: "bannerColor",
      type: "ColorPicker",
      label: "Banner Color",
    },
    {
      key: "bannerBorder",
      type: "ColorPicker",
      label: "Banner Border Color",
    },
    {
      key: "background",
      type: "ColorPicker",
      label: "Background Color",
    },
    {
      key: "textColor",
      type: "ColorPicker",
      label: "Text Color",
    },
    {
      key: "userTitleColor",
      type: "ColorPicker",
      label: "User Title Color",
    },
    {
      key: "bannerImage",
      type: "Image",
      label: "Banner Image",
    },
  ],
  customSchema: [
    {
      key: "bannerImage",
      type: "Image",
      label: "Banner Image",
    },
  ],
};
let PostSchema = {
  colorSchema: [
    {
      key: "background",
      type: "ColorPicker",
      label: "Background Color",
    },
    {
      key: "textColor",
      type: "ColorPicker",
      label: "Text Color",
    },
    {
      key: "userTitleColor",
      type: "ColorPicker",
      label: "User Title Color",
    },
  ],
  customSchema: [
    // {
    //   key: "bgImage",
    //   type: "Image",
    //   label: "background Image",
    // },
    {
      key: "likeIcon",
      type: "Image",
      label: "Like Icon",
    },
    {
      key: "shareIcon",
      type: "Image",
      label: "share Icon",
    },
    {
      key: "commentIcon",
      type: "Image",
      label: "Comment Icon",
    },
  ],
};
const Personalizer = () => {
  const [userPersonalization, setUserPersonailzation] = useState(initial);
  //   let IIImage;
  const memoizedUserPersonalization = useMemo(() => userPersonalization, [
    userPersonalization,
  ]);

  const generateLocalURl = (file) => {
    if (!file) return;
    return URL.createObjectURL(file);
  };
  const [template, setTemplate] = useState("profile");
  const handleImage = (e: any) => {
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    let result = "";
    if (file) {
      const imageURL = URL.createObjectURL(file);
      //   setBanner(file);
      result = file;
    }
    console.log(result);
    return result;
  };

  function compareFiles({ file1, file2 }) {
    // Compare file properties, e.g., name, size, type
    return (
      file1.name === file2.name &&
      file1.size === file2.size &&
      file1.type === file2.type
    );
  }
  const handleCustomization = ({
    value,
    template,
    property,
    isImage,
  }: {
    value: string;
    template: string;
    property: string;
    isImage?: boolean;
  }) => {
    console.log(value, template, property, isImage);
    setUserPersonailzation({
      ...userPersonalization,
      [template]: {
        // @ts-ignore
        ...userPersonalization[template],
        [property]: value,
      },
    });
  };

  return (
    <div className="hidden h-full flex-col md:flex ">
      <Tabs defaultValue="complete" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-2 md:grid-cols-[1fr_300px]">
            <div className="hidden rounded bg-gray-400  p-4 flex-col space-y-4 sm:flex md:order-2">
              <div className="">
                <div className="grid gap-2 w-fit">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Personalize
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the interface that best suits your task. You can
                      provide: a simple prompt to complete, starting and ending
                      text to insert a completion within, or some text with
                      instructions to edit it.
                    </HoverCardContent>
                  </HoverCard>
                  {/* controls */}
                  <Tabs defaultValue="profile" className="">
                    <TabsList className="grid w-fit grid-cols-2">
                      <TabsTrigger
                        onClick={() => setTemplate("profile")}
                        value="profile"
                      >
                        profile Setting
                      </TabsTrigger>
                      <TabsTrigger
                        onClick={() => setTemplate("post")}
                        value="post"
                      >
                        Post Setting
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                      <div className="flex flex-col">
                        {ProfileSchema.colorSchema.map((schema, index) => {
                          let prop: string = schema.key || "none";
                          return (
                            <div key={index} className="w-full">
                              {schema.type === "ColorPicker" ? (
                                <>
                                  <ColorPicker
                                    title={schema.label}
                                    key={index}
                                    defaultColor={
                                      // @ts-ignore
                                      userPersonalization.profile[schema.key]
                                    }
                                    setColor={(value: string) =>
                                      handleCustomization({
                                        value,
                                        template,
                                        property: prop,
                                      })
                                    }
                                  />
                                </>
                              ) : schema.type === "Image" ? (
                                <div className="flex  w-fit  text-left justify-between gap-2 items-center">
                                  <p className=" w-full ">{schema.label} </p>{" "}
                                  {userPersonalization[template][schema.key] !==
                                  undefined ? (
                                    <p className="h-fit p-3 flex justify-center items-center gap-2 bg-white rounded">
                                      {
                                        userPersonalization[template][
                                          schema.key
                                        ]?.name
                                      }

                                      <X
                                        onClick={() => {
                                          handleCustomization({
                                            // @ts-ignore
                                            value: undefined,
                                            template,
                                            property: prop,
                                          });
                                        }}
                                        height={14}
                                      />
                                    </p>
                                  ) : (
                                    <label
                                      for="file-6"
                                      className="flex w-full p-2 rounded justify-between items-center bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                      <p>Upload</p>
                                      <figure>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="17"
                                          viewBox="0 0 20 17"
                                        >
                                          <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                        </svg>
                                      </figure>{" "}
                                      <span></span>
                                    </label>
                                  )}
                                  <Input
                                    type="file"
                                    id="file-6"
                                    accept="image/*"
                                    placeholder=""
                                    className=" opacity-0  hidden "
                                    onChange={async (e) => {
                                      let value: string | undefined =
                                        (await handleImage(e)) || "";
                                      if (value) {
                                        handleCustomization({
                                          value,
                                          template,
                                          property: prop,
                                        });
                                      } else {
                                        console.log("try again");
                                      }
                                    }}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>
                    <TabsContent value="post">
                      <Accordion type="single">
                        <AccordionItem value={"colorSchema"}>
                          <AccordionTrigger>Color Schema</AccordionTrigger>
                          <AccordionContent className="flex-col  w-full justify-start  gap-2 items-center">
                            {PostSchema.colorSchema?.map((schema, index) => {
                              let prop: string = schema.key || "none";
                              return (
                                <div key={index}>
                                  {schema.type === "ColorPicker" ? (
                                    <>
                                      <ColorPicker
                                        title={schema.label}
                                        key={index}
                                        defaultColor={
                                          // @ts-ignore
                                          userPersonalization.profile[
                                            schema.key
                                          ]
                                        }
                                        setColor={(value: string) =>
                                          handleCustomization({
                                            value,
                                            template,
                                            property: prop,
                                          })
                                        }
                                      />
                                    </>
                                  ) : schema.type === "Image" ? (
                                    <div className="flex  my-1 w-fit  text-left justify-evenly gap-2 items-center">
                                      <p className=" w-full ">
                                        {schema.label} {schema.key}
                                      </p>{" "}
                                      {userPersonalization[template][
                                        schema.key
                                      ] !== undefined ? (
                                        <p className="h-fit p-3 flex justify-center items-center gap-2 bg-white rounded">
                                          {
                                            userPersonalization[template][
                                              schema.key
                                            ]?.name
                                          }

                                          <X
                                            onClick={() => {
                                              console.log(schema.key);
                                              // handleCustomization({
                                              //   // @ts-ignore
                                              //   value: undefined,
                                              //   template,
                                              //   property: PostSchema[section][index].key,
                                              // });
                                            }}
                                            height={14}
                                          />
                                        </p>
                                      ) : (
                                        <label
                                          htmlFor="file-6"
                                          className="flex w-full p-2 rounded justify-between items-center bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                          <p>{schema.key}</p>
                                          <figure>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="20"
                                              height="17"
                                              viewBox="0 0 20 17"
                                            >
                                              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                            </svg>
                                          </figure>{" "}
                                          <span></span>
                                        </label>
                                      )}
                                      <Input
                                        type="file"
                                        id="file-6"
                                        accept="image/*"
                                        placeholder=""
                                        className=" opacity-0  hidden "
                                        onChange={async (e) => {
                                          let value: string | undefined =
                                            (await handleImage(e)) || "";
                                          if (value) {
                                            handleCustomization({
                                              value,
                                              template,
                                              property: schema.key,
                                            });
                                          } else {
                                            console.log("try again");
                                          }
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value={"customSchema"}>
                          <AccordionTrigger>Custom Schema</AccordionTrigger>
                          <AccordionContent className="flex-col  w-full justify-start  gap-2 items-center">
                            {PostSchema.customSchema?.map((schema, index) => {
                              let prop: string = schema.key || "none";

                              return (
                                <div key={index}>
                                  {schema.type === "ColorPicker" ? (
                                    <ColorPicker
                                      title={schema.label}
                                      key={index}
                                      defaultColor={
                                        userPersonalization.profile[schema.key]
                                      }
                                      setColor={(value: string) =>
                                        handleCustomization({
                                          value,
                                          template,
                                          property: prop,
                                        })
                                      }
                                    />
                                  ) : schema.type === "Image" ? (
                                    <div className="flex my-1 w-fit text-left justify-evenly gap-2 items-center">
                                      <div className="flex  my-1 w-fit  text-left justify-evenly gap-2 items-center">
                                        <p className=" w-full ">
                                          {schema.label} {schema.key}
                                        </p>{" "}
                                        {userPersonalization[template][
                                          schema.key
                                        ] !== undefined ? (
                                          <p className="h-fit p-3 flex justify-center items-center gap-2 bg-white rounded">
                                            {
                                              userPersonalization[template][
                                                schema.key
                                              ]?.name
                                            }

                                            <X
                                              onClick={() => {
                                                console.log(schema.key);
                                                // handleCustomization({
                                                //   // @ts-ignore
                                                //   value: undefined,
                                                //   template,
                                                //   property: PostSchema[section][index].key,
                                                // });
                                              }}
                                              height={14}
                                            />
                                          </p>
                                        ) : (
                                          <label
                                            htmlFor="file-6"
                                            className="flex w-full p-2 rounded justify-between items-center bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                          >
                                            <p>{schema.key}</p>
                                            <figure>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="17"
                                                viewBox="0 0 20 17"
                                              >
                                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                              </svg>
                                            </figure>{" "}
                                            <span></span>
                                          </label>
                                        )}
                                        <Input
                                          type="file"
                                          id="file-6"
                                          accept="image/*"
                                          placeholder=""
                                          className=" opacity-0  hidden "
                                          onChange={async (e) => {
                                            let value: string | undefined =
                                              (await handleImage(e)) || "";
                                            if (value) {
                                              handleCustomization({
                                                value,
                                                template,
                                                property: "commentIcon",
                                              });
                                            } else {
                                              console.log("try again");
                                            }
                                            console.log(schema.key);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ) : // Handle other types if needed
                                  null}
                                </div>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            <div className="md:order-1 rounded">
              {/* preview */}
              <Profile
                backGroundColor={memoizedUserPersonalization.profile.background}
                textColor={memoizedUserPersonalization.profile.textColor}
                bannerImag={generateLocalURl(
                  memoizedUserPersonalization.profile.bannerImage
                )}
                userText={memoizedUserPersonalization.profile.userTitleColor}
                postBackGroundColor={
                  memoizedUserPersonalization.post.background
                }
                postLikeIcon={memoizedUserPersonalization.post.likeIcon}
                postShareIcon={memoizedUserPersonalization.post.shareIcon}
                postCommentIcon={generateLocalURl(
                  memoizedUserPersonalization.post.commentIcon
                )}
                textPColor={memoizedUserPersonalization.post.textColor}
                pUserText={memoizedUserPersonalization.post.userTitleColor}
              />
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Personalizer;
function property(value: string, template: string, property: any) {
  throw new Error("Function not implemented.");
}
