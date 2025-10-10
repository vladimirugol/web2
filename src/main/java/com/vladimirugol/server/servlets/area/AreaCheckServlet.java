package com.vladimirugol.server.servlets.area;

import com.vladimirugol.server.logic.model.PointData;
import com.vladimirugol.server.logic.model.PointRequest;
import com.vladimirugol.server.logic.model.ValidResponse;
import com.vladimirugol.server.logic.util.DataService;
import com.vladimirugol.server.logic.util.ValidationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", value = "/areaCheck")
public class AreaCheckServlet extends HttpServlet {

    private final ValidationService validationService = new ValidationService();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PointRequest pointRequest = (PointRequest) req.getAttribute("pointRequest");
        if (pointRequest == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("No point data received");
            return;
        }
        HttpSession session = req.getSession(true);
        DataService dataService = (DataService) session.getAttribute("dataService");
        if (dataService == null) {
            dataService = new DataService();
            session.setAttribute("dataService", dataService);
        }
        List<ValidResponse> resultsForThisRequest = new ArrayList<>();

        for (BigDecimal rValue : pointRequest.getR()) {
            PointData pointData = new PointData(pointRequest.getX(), pointRequest.getY(), rValue);
            List<String> validationErrors = validationService.validate(pointData);

            if (validationErrors.isEmpty()) {
                ValidResponse result = dataService.processData(pointData);
                resultsForThisRequest.add(result);
            }
        }

        session.setAttribute("dataService", dataService);

        session.setAttribute("latestResults", resultsForThisRequest);
        String sessionId = session.getId();
        resp.addCookie(new Cookie("JSESSIONID", sessionId));

        resp.sendRedirect(req.getContextPath() + "/index2.jsp");
    }
}