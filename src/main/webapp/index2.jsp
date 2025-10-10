<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.vladimirugol.server.logic.model.ValidResponse" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="static/css/header.css">
    <link rel="stylesheet" href="static/css/index.css">
    <link rel="stylesheet" href="static/css/main.css">
    <title>Web2 - Results</title>
    <link rel="icon" href="static/imajes/utka1.png">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Jost', sans-serif;
            background-color: #f5f5f5;
        }

        .main-container {
            width: 95%;
            height: max-content;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: white;
        }

        .results-header {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
        }

        .results-table-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        table th, table td {
            border: 1px solid #ddd;
            padding: 12px 15px;
            text-align: center;
            font-size: 14px;
        }

        table th {
            background-color: #e50074;
            color: white;
            font-weight: bold;
            position: sticky;
            top: 0;
        }

        table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        table tbody tr:hover {
            background-color: #f1f1f1;
        }

        .true {
            color: #28a745;
            font-weight: bold;
        }

        .false {
            color: #dc3545;
            font-weight: bold;
        }

        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #e50074;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .back-link:hover {
            background-color: #c40062;
        }

        .no-results {
            text-align: center;
            color: #666;
            font-style: italic;
            padding: 40px;
        }

        @media (max-width: 768px) {
            .main-container {
                width: 98%;
                padding: 10px;
            }

            table th, table td {
                padding: 8px 10px;
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <header id="header-container" class="header-container">
        <div class="header-info">
            <h1 class="student-name">Radchenko Alina Alexandrovna</h1>
            <div class="meta">
                <span class="group">Group: <strong>P3207</strong></span>
                <span class="variant">Variant: <strong>№ 472395</strong></span>
            </div>
        </div>
    </header>

    <main class="main-container">
        <div class="results-header">
            <h1>Check Results</h1>
        </div>

        <%
            List<ValidResponse> latestResults = (List<ValidResponse>) session.getAttribute("latestResults");
        %>

        <div class="results-table-container">
            <table>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Hit</th>
                        <th>Execution Time (ns)</th>
                        <th>Current Time</th>
                    </tr>
                </thead>
                <tbody>
                    <% if (latestResults != null && !latestResults.isEmpty()) { %>
                        <% for (ValidResponse result : latestResults) { %>
                            <tr>
                                <td><%= result.getX() %></td>
                                <td><%= result.getY() %></td>
                                <td><%= result.getR() %></td>
                                <td class="<%= result.isHit() ? "true" : "false" %>">
                                    <%= result.isHit() ? "Yes" : "No" %>
                                </td>
                                <td><%= result.getExecMs() %> ns</td>
                                <td><%= result.getCurrentTime() %></td>
                            </tr>
                        <% } %>
                    <% } else { %>
                        <tr>
                            <td colspan="6" class="no-results">No results available</td>
                        </tr>
                    <% } %>
                </tbody>
            </table>
        </div>

        <div style="text-align: center;">
            <a href="${pageContext.request.contextPath}/controller" class="back-link">Back to main page</a>
        </div>
    </main>
</body>
</html>