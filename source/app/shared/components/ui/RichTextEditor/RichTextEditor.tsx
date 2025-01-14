import { useTranslation } from "react-i18next";
import { useField } from "@rvf/react-router";
import { useId } from "react";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Text, TextInput, VisuallyHidden } from "@mantine/core";

import "@mantine/tiptap/styles.css";

import type { RichTextEditorLabels } from "@mantine/tiptap";
import type { TTextInput } from "~/shared/types/react";

import s from "./RichTextEditor.module.css";

export const Editor = ({ label, scope }: TTextInput) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const { t } = useTranslation();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      Superscript,
      SubScript,
      TextAlign,
      Placeholder.configure({
        placeholder: t("editor.placeholder", { ns: "posts" }),
      }),
    ],
    content: field.value() || "",
    onUpdate: ({ editor }) => {
      field.setValue(editor.getHTML());
      field.validate();
    },

    immediatelyRender: false,
  });

  const labels: Partial<RichTextEditorLabels> = t("richEditorLabels", {
    ns: "posts",
    returnObjects: true,
  }) as Partial<RichTextEditorLabels>;

  return (
    <div>
      <VisuallyHidden>
        <TextInput
          label={label}
          {...field.getInputProps({
            id: inputId,
            "aria-describedby": errorId,
            "aria-invalid": !!field.error(),
          })}
        />
      </VisuallyHidden>

      <Text component="label" fw="bold">
        {label}
      </Text>

      <RichTextEditor
        editor={editor}
        labels={labels}
        variant="default"
        className={field.error() ? s.errorEditor : s.editor}
        styles={{ root: { borderColor: field.error() ? "red" : "" } }}
      >
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            <RichTextEditor.H5 />
            <RichTextEditor.H6 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      {field.error() && (
        <Text component="span" size="sm" c="red">
          {field.error()}
        </Text>
      )}
    </div>
  );
};
