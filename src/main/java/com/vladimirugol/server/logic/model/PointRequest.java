package com.vladimirugol.server.logic.model;


import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class PointRequest {
    private BigDecimal x;
    private BigDecimal y;
    private List<BigDecimal> r;

    public boolean allFieldsPresent() {
        return x != null && y != null && r != null && !r.isEmpty();
    }
}