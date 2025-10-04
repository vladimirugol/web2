package com.vladimirugol.server.logic.util;

import com.vladimirugol.server.logic.model.PointData;

import java.math.BigDecimal;

public class HitChecker {
    public static boolean checkHit(PointData req) {
        return checkHit(req.getX(), req.getY(), req.getR());
    }

    public static boolean checkHit(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (r.compareTo(BigDecimal.ZERO) < 0) {
            return false;
        }
        BigDecimal ZERO = BigDecimal.ZERO;
        BigDecimal HALF = new BigDecimal("0.5");
        BigDecimal R_HALF = r.multiply(HALF);
        if (x.compareTo(ZERO) >= 0 && y.compareTo(ZERO) >= 0) {
            return x.pow(2).add(y.pow(2)).compareTo(R_HALF.pow(2)) <= 0;
        }
        else if (x.compareTo(ZERO) <= 0 && y.compareTo(ZERO) >= 0) {
            return x.compareTo(r.negate()) >= 0 && y.compareTo(r) <= 0;
        }
        else if (x.compareTo(ZERO) < 0 && y.compareTo(ZERO) < 0) {
            return false;
        }
        else if (x.compareTo(ZERO) >= 0 && y.compareTo(ZERO) <= 0) {
            return y.subtract(x).add(R_HALF).compareTo(ZERO) >= 0;
        }
        return false;
    }
}