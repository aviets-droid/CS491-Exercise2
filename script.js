function createTable(num_rows, num_cols) {
    for (var cr=1; cr<=num_rows; cr++) {
        document.write("<tr>")
        for (var cc=1; cc<=num_cols; cc++) {
            document.write("<td>X</td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
}