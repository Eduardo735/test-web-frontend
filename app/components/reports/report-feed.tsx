"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { ChangeEvent, useCallback, useEffect } from "react";

export function ReportFeed({ markdown }: { markdown: string }) {
  // const editor = useCreateBlockNote({});
  const editor = useCreateBlockNote();

  const markdownInputChanged = useCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      // Whenever the current Markdown content changes, converts it to an array of
      // Block objects and replaces the editor's content with them.
      const blocks = await editor.tryParseMarkdownToBlocks(e.target.value);
      editor.replaceBlocks(editor.document, blocks);
    },
    [editor]
  );

  // For initialization; on mount, convert the initial Markdown to blocks and replace the default editor's content
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(markdown);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor]);
  return (
    <div className="max-h-[300px] overflow-y-auto rounded-md border border-gray-200">
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
}
