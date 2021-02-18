export let destinationArray;

function processFiles(handleFiles) {
  handleFiles.preventDefault();
  let files = handleFiles.target.files || handleFiles.dataTransfer.files;
  let destFile = files[0];

  if (destFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(destFile);
    fileReader.onload = (el) => {
      let data = el.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        destinationArray = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.log(destinationArray);
        return destinationArray;
      });
    };
  }
}
document.getElementById("file-drop").addEventListener("drop", processFiles);
document.getElementById("file-drop").addEventListener("change", processFiles);
