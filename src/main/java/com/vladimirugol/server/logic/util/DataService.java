package com.vladimirugol.server.logic.util;

import com.vladimirugol.server.logic.model.PointData;
import com.vladimirugol.server.logic.model.ValidResponse;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.vladimirugol.server.logic.util.HitChecker.checkHit;
@Data
public class DataService implements Serializable {
    private List<ValidResponse> results = new CopyOnWriteArrayList<>();

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
        addResult(response);
        return response;
    }
    public DataService() {};

    public void setResultList(List<ValidResponse> results) {
        this.results = results;
    }
    public List<ValidResponse> getResultList() {
        return results;
    }
    public void addResult(ValidResponse result) {
        this.results.add(result);
    }
    public List<ValidResponse> getResults() {
        return new ArrayList<>(results);
    }
}