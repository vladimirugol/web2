package com.vladimirugol.server.logic.util;

import com.vladimirugol.server.logic.model.PointData;
import com.vladimirugol.server.logic.model.ValidResponse;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import static com.vladimirugol.server.logic.util.HitChecker.checkHit;


public class DataService {
    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");
    public ValidResponse processData(PointData req) {
        long startTime = System.nanoTime();

        boolean isHit = checkHit(req);
        String currentTime = LocalTime.now().format(DTF);
        ValidResponse response = new ValidResponse(
                req.getX(),
                req.getY(),
                req.getR(),
                isHit,
                currentTime,
                System.nanoTime()-startTime
        );
        return response;
    }
}