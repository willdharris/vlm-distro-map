export let expirationArray;

// export const expSheet = document.getElementById("file-uploader-update");
// expSheet.addEventListener("change", (handleFiles) => {
//   selectedFileEXP = handleFiles.target.files[0];
//   console.log(selectedFileEXP);
//   if (selectedFileEXP) {
//     let fileReader = new FileReader();
//     fileReader.readAsBinaryString(selectedFileEXP);
//     fileReader.onload = (el) => {
//       // console.log(el.target.result);
//       let data = el.target.result;
//       let workbook = XLSX.read(data, { type: "binary" });
//       // console.log(workbook);
//       workbook.SheetNames.forEach((sheet) => {
//         expirationArray = XLSX.utils.sheet_to_row_object_array(
//           workbook.Sheets[sheet]
//         );
//         console.log(expirationArray);
//         return expirationArray;
//       });
//     };
//   }
// });

function processFilesUpdate(handleFilesUpdate) {
  handleFilesUpdate.preventDefault();
  let files =
    handleFilesUpdate.target.files || handleFilesUpdate.dataTransfer.files;
  let updateFile = files[0];

  if (updateFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(updateFile);
    fileReader.onload = (el) => {
      let data = el.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        expirationArray = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.log(expirationArray);
        return expirationArray;
      });
    };
  }
}

document
  .getElementById("file-drop-update")
  .addEventListener("drop", processFilesUpdate);
document
  .getElementById("file-drop-update")
  .addEventListener("change", processFilesUpdate);
