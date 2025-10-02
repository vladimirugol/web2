
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="https://jakarta.ee/taglibs/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/main.css">

    <title>Web2</title>
    <link rel="icon" href="images/utka1.png">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap" rel="stylesheet">

</head>
<body>
    <header id="header-container" class="header-container">

            <div class="header-info">
                <div class="utka-logo">
                <a href="https://se.ifmo.ru/"><img src="images/utka1.png" alt="vt-duck" width="100px"></a>
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
                    <div class="form-group">
                        <label for="x-value">Change X:</label>
                        <input type="text" id="x-value" name="x" placeholder="Enter a number from -5 to 5" required>
                    </div>
                    <div class="form-group y-group">
                        <p>Change Y:</p>
                        <div class="radio-buttons">
                             <span><input type="radio" name="y" value="-5" id="y-m5"><label for="y-m5">-5</label></span>
                             <span><input type="radio" name="y" value="-4" id="y-m4"><label for="y-m4">-4</label></span>
                             <span><input type="radio" name="y" value="-3" id="y-m3"><label for="y-m3">-3</label></span>
                             <span><input type="radio" name="y" value="-2" id="y-m2"><label for="y-m2">-2</label></span>
                             <span><input type="radio" name="y" value="-1" id="y-m1"><label for="y-m1">-1</label></span>
                             <span><input type="radio" name="y" value="0" id="y-0" checked><label for="y-0">0</label></span>
                             <span><input type="radio" name="y" value="1" id="y-1"><label for="y-1">1</label></span>
                             <span><input type="radio" name="y" value="2" id="y-2"><label for="y-2">2</label></span>
                             <span><input type="radio" name="y" value="3" id="y-3"><label for="y-3">3</label></span>
                        </div>
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
    <script src="js/canvas.js"></script>
    <script src="js/main.js"></script>
</body>
</html>