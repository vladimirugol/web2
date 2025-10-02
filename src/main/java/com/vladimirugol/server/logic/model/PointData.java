package com.vladimirugol.server.logic.model;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class PointData {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    public boolean allFieldsPresent() {
        return x != null && y != null && r != null;
    }
}
