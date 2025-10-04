<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.vladimirugol.server.logic.model.ValidResponse" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="static/css/header.css">
    <link rel="stylesheet" href="static/css/index.css">
    <link rel="stylesheet" href="static/css/main.css">

    <title>Web2</title>
    <link rel="icon" href="static/imajes/utka1.png">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <header id="header-container" class="header-container">
        <div class="header-info">
            <div class="utka-logo">
                <a href="https://se.ifmo.ru/"><img src="static/imajes/utka1.png" alt="vt-duck" width="100px"></a>
            </div>
            <h1 class="student-name">Radchenko Alina Alexandrovna</h1>
            <div class="meta">
                <span class="group">Group: <strong>P3207</strong></span>
                <span class="variant">Variant: <strong>№ 472395</strong></span>
            </div>
        </div>
    </header>
    <main class="main-container">
        <button id="theme">Switch color</button>
        <div class="content-wrapper">
            <div class="left-column">
                <div class="graph-container">
                    <canvas id="graph-canvas" width="300" height="300"></canvas>
                </div>
                <form id="data-form" class="data-form" method="POST" onsubmit="return false;">
                    <div class="form-group x-group">
                        <p>Change X:</p>
                        <div class="buttons">
                            <button type="button" class="x-button" value="-4">-4</button>
                            <button type="button" class="x-button" value="-3">-3</button>
                            <button type="button" class="x-button" value="-2">-2</button>
                            <button type="button" class="x-button" value="-1">-1</button>
                            <button type="button" class="x-button" value="0">0</button>
                            <button type="button" class="x-button" value="1">1</button>
                            <button type="button" class="x-button" value="2">2</button>
                            <button type="button" class="x-button" value="3">3</button>
                            <button type="button" class="x-button" value="4">4</button>
                        </div>
                        <input type="hidden" id="x-value" name="x">
                    </div>
                    <div class="form-group">
                        <label for="y-value">Change Y:</label>
                        <input type="text" id="y-value" name="y" placeholder="Enter a number from -3 to 3" required>
                    </div>
                    <div class="form-group r-group">
                         <p>Change R:</p>
                        <div class="checkboxes">
                             <span><input type="checkbox" class="r-checkbox" name="r" value="1" id="r-1"><label for="r-1">1</label></span>
                             <span><input type="checkbox" class="r-checkbox" name="r" value="2" id="r-2"><label for="r-2">2</label></span>
                             <span><input type="checkbox" class="r-checkbox" name="r" value="3" id="r-3" checked><label for="r-3">3</label></span>
                             <span><input type="checkbox" class="r-checkbox" name="r" value="4" id="r-4"><label for="r-4">4</label></span>
                             <span><input type="checkbox" class="r-checkbox" name="r" value="5" id="r-5"><label for="r-5">5</label></span>
                        </div>
                    </div>
                    <div id="error-message" class="error-message"></div>

                </form>
            </div>

            <div class="right-column">
                <div class="results-container">
                    <h2>Results</h2>
                    <div class="results-table-container">
                        <table id="results-table">
                        <thead>
                            <tr>
                                <th>X</th>
                                <th>Y</th>
                                <th>R</th>
                                <th>Result</th>
                                <th>Current time</th>
                                <th>Execution time</th>
                            </tr>
                        </thead>
                        <tbody id="results-body">
                        <%
                             List<ValidResponse> results = (List<ValidResponse>) session.getAttribute("results");
                             if (results != null) {
                                  for (ValidResponse res : results) {
                        %>
                            <tr>
                                  <td><%= res.getX() %></td>
                                  <td><%= res.getY() %></td>
                                  <td><%= res.getR() %></td>
                                  <td><%= res.isHit() ? "true" : "false" %></td>
                                  <td><%= res.getCurrentTime() %></td>
                                  <td><%= res.getExecMs() %></td>
                            </tr>
                        <%
                                }
                            }
                        %>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group-button">
            <button type="submit" id="submit-button">Send</button>
        </div>
    </main>
    <script src="static/js/canvas.js"></script>
    <script src="static/js/main.js"></script>
</body>
</html>