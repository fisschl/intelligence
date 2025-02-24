import { style } from "@vanilla-extract/css";

export const editorStyle = style({
  borderWidth: 2,
  borderStyle: "dashed",
  minHeight: "20rem",
  marginBottom: "0.8rem",
  padding: "0.6rem 0.8rem",
});

export const editorProseStyle = style({
  maxWidth: "none",
  ":focus": {
    outline: "none",
  },
});

export const languageSelectStyle = style({
  width: "8rem",
});
