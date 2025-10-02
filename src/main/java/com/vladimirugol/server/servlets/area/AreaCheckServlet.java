package com.vladimirugol.server.servlets.area;

import com.vladimirugol.server.logic.model.PointData;
import com.vladimirugol.server.logic.model.ValidResponse;
import com.vladimirugol.server.logic.util.DataService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
@WebServlet(name = "AreaCheckServlet", value = "/areaCheck")
public class AreaCheckServlet extends HttpServlet {
    DataService dataService = new DataService();
    private void process(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        PointData pointData = (PointData) req.getAttribute("parsedPoint");
        if (pointData == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "No valid data received from controller servlet.");
            return;
        }
        ValidResponse result = dataService.processData(pointData);


    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }
}
