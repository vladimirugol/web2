package com.vladimirugol.server.logic.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
public class ValidResponse {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean isHit;
    private String currentTime;
    private long execMs;
}
