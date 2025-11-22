"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import LinkAutocomplete from "@editorjs/link-autocomplete";
import VideoTool from "editorjs-video";

type EditorProps = {
  initialData?: any; // EditorJS OutputData-ish
  onChange: (data: any) => void;
};

export default function Editor({ initialData, onChange }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = useRef(`editorjs-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      if (!isMounted) return;
      if (editorRef.current) return; // already initialized

      const editor = new EditorJS({
        holder: holderId.current,
        data: initialData ?? { time: Date.now(), blocks: [] },
        autofocus: true,
        tools: {
          quote: Quote,
          paragraph: { class: Paragraph, inlineToolbar: true },
          header: { class: Header, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          checklist: { class: Checklist, inlineToolbar: true },
          underline: Underline,
          marker: Marker,
          inlineCode: InlineCode,
          hyperlink: LinkAutocomplete,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const signRes = await fetch("/api/course-images");
                  const sign = await signRes.json();

                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("api_key", sign.apiKey);
                  formData.append("timestamp", sign.timestamp);
                  formData.append("signature", sign.signature);
                  formData.append("folder", "kervah_course_images");

                  const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
                    { method: "POST", body: formData }
                  );
                  const fileData = await res.json();

                  return {
                    success: 1,
                    file: {
                      url: fileData.secure_url,
                      width: fileData.width,
                      height: fileData.height,
                    },
                  };
                },
              },
            },
          },
          video: {
            class: VideoTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const signRes = await fetch("/api/course-videos");
                  const sign = await signRes.json();

                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("api_key", sign.apiKey);
                  formData.append("timestamp", sign.timestamp);
                  formData.append("signature", sign.signature);
                  formData.append("folder", "kervah_course_videos");

                  const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${sign.cloudName}/video/upload`,
                    { method: "POST", body: formData }
                  );
                  const fileData = await res.json();

                  return {
                    success: 1,
                    file: {
                      url: fileData.secure_url,
                      width: fileData.width,
                      height: fileData.height,
                    },
                  };
                },
              },
            },
          },
          embed: Embed,
          table: Table,
        },
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });

      editorRef.current = editor;
    };

    initEditor();

    return () => {
      isMounted = false;
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
      }
      editorRef.current = null;
    };
  }, []);
  return (
    <div
      id={holderId.current}
      className="border border-border rounded-md p-4 min-h-[300px]"
    />
  );
}
