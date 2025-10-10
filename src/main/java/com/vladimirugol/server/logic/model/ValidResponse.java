package com.vladimirugol.server.logic.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
@Data
@AllArgsConstructor
public class ValidResponse implements Serializable {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean hit;
    private String currentTime;
    private long execMs;


}
