package org.example.inventoryservice.config;

public class APIURL {
    public static final String[] URL_ADMIN_POST={

            "/api/inventory/restore"
    };
    public static final String[] URL_ANONYMOUS_GET = {
        "/api/inventory/has-sufficient-stock"
    };
    public static final String[] URL_ADMIN_GET = {
            "/api/inventory/{idProduct}",
    };
    public static final String[] URL_ANONYMOUS_POST = {
            "/api/inventory/update",

    };
}
