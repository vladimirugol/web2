package com.vladimirugol.server.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.vladimirugol.server.logic.model.PointRequest;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;
import java.io.IOException;

@WebServlet(name = "ControllerServlet", urlPatterns = {"/controller", "/controller/"})
public class ControllerServlet extends HttpServlet {
    private final Gson gson = new Gson();

    private void process(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        String jsonPayload = IOUtils.toString(req.getReader());
        PointRequest pointRequest = null;
        boolean isRequestValid = false;

        try {
            pointRequest = gson.fromJson(jsonPayload, PointRequest.class);
            if (pointRequest != null && pointRequest.allFieldsPresent()) {
                isRequestValid = true;
            }
        } catch (JsonSyntaxException e) {
            log("Invalid JSON syntax received: " + jsonPayload, e);
        }

        if (isRequestValid) {
            req.setAttribute("pointRequest", pointRequest);
            req.getRequestDispatcher("/areaCheck").forward(req, resp);
        } else {
            req.getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }
}