package com.vladimirugol.server.servlets.area;

import com.vladimirugol.server.logic.model.PointData;
import com.vladimirugol.server.logic.model.ValidResponse;
import com.vladimirugol.server.logic.util.DataService;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@WebServlet(name = "AreaCheckServlet", value = "/areaCheck")
public class AreaCheckServlet extends HttpServlet {
    DataService dataService = new DataService();
    private void process(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        final String format = Optional.ofNullable(req.getParameter("format")).orElse("full");
        RequestDispatcher disp;
        PointData pointData = (PointData) req.getAttribute("parsedPoint");
        if (pointData == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "No valid data received from controller servlet.");
            return;
        }
        HttpSession session = req.getSession();
        List<ValidResponse> results = (List<ValidResponse>) session.getAttribute("results");
        if (results == null) results = new ArrayList<>();
        ValidResponse result = dataService.processData(pointData);
        results.add(result);
        session.setAttribute("results", results);
        if ("params".equals(format)) {
            String htmlResponse = "<tr>" +
                    "<td>" + result.getX() + "</td>" +
                    "<td>" + result.getY() + "</td>" +
                    "<td>" + result.getR() + "</td>" +
                    "<td>" + result.isHit() + "</td>" +
                    "<td>" + result.getCurrentTime() + "</td>" +
                    "<td>" + result.getExecMs() + "</td>" +
                    "</tr>";

            resp.setContentType("text/html");
            resp.getWriter().write(htmlResponse);
        } else {
            disp = req.getRequestDispatcher("index.jsp");
            disp.forward(req, resp);
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }
}
