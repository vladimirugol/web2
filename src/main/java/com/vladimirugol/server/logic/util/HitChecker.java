package com.vladimirugol.server.logic.util;

import com.vladimirugol.server.logic.model.PointData;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class HitChecker {
    public static boolean checkHit(PointData pointData) {
        if (pointData == null || !pointData.allFieldsPresent()) {
            return false;
        }
        return checkHit(pointData.getX(), pointData.getY(), pointData.getR());
    }

    public static boolean checkHit(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal rHalf = r.divide(new BigDecimal("2"));
        if (r.compareTo(BigDecimal.ZERO) < 0) {
            return false;
        }
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) < 0) {
            return x.pow(2).add(y.pow(2)).compareTo(rHalf.pow(2)) <= 0;
        }

        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return x.compareTo(r.negate()) >= 0 && y.compareTo(r) <= 0;
        }
        if (x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) < 0) {
            return false;
        }
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return (x.add(y.multiply(BigDecimal.valueOf(2))).compareTo(r) <= 0);
        }
        return false;
    }
}