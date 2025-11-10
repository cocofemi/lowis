import React from "react";

import ChatBot from "@/components/chat-bot";

export const generateMetadata = async ({ params }) => {
  return {
    title: `New chat`,
    description: "Chat with AI assistant",
  };
};

export default async function Page() {
  return <ChatBot />;
}
