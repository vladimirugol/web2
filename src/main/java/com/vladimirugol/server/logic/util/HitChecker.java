package com.vladimirugol.server.logic.util;

import com.vladimirugol.server.logic.model.PointData;

import java.math.BigDecimal;

public class HitChecker {
    public static boolean checkHit(PointData req) {
        return checkHit(req.getX(), req.getY(), req.getR());
    }
    public static boolean checkHit(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal ZERO = BigDecimal.ZERO;
        BigDecimal TWO = BigDecimal.valueOf(2).negate();
        BigDecimal H = BigDecimal.valueOf(0.5);
        if (x.compareTo(ZERO) >= 0 && y.compareTo(ZERO) >= 0) {
            return y.compareTo(x.multiply(TWO).add(r)) <= 0;
        }
        else if (x.compareTo(ZERO) < 0 && y.compareTo(ZERO) >= 0) {
            return x.compareTo(r.multiply(H).negate()) >= 0  && y.compareTo(r) <= 0;
        }
        else if (x.compareTo(ZERO) <= 0 && y.compareTo(ZERO) < 0) {
            return x.pow(2).add(y.pow(2)).compareTo(r.multiply(H).pow(2)) <= 0;
        }
        return false;
    }
}
