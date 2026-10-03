package com.shopx.frontend.util;

import java.text.NumberFormat;
import java.util.Locale;

public class CurrencyFormatter {

    private static final Locale INDIA_LOCALE = Locale.of("en", "IN");
    private static final NumberFormat FORMATTER = NumberFormat.getCurrencyInstance(INDIA_LOCALE);

    public static String format(Double amount) {
        if (amount == null) {
            return "₹0.00";
        }
        try {
            return FORMATTER.format(amount);
        } catch (Exception e) {
            return String.format("₹%.2f", amount);
        }
    }
}
