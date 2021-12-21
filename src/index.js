import { destinationArray } from "./destination";
import { expirationArray } from "./expiration";
import { FileUploader } from "carbon-components";
import { TableExport } from "tableexport";

function mapIDs() {
  if (!destinationArray || !expirationArray) {
    alert(`Please upload both a destination report and asset update file.`);
  }
  if (
    destinationArray[0] === undefined ||
    destinationArray[0].Destination === undefined
  ) {
    document.getElementById("destination").innerHTML += "";
  } else {
    document.getElementById("destination").innerHTML +=
      destinationArray[0].Destination;
  }
  const operation = (expirationArray, destinationArray, isUnion = false) =>
    expirationArray.filter(
      (a) =>
        isUnion ===
        destinationArray.some((b) => a.HDP === b["Package Asset ID"])
    );
  const inBoth = (expirationArray, destinationArray) =>
    operation(expirationArray, destinationArray, true);

  const atDestination = inBoth(expirationArray, destinationArray);
  try {
    atDestination.forEach(function (element) {
      element.HDT = element.HDP.slice(0, -1) + "2";
    });
    console.log("inBoth:", atDestination);
    if (atDestination.length === 0) {
      document.getElementById(
        "site"
      ).innerHTML += `None of these assets are at the destination.`;
    } else {
      document.getElementById("site").innerHTML += atDestination;

      var html = `<table id="dest-table" class="bx--data-table  bx--data-table--compact  " >`;
      html += "<thead>";
      html += "<tr>";
      html += "<th >";
      html += `<span class="bx--table-header-label">Series</span>`;
      html += "</th>";
      html += "<th >";
      html += `<span class="bx--table-header-label">Episode</span>`;
      html += "</th>";
      html += "<th >";
      html += `<span class="bx--table-header-label">Title</span>`;
      html += "</th>";
      html += "<th >";
      html += `<span class="bx--table-header-label">Package Asset ID</span>`;
      html += "</th>";
      html += "<th >";
      html += `<span class="bx--table-header-label">Title Asset ID</span>`;
      html += "</th>";

      // html += "<td>Series</td>";
      // html += "<td>Episode</td>";
      // html += "<td>Title</td>";
      // html += "<td>Package Asset ID</td>";
      html += "</tr>";
      html += "</thead>";
      for (var i = 0; i < atDestination.length; i++) {
        html += "<tr>";
        if (atDestination[i].Series === undefined) {
          atDestination[i].Series = `---`;
        }
        if (atDestination[i].Episode === undefined) {
          atDestination[i].Episode = `---`;
        }
        if (atDestination[i].Title === undefined) {
          atDestination[i].Title = `---`;
        }
        html += "<td>" + atDestination[i].Series + "</td>";
        html += "<td>" + atDestination[i].Episode + "</td>";
        html += "<td>" + atDestination[i].Title + "</td>";
        html += "<td>" + atDestination[i].HDP + "</td>";
        html += "<td>" + atDestination[i].HDT + "</td>";

        html += "</tr>";
      }
      html += "</table>";
      document.getElementById("site").innerHTML = html;
      new TableExport(document.getElementsByTagName("table"), {
        headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
        footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
        formats: ["xlsx"], // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
        filename: `Package_Updates_${destinationArray[0].Destination}`, // (id, String), filename for the downloaded file, (default: 'id')
        bootstrap: false, // (Boolean), style buttons using bootstrap, (default: true)
        exportButtons: true, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
        position: "top", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
        ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
        ignoreCols: null, // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
        trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
        RTL: false, // (Boolean), set direction of the worksheet to right-to-left (default: false)
        sheetname: "packages", // (id, String), sheet name for the exported spreadsheet, (default: 'id')
      });

      TableExport.prototype.typeConfig.date.assert = function (value) {
        return false;
      };
    }
  } catch {
    document.getElementById(
      "destination"
    ).innerHTML += `Unable to process request.`;
    document.getElementById(
      "site"
    ).innerHTML += `Please make sure the lists were uploaded in the correct order, and that the "Step 2" list includes the "HDP" column. Refresh the page and try again.`;
  }
}
FileUploader.create(document.getElementById("destreport"));
FileUploader.create(document.getElementById("updatelist"));
const submit = document.getElementById("findSameIDs");
submit.addEventListener("click", mapIDs);
