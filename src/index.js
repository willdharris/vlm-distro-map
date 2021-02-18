import { destinationArray } from "./destination";
import { expirationArray } from "./expiration";
import { FileUploader } from "carbon-components";
import { DataTable } from "carbon-components";

function mapIDs() {
  if (!destinationArray || !expirationArray) {
    alert(`Please upload both a destination report and asset update file.`);
  }
  document.getElementById("destination").innerHTML +=
    destinationArray[0].Destination;

  const operation = (expirationArray, destinationArray, isUnion = false) =>
    expirationArray.filter(
      (a) =>
        isUnion ===
        destinationArray.some((b) => a.HDP === b["Package Asset ID"])
    );
  const inBoth = (expirationArray, destinationArray) =>
    operation(expirationArray, destinationArray, true);

  const atDestination = inBoth(expirationArray, destinationArray);

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

    var html = `<table class="bx--data-table  bx--data-table--compact  " >`;
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
  }
}
FileUploader.create(document.getElementById("destreport"));
FileUploader.create(document.getElementById("updatelist"));
const submit = document.getElementById("findSameIDs");
submit.addEventListener("click", mapIDs);
