package org.example.orderservice.config;

public class APIURL {
    public static final String[] URL_USER_POST={
        "/api/order/create",
    };
    public static final String[] URL_ANONYMOUS_GET = {
            "/api/order/all",
            "/api/order/find-order"
    };
    public static final String[]URL_USER_GET={
            "/api/order/getByUser"
    };
    public static final String[] URL_ANONYMOUS_POST = {
            "/api/order/statistic-order",
            "/api/order/top5-products",
    };
}
