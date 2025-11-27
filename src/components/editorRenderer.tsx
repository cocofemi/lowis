import React from "react";
import editorJsHtml from "editorjs-html";

const editorJsParser = editorJsHtml();

import edjsHTML from "editorjs-html";
import EmptyState from "./empty-state";

const EditorBlocks = edjsHTML({
  paragraph: (block: any) =>
    `<p class="mb-4 leading-relaxed">${block.data.text}</p>`,

  header: (block: any) =>
    `<h${block.data.level} class="font-semibold my-4">${block.data.text}</h${block.data.level}>`,

  list: (block: any) => {
    const tag = block.data.style === "ordered" ? "ol" : "ul";

    const items = block.data.items
      .map((item: any) => {
        const text =
          typeof item === "string" ? item : item.content || item.text || "";

        return `<li class="ml-6 my-1">${text}</li>`;
      })
      .join("");

    return `<${tag} class="mb-4">${items}</${tag}>`;
  },

  quote: (block: any) =>
    `<blockquote class="border-l-4 pl-4 italic text-muted-foreground my-4">${block.data.text}</blockquote>`,

  delimiter: () => `<hr class="my-8 opacity-40" />`,

  code: (block: any) =>
    `<pre class="bg-muted p-4 rounded-lg my-4"><code>${block.data.code}</code></pre>`,

  image: (block: any) =>
    `<img src="${block.data.file.url}" alt="${block.data.caption || ""}" class="my-4 mx-auto rounded-lg h-[200px] w-[300px]" />`,

  video: (block: any) => `
  <div class="my-6">
    <video 
      src="${block.data.file?.url}" 
      class="my-4 mx-auto rounded-lg"
      controls
    ></video>
    ${
      block.data.caption
        ? `<p class="text-center text-sm text-muted-foreground">${block.data.caption}</p>`
        : ""
    }
  </div>
`,
});

export default function EditorJsRenderer({ data }) {
  if (!data) return <EmptyState />;
  let editorData = null;
  try {
    if (typeof data === "string") {
      if (data.trim() === "" || data.trim() === "{}") {
        return <EmptyState />;
      }
      editorData = JSON.parse(data);
    } else {
      editorData = data;
    }
  } catch (err) {
    console.error("Invalid EditorJS JSON:", err);
    return <EmptyState />;
  }

  if (
    !editorData ||
    typeof editorData !== "object" ||
    !Array.isArray(editorData.blocks) ||
    editorData.blocks.length === 0
  ) {
    return <EmptyState />;
  }

  let html = "";
  try {
    html = EditorBlocks.parse(editorData) ?? "";
  } catch (err) {
    console.error("EditorJS parsing error:", err);
    return <EmptyState />;
  }
  if (!html || html.trim() === "") return null;

  return (
    <div
      className="prose prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
