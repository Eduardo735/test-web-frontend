"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export function SocialFeed() {
  const editor = useCreateBlockNote();
  return (
    <div className="max-h-[300px] overflow-y-auto rounded-md border border-gray-200">
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
}
