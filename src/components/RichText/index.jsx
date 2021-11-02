import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichText() {
  const editorRef = useRef(null);
  
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  //const plugins = ["image media link hr"];

  return (
    <div>
      <input
        id="my-file"
        type="file"
        name="my-file"
        style={{ display: "none" }}
        onChange=""
      />

      <Editor 
        onChange={editorRef.current.getContent()}
        apiKey="hwq21kqrcf1kauvyqyzjivh35u6bmtqryxors2ib1136wg6z"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor footnotes",
            "searchreplace wordcount visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste code",
          ],
          toolbar:
            "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image |",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_browser_callback_types: "image",
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === "image") {
              var input = document.getElementById("my-file");
              input.click();
              input.onchange = function () {
                var file = input.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                  console.log("name", e.target.result);
                  callback(e.target.result, {
                    alt: file.name,
                  });
                };
                reader.readAsDataURL(file);
              };
            }
          },
        //   setup: function (editor) {
        //     editor.ui.registry.addButton("customInsertButton", {
        //       text: "My Button",
        //       onAction: function (_) 
        //       {
        //         editor.insertContent(
        //           "&nbsp;<strong>It's my button!</strong>&nbsp;"
        //         );
        //       },
        //     });
        //   },
        }}
      />      
    </div>
  );
}
